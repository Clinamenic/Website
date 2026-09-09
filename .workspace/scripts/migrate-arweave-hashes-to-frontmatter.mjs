#!/usr/bin/env node
/**
 * Migrate Arweave upload history from central index JSON into page frontmatter.
 *
 * Sources (union by UUID):
 *   - .meridian/data/archive.json
 *   - .meridian/exports/archive.json
 *   - .workspace/archive/tools/temp/arweave.json
 *
 * Target frontmatter schema (matches portfolio):
 *   arweave-hashes:
 *     - txId: <tx>
 *       uploadedAt: <ISO-8601>
 *
 * Default: dry-run. Pass --apply to write.
 *
 * Usage:
 *   node .workspace/scripts/migrate-arweave-hashes-to-frontmatter.mjs
 *   node .workspace/scripts/migrate-arweave-hashes-to-frontmatter.mjs --apply
 *   node .workspace/scripts/migrate-arweave-hashes-to-frontmatter.mjs --root /path/to/website
 */

import { createRequire } from 'node:module'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const DEFAULT_ROOT = path.resolve(SCRIPT_DIR, '..', '..')

const SKIP_DIR_NAMES = new Set([
  '.git',
  '.quartz',
  '.workspace',
  '.meridian',
  '.cursor',
  '.obsidian',
  'node_modules',
  'private',
])

const DEFAULT_SOURCES = [
  '.meridian/data/archive.json',
  '.meridian/exports/archive.json',
  '.workspace/archive/tools/temp/arweave.json',
]

function parseArgs(argv) {
  let apply = false
  let root = DEFAULT_ROOT
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--apply') {
      apply = true
    } else if (arg === '--root') {
      const next = argv[i + 1]
      if (!next) {
        throw new Error('--root requires a path')
      }
      root = path.resolve(next)
      i++
    } else if (arg === '-h' || arg === '--help') {
      printHelpAndExit(0)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }
  return { apply, root }
}

function printHelpAndExit(code) {
  console.log(`Usage: node migrate-arweave-hashes-to-frontmatter.mjs [--apply] [--root PATH]

Default is dry-run. Pass --apply to write frontmatter changes.
`)
  process.exit(code)
}

async function loadYaml(root) {
  const require = createRequire(pathToFileURL(path.join(root, 'package.json')).href)
  try {
    return require(path.join(root, '.quartz/node_modules/js-yaml'))
  } catch {
    return require('js-yaml')
  }
}

function splitYamlFrontmatter(text) {
  const lines = text.split(/\r?\n/)
  if ((lines[0] ?? '').trim() !== '---') return null
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      return {
        frontmatterInner: lines.slice(1, i).join('\n'),
        body: lines.slice(i + 1).join('\n'),
        newline: text.includes('\r\n') ? '\r\n' : '\n',
      }
    }
  }
  return null
}

