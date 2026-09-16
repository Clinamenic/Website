#!/usr/bin/env node
/**
 * Warn when published indexable pages lack headDescription.
 * Always exits 0 (warnings only). Does not fail the build.
 *
 * Usage: node .workspace/scripts/seo-lint-headdescription.mjs
 *        npm run seo:lint
 */

import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_ROOT = path.resolve(SCRIPT_DIR, "..", "..")

const SKIP_DIRS = new Set([
  ".quartz",
  ".workspace",
  ".git",
  ".obsidian",
  "node_modules",
  "public",
  "templates",
  "private",
])

const LINT_TYPES = new Set([
  "writing",
  "service",
  "site-page",
  "publication",
  "project",
])

/** Mirrors quartz/util/indexPolicy.ts for a quick self-check */
function isSearchEngineIndexed(frontmatter) {
  if (frontmatter.index === true || frontmatter.index === "true") return true
  if (frontmatter.index === false || frontmatter.index === "false") return false
  const type = typeof frontmatter.type === "string" ? frontmatter.type.trim() : ""
  if (type === "zettel") return false
  return true
}

function splitYamlFrontmatter(text) {
  const lines = text.split(/\n/)
  if (lines[0]?.trim() !== "---") return null
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      return {
        frontmatterInner: lines.slice(1, i).join("\n"),
      }
    }
  }
  return null
}

function parseSimpleFrontmatter(inner) {
  const result = {}
  for (const line of inner.split(/\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!m) continue
    const key = m[1]
    let value = m[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (value === "true") result[key] = true
    else if (value === "false") result[key] = false
    else if (value === "" || value === "|" || value === ">") result[key] = ""
    else result[key] = value
  }
  return result
}

async function walkMarkdown(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.name !== ".") {
      if (SKIP_DIRS.has(entry.name)) continue
    }
    if (SKIP_DIRS.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkMarkdown(full, out)
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(full)
    }
  }
  return out
}

function selfCheckIndexPolicy() {
  const cases = [
    [{ type: "zettel" }, false],
    [{ type: "zettel", index: true }, true],
    [{ type: "zettel", index: "true" }, true],
    [{ type: "writing" }, true],
    [{ type: "writing", index: false }, false],
  ]
  for (const [input, expected] of cases) {
    const got = isSearchEngineIndexed(input)
    if (got !== expected) {
      console.error(`indexPolicy self-check failed: ${JSON.stringify(input)} => ${got}, expected ${expected}`)
      process.exitCode = 1
      return false
    }
  }
  console.log("indexPolicy self-check: ok")
  return true
}

async function main() {
  selfCheckIndexPolicy()

  const files = await walkMarkdown(CONTENT_ROOT)
  const missing = []

  for (const file of files) {
    const text = await readFile(file, "utf8")
    const split = splitYamlFrontmatter(text)
    if (!split) continue
    const fm = parseSimpleFrontmatter(split.frontmatterInner)
    if (fm.publish !== true && fm.publish !== "true") continue
    const type = typeof fm.type === "string" ? fm.type.trim() : ""
    if (!LINT_TYPES.has(type)) continue
    const desc = typeof fm.headDescription === "string" ? fm.headDescription.trim() : ""
    if (!desc) {
      missing.push(path.relative(CONTENT_ROOT, file))
    }
  }

  if (missing.length === 0) {
    console.log("seo:lint: all published indexable types have headDescription")
  } else {
    console.warn(
      `seo:lint: ${missing.length} published page(s) missing headDescription (warn only):`,
    )
    for (const rel of missing.sort()) {
      console.warn(`  - ${rel}`)
    }
  }

  // Always succeed for missing descriptions; only fail on self-check
  if (process.exitCode !== 1) {
    process.exitCode = 0
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
