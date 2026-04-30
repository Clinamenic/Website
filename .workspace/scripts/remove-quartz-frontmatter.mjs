#!/usr/bin/env node
/**
 * Removes known Quartz YAML frontmatter keys from Markdown files.
 * Default: dry-run. Pass --apply to write changes.
 */

import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(SCRIPT_DIR, '..', '..');

const QUARTZ_KEYS = Object.freeze([
  'quartzSearch',
  'quartzShowArchive',
  'quartzShowBacklinks',
  'quartzShowBanner',
  'quartzShowCitation',
  'quartzShowExplorer',
  'quartzShowFlex',
  'quartzShowGraph',
  'quartzShowSubtitle',
  'quartzShowTitle',
  'quartzShowTOC',
]);

function escapeRegexToken(s) {
  return String(s).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

const QUARTZ_KEY_ALT = [...QUARTZ_KEYS]
  .sort((a, b) => b.length - a.length)
  .map(escapeRegexToken)
  .join('|');

const KEY_LINE_REGEX = new RegExp(`^\\s*(?:${QUARTZ_KEY_ALT})\\s*:`);

function normalizeFrontmatterWhitespace(inner) {
  let s = inner.replace(/\n\n\n+/g, '\n\n');
  s = s.replace(/\n+$/, '');
  return s;
}

function splitYamlFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  if ((lines[0] ?? '').trim() !== '---') return null;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      const frontmatterInner = lines.slice(1, i).join('\n');
      const body = lines.slice(i + 1).join('\n');
      return { frontmatterInner, body };
    }
  }
  return null;
}

function stripQuartzKeyLines(inner) {
  const lines = inner.split(/\r?\n/);
  const kept = [];
  const removed = [];

  for (const line of lines) {
    if (KEY_LINE_REGEX.test(line)) {
      KEY_LINE_REGEX.lastIndex = 0;
      removed.push(line);
    } else {
      KEY_LINE_REGEX.lastIndex = 0;
      kept.push(line);
    }
  }

  const stripped = kept.join('\n');
  const normalized = normalizeFrontmatterWhitespace(stripped);
  return { removedLines: removed, normalizedBlock: normalized };
}

function shouldSkipDirectory(fullPath) {
  const name = path.basename(fullPath);
  if (
    name === 'node_modules' ||
    name === '.git' ||
    name === 'public' ||
    name === '.quartz-cache'
  ) {
    return true;
  }
  const norm = fullPath.replace(/\\/g, '/');
  if (norm.includes('/.workspace/archive/') || norm.endsWith('/.workspace/archive')) {
    return true;
  }
  return false;
}

async function* walkMarkdownFiles(root) {
  const stack = [path.resolve(root)];

  while (stack.length) {
    const dir = stack.pop();
    let ents;
    try {
      ents = await readdir(dir, { withFileTypes: true });
    } catch {
      continue;
    }

    ents.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = ents.length - 1; i >= 0; i--) {
      const e = ents[i];
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (!shouldSkipDirectory(full)) stack.push(full);
      } else if (e.name.endsWith('.md')) {
        yield full;
      }
    }
  }
}

function parseFlags(argv) {
  const opts = {
    root: DEFAULT_ROOT,
    apply: false,
    verbose: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--apply') opts.apply = true;
    else if (a === '--verbose' || a === '-v') opts.verbose = true;
    else if (a === '--root') {
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        console.error('Missing argument for --root');
        process.exit(2);
      }
      i++;
      opts.root = path.resolve(next);
    } else if (a === '--help' || a === '-h') {
      printHelp();
      process.exit(0);
    } else {
      console.error(`Unknown option: ${a}`);
      printHelp();
      process.exit(2);
    }
  }
  return opts;
}

function printHelp() {
  console.log(`Usage: node remove-quartz-frontmatter.mjs [options]

Options:
  --root <path>   Directory to scan for **/*.md (default: website repo root)
  --apply         Write modified files (default is dry-run only)
  --verbose, -v   Print each removed line

Removes only these YAML frontmatter keys (${QUARTZ_KEYS.length} keys):
${QUARTZ_KEYS.map((k) => `  ${k}`).join('\n')}
`);
}

function keyNameFromLine(line) {
  const m = String(line).match(/^\s*([a-zA-Z0-9_]+)\s*:/);
  return m?.[1] ?? null;
}

async function main() {
  const opts = parseFlags(process.argv.slice(2));
  const files = [];

  for await (const f of walkMarkdownFiles(opts.root)) {
    files.push(f);
  }
  files.sort();

  let filesWithChanges = 0;
  let totalKeyLinesRemoved = 0;
  let skippedNoFm = 0;
  let skippedNoKeys = 0;

  for (const filePath of files) {
    let raw;
    try {
      raw = await readFile(filePath, 'utf8');
    } catch {
      continue;
    }

    const fm = splitYamlFrontmatter(raw);
    if (!fm) {
      skippedNoFm++;
      continue;
    }

    const { removedLines, normalizedBlock } = stripQuartzKeyLines(fm.frontmatterInner);

    if (removedLines.length === 0) {
      skippedNoKeys++;
      continue;
    }

    filesWithChanges++;
    totalKeyLinesRemoved += removedLines.length;

    const relative = path.relative(opts.root, filePath) || filePath;
    const names = [];
    console.log('');
    console.log(`${relative}`);
    console.log(`  Removed ${removedLines.length} line(s):`);

    for (const ln of removedLines) {
      const nm = keyNameFromLine(ln);
      if (nm) names.push(nm);
      if (opts.verbose) {
        console.log(`    ${ln}`);
      }
    }

    if (!opts.verbose && names.length > 0) {
      console.log(`  Keys: ${[...new Set(names)].join(', ')}`);
    }

    const newContent = `---\n${normalizedBlock}\n---\n${fm.body}`;

    if (opts.apply) {
      await writeFile(filePath, newContent, 'utf8');
      console.log('  [written]');
    }
  }

  console.log('');
  console.log(
    [
      `Summary: ${files.length} Markdown file(s) scanned.`,
      `${skippedNoFm} skipped (no valid frontmatter).`,
      `${skippedNoKeys} skipped (no matching keys).`,
      `${filesWithChanges} file(s) ${opts.apply ? 'updated' : 'would change'}; ${totalKeyLinesRemoved} Quartz key line(s) removed.`,
      opts.apply ? '' : 'Re-run with --apply to write files.',
    ]
      .filter(Boolean)
      .join(' '),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