function extractUuid(frontmatterInner) {
  const m = frontmatterInner.match(/^uuid:\s*([^\s#]+)\s*$/m)
  if (!m) return null
  return m[1].trim().replace(/^['"]|['"]$/g, '')
}

function normalizeHashEntry(raw) {
  if (!raw || typeof raw !== 'object') return null
  const txId = String(raw.txId ?? raw.hash ?? raw.transactionId ?? '').trim()
  if (!txId) return null
  const uploadedAtRaw = raw.uploadedAt ?? raw.timestamp ?? raw.uploaded_at
  const uploadedAt =
    uploadedAtRaw !== undefined && uploadedAtRaw !== null && String(uploadedAtRaw).trim() !== ''
      ? String(uploadedAtRaw).trim()
      : undefined
  const entry = { txId }
  if (uploadedAt) entry.uploadedAt = uploadedAt
  return entry
}

function mergeHashLists(existing, incoming) {
  const byTx = new Map()
  for (const entry of existing) {
    const n = normalizeHashEntry(entry)
    if (n) byTx.set(n.txId, { ...n })
  }
  const newTxIds = []
  for (const entry of incoming) {
    const n = normalizeHashEntry(entry)
    if (!n) continue
    if (!byTx.has(n.txId)) {
      newTxIds.push(n.txId)
      byTx.set(n.txId, n)
    } else {
      const prev = byTx.get(n.txId)
      // Fill missing uploadedAt from incoming; do not overwrite existing timestamp.
      if (!prev.uploadedAt && n.uploadedAt) {
        byTx.set(n.txId, { ...prev, uploadedAt: n.uploadedAt })
      }
    }
  }

  const merged = [...byTx.values()].sort((a, b) => {
    const at = a.uploadedAt ? Date.parse(a.uploadedAt) : Number.NaN
    const bt = b.uploadedAt ? Date.parse(b.uploadedAt) : Number.NaN
    const aOk = Number.isFinite(at)
    const bOk = Number.isFinite(bt)
    if (aOk && bOk) return at - bt
    if (aOk && !bOk) return -1
    if (!aOk && bOk) return 1
    return a.txId.localeCompare(b.txId)
  })

  return { merged, newTxIds }
}

function findTopLevelKeyRange(lines, key) {
  const keyLine = new RegExp(`^${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*(.*)$`)
  let start = -1
  let inlineRest = null
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(keyLine)
    if (m) {
      start = i
      inlineRest = m[1]
      break
    }
  }
  if (start < 0) return null

  let end = start + 1
  while (end < lines.length) {
    const line = lines[end]
    if (line.trim() === '') {
      end++
      continue
    }
    // Indented continuation of the value
    if (/^[ \t]/.test(line)) {
      end++
      continue
    }
    break
  }
  return { start, end, inlineRest }
}

function formatArweaveHashesBlock(yaml, entries) {
  const dumped = yaml
    .dump(
      { 'arweave-hashes': entries },
      {
        lineWidth: -1,
        noRefs: true,
        quotingType: '"',
        forceQuotes: false,
      },
    )
    .replace(/\n+$/, '')
  return dumped
}

function applyArweaveHashesToFrontmatter(yaml, frontmatterInner, mergedEntries) {
  const lines = frontmatterInner.split(/\n/)
  const range = findTopLevelKeyRange(lines, 'arweave-hashes')
  const block = formatArweaveHashesBlock(yaml, mergedEntries)
  const blockLines = block.split(/\n/)

  let nextLines
  if (range) {
    nextLines = [...lines.slice(0, range.start), ...blockLines, ...lines.slice(range.end)]
  } else {
    const trimmed = [...lines]
    while (trimmed.length && trimmed[trimmed.length - 1].trim() === '') trimmed.pop()
    nextLines = [...trimmed, ...blockLines]
  }

  let inner = nextLines.join('\n')
  inner = inner.replace(/\n\n\n+/g, '\n\n').replace(/\n+$/, '')
  return inner
}

async function loadArchiveFiles(root, relativePath) {
  const abs = path.join(root, relativePath)
  const raw = await readFile(abs, 'utf8')
  const data = JSON.parse(raw)
  const files = Array.isArray(data) ? data : data.files
  if (!Array.isArray(files)) {
    throw new Error(`No files[] in ${relativePath}`)
  }
  return { relativePath, abs, files }
}

function unionArchives(loaded) {
  /** @type {Map<string, { title?: string, hashes: Map<string, { txId: string, uploadedAt?: string }>, sources: Set<string> }>} */
  const byUuid = new Map()

  for (const { relativePath, files } of loaded) {
    for (const file of files) {
      const uuid = typeof file?.uuid === 'string' ? file.uuid.trim() : ''
      if (!uuid) continue
      let bucket = byUuid.get(uuid)
      if (!bucket) {
        bucket = {
          title: typeof file.title === 'string' ? file.title : undefined,
          hashes: new Map(),
          sources: new Set(),
        }
        byUuid.set(uuid, bucket)
      }
      bucket.sources.add(relativePath)
      if (!bucket.title && typeof file.title === 'string') bucket.title = file.title

      for (const raw of file.arweave_hashes ?? []) {
        const n = normalizeHashEntry(raw)
        if (!n) continue
        const prev = bucket.hashes.get(n.txId)
        if (!prev) {
          bucket.hashes.set(n.txId, n)
        } else if (!prev.uploadedAt && n.uploadedAt) {
          bucket.hashes.set(n.txId, { ...prev, uploadedAt: n.uploadedAt })
        }
      }
    }
  }

  return byUuid
}

async function walkMarkdownFiles(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    if (ent.name.startsWith('.') && SKIP_DIR_NAMES.has(ent.name)) continue
    if (SKIP_DIR_NAMES.has(ent.name)) continue
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name.startsWith('.') && !SKIP_DIR_NAMES.has(ent.name)) {
        // Skip other hidden dirs by default
        continue
      }
      await walkMarkdownFiles(full, out)
    } else if (ent.isFile() && ent.name.endsWith('.md')) {
      out.push(full)
    }
  }
  return out
}

async function buildUuidMap(root) {
  const files = await walkMarkdownFiles(root)
  /** @type {Map<string, string>} */
  const map = new Map()
  const collisions = []

  for (const abs of files) {
    const text = await readFile(abs, 'utf8')
    const split = splitYamlFrontmatter(text)
    if (!split) continue
    const uuid = extractUuid(split.frontmatterInner)
    if (!uuid) continue
    if (map.has(uuid)) {
      collisions.push({ uuid, a: map.get(uuid), b: abs })
    } else {
      map.set(uuid, abs)
    }
  }

  return { map, collisions, scanned: files.length }
}

async function main() {
  const { apply, root } = parseArgs(process.argv.slice(2))
  const yaml = await loadYaml(root)

  console.log(apply ? 'Mode: APPLY (writes enabled)' : 'Mode: DRY-RUN (no writes)')
  console.log(`Root: ${root}`)
  console.log('')

  const loaded = []
  for (const rel of DEFAULT_SOURCES) {
    try {
      const entry = await loadArchiveFiles(root, rel)
      loaded.push(entry)
      console.log(`Loaded ${rel}: ${entry.files.length} file entries`)
    } catch (err) {
      console.warn(`Skip source ${rel}: ${err.message}`)
    }
  }
  if (loaded.length === 0) {
    throw new Error('No archive sources loaded')
  }

  const union = unionArchives(loaded)
  console.log(`Union UUIDs with hashes: ${union.size}`)
  console.log('')

  const { map: uuidMap, collisions, scanned } = await buildUuidMap(root)
  console.log(`Scanned markdown files: ${scanned}`)
  console.log(`Markdown files with uuid: ${uuidMap.size}`)
  if (collisions.length) {
    console.warn(`UUID collisions: ${collisions.length}`)
    for (const c of collisions.slice(0, 5)) {
      console.warn(`  ${c.uuid}`)
      console.warn(`    ${path.relative(root, c.a)}`)
      console.warn(`    ${path.relative(root, c.b)}`)
    }
  }
  console.log('')

  let matched = 0
  let unchanged = 0
  let wouldChange = 0
  let written = 0
  let skippedNoPage = 0
  let errors = 0
  const changeRows = []

  for (const [uuid, bucket] of union) {
    const incoming = [...bucket.hashes.values()]
    if (incoming.length === 0) continue

    const abs = uuidMap.get(uuid)
    if (!abs) {
      skippedNoPage++
      continue
    }
    matched++

    try {
      const text = await readFile(abs, 'utf8')
      const split = splitYamlFrontmatter(text)
      if (!split) {
        throw new Error('missing YAML frontmatter')
      }

      const parsed = yaml.load(split.frontmatterInner) ?? {}
      const existingRaw = Array.isArray(parsed['arweave-hashes']) ? parsed['arweave-hashes'] : []
      const { merged, newTxIds } = mergeHashLists(existingRaw, incoming)

      const rel = path.relative(root, abs)
      if (newTxIds.length === 0 && existingRaw.length === merged.length) {
        // Also treat as unchanged if lists equal by txId set even when timestamps filled
        const existingIds = new Set(
          existingRaw.map((e) => normalizeHashEntry(e)?.txId).filter(Boolean),
        )
        const mergedIds = new Set(merged.map((e) => e.txId))
        const sameIds =
          existingIds.size === mergedIds.size && [...existingIds].every((id) => mergedIds.has(id))
        const needsTimestampFill = merged.some((m) => {
          const ex = existingRaw.map(normalizeHashEntry).find((e) => e && e.txId === m.txId)
          return ex && !ex.uploadedAt && m.uploadedAt
        })
        if (sameIds && !needsTimestampFill) {
          unchanged++
          continue
        }
      }

      if (newTxIds.length === 0) {
        // Only timestamp fills or reorder — still a write if serialized block would change
        const nextInner = applyArweaveHashesToFrontmatter(yaml, split.frontmatterInner, merged)
        if (nextInner === split.frontmatterInner.replace(/\n+$/, '')) {
          unchanged++
          continue
        }
      }

      wouldChange++
      changeRows.push({
        rel,
        uuid,
        existing: existingRaw.length,
        incoming: incoming.length,
        merged: merged.length,
        newTxIds,
        sources: [...bucket.sources],
      })

      if (apply) {
        const nextInner = applyArweaveHashesToFrontmatter(yaml, split.frontmatterInner, merged)
        const nextText = `---${split.newline}${nextInner}${split.newline}---${split.newline}${split.body}`
        await writeFile(abs, nextText, 'utf8')
        written++
      }
    } catch (err) {
      errors++
      console.error(`Error ${path.relative(root, abs)}: ${err.message}`)
    }
  }

  console.log('Planned / applied changes:')
  for (const row of changeRows.sort((a, b) => a.rel.localeCompare(b.rel))) {
    console.log(`  ${row.rel}`)
    console.log(
      `    uuid=${row.uuid} existing=${row.existing} incoming=${row.incoming} merged=${row.merged} new=${row.newTxIds.length}`,
    )
    if (row.newTxIds.length) {
      console.log(`    new txIds: ${row.newTxIds.join(', ')}`)
    }
    console.log(`    sources: ${row.sources.join(' | ')}`)
  }

  console.log('')
  console.log('Summary')
  console.log(`  archive UUIDs skipped (no local md): ${skippedNoPage}`)
  console.log(`  matched local pages: ${matched}`)
  console.log(`  unchanged: ${unchanged}`)
  console.log(`  would change: ${wouldChange}`)
  if (apply) console.log(`  written: ${written}`)
  console.log(`  errors: ${errors}`)
  if (!apply && wouldChange > 0) {
    console.log('')
    console.log('Dry-run only. Re-run with --apply to write frontmatter.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
