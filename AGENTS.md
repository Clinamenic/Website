# Website -- Agent Guidelines

Quartz digital garden / marketing site for Clinamenic. Content and framework live here; production hosting is Tekhnema.

## Start here

- Rules index: `.cursor/rules/rules_index.md`
- Workspace context: `.workspace/context.md`
- Quartz architecture: `.workspace/docs/arch/quartz-architecture.md`

## Always-on rules (pointers)

- `workspace.mdc` -- scaffolding boundaries
- `style.mdc` -- no emojis in project files
- `website_publish.mdc` -- live host and Tekhnema deploy

## Build and publish

```bash
npm run build              # local Quartz build -> .quartz/public
npm run serve              # local preview
npm run deploy:tekhnema    # build + rsync to Tekhnema (www.ssc.studio)
```

Git push does not update production. Live URL: `https://www.ssc.studio`.

## Ownership

| Concern | Where |
|---------|--------|
| Content, Quartz, site config | this repo |
| nginx/Traefik stack, `deploy-website.sh` | `tekhnema-remote` |
| Legacy GitHub Pages workflow | `.workspace/archive/github-pages-deploy/` (frozen clinamenic.com) |
