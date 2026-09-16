# Archived: GitHub Pages deploy

Previously the Quartz site published to GitHub Pages at `www.clinamenic.com` via this workflow.

## Status

- Active publish target is Tekhnema: `https://www.ssc.studio` via `tekhnema-remote/.workspace/scripts/deploy-website.sh`.
- DNS for apex `clinamenic.com` and `www.clinamenic.com` points to Tekhnema (`178.105.131.220`).
- Traefik on `website-static` permanently redirects those hosts to `https://www.ssc.studio` (path preserved).
- GitHub Pages custom domain for `www.clinamenic.com` should remain disabled so Pages cannot reclaim the hostname.
- Do not re-enable this workflow unless intentionally resurrecting Pages deploys.

## Contents

| File | Role |
|------|------|
| `deploy.yml` | Former `.github/workflows/deploy.yml` (build Quartz, deploy-pages) |
| `CNAME` | Former repo-root CNAME (`www.clinamenic.com`) for Pages custom domain |

## Restore (if needed)

1. Copy `deploy.yml` back to `.github/workflows/deploy.yml`
2. Copy `CNAME` to the website repo root
3. Re-enable GitHub Pages in the repo settings if disabled
4. Set Quartz `baseUrl` back to `www.clinamenic.com` for that build target
5. Point DNS back at GitHub Pages and remove Traefik clinamenic routers from `docker-compose.website.yml`
