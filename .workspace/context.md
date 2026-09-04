## Workspace context for code assistants

This project is configured for multiple code assistants (e.g., Cursor, Claude) that share assistant-agnostic resources in `.workspace/` while keeping assistant-specific guidance in their own directories.

### Goals

- Provide a single place for shared scripts, configs, and docs
- Keep assistant-specific rules decoupled from shared project resources
- Make release/versioning and Tekhnema publish workflows unambiguous

## Directory map (high level)

- `AGENTS.md`: Assistant entrypoint (build/deploy orientation)
- `CHANGELOG.md`: Human-readable release notes for each version
- `package.json`: Project metadata and version (authoritative SemVer source)
- `.quartz/`: Quartz framework and build output under `.quartz/public`
- `.workspace/` (assistant-agnostic, shared by all assistants)
  - `scripts/`: Shared automation (e.g., `version-bump.sh`)
  - `config/`: Shared tool/config overrides (e.g., `version-bump.conf`)
  - `docs/`: Project docs and references (`docs/ref`, `docs/arch`, `docs/temp`)
  - `archive/`: Retired workflows (e.g. `archive/github-pages-deploy/`)
- `.cursor/`: Cursor-specific rules and guidance (see `.cursor/rules/rules_index.md`)
- `.claude/`: Claude-specific rules and guidance when present

Note: Site content lives in the project space (outside assistant directories). Assistant directories are scaffolding and guidance only.

## Live site and publish

- Canonical host: `https://www.ssc.studio` (Tekhnema)
- Local build: `npm run build`
- Production deploy: `npm run deploy:tekhnema` (does **not** run on git push)
- Full rules: `.cursor/rules/website_publish.mdc`

## Conventions and workflows

### Conventional Commits → SemVer

- `fix:` → PATCH (0.0.x)
- `feat:` → MINOR (0.x.0)
- `BREAKING CHANGE` or `!` → MAJOR (x.0.0)
- `docs` / `style` / `refactor` / `test` / `chore` → PATCH (non-breaking)

See `.cursor/rules/project_update.mdc` for analysis, bump, changelog, and tag flow. SemVer release does not auto-deploy; use `website_publish.mdc` to ship HTML.

### CHANGELOG

- Maintain `CHANGELOG.md` with one section per release
- Use clear subsections (Added, Changed, Fixed, Removed, Security)
- The version in the changelog must match `package.json`

### Git tags

- Tag releases as `vX.Y.Z`

## Shared script: version bump

- Script: `.workspace/scripts/version-bump.sh`
- Usage: `.workspace/scripts/version-bump.sh [patch|minor|major]`
- Updates `package.json` via `npm version --no-git-tag-version`

Customization without editing the script:

- Optional config file: `.workspace/config/version-bump.conf`
- Optional hooks:
  - Pre: `.workspace/scripts/version-bump.pre.sh VERSION_TYPE CURRENT_VERSION`
  - Post: `.workspace/scripts/version-bump.post.sh VERSION_TYPE NEW_VERSION`

Recommended release flow:

1. Analyze changes (Conventional Commits) and choose bump type
2. Run: `.workspace/scripts/version-bump.sh patch|minor|major`
3. Update `CHANGELOG.md` for the new version
4. Optionally: `npm install` to refresh `package-lock.json`
5. Commit, tag, push (`chore(release): bump…`, then changelog commit, then `vX.Y.Z`)
6. If the live site should update: `npm run deploy:tekhnema`

## Orientation steps for a new assistant

1. Read `AGENTS.md` and this file; scan `.workspace/scripts/` and `.cursor/rules/rules_index.md`
2. Check `package.json` for scripts, tooling, and version
3. Review `CHANGELOG.md` and recent tags/commits for context
4. Use `npm run build` / `npm run serve` for local Quartz work
5. Follow `.cursor/rules/project_update.mdc` for releases and `.cursor/rules/website_publish.mdc` for Tekhnema

## Etiquette for assistants

- Use `.workspace/` for shared, assistant-agnostic assets
- Keep assistant-specific rules/config in their respective directories
- Prefer hooks/config over editing shared scripts directly
- Keep documentation up to date in `.workspace/docs/` and cross-reference from assistant-specific docs

## Environment

- macOS development environment
- Node.js >= 22 and npm for Quartz build and versioning
