# Deploy School Dynamics to Netlify

This deploys the **staff + parent portal app** (`webapp/`) — the same experience as `npm run dev` in `webapp/`, including the landing page at `/`.

The **static marketing site** in the repo root (`index.html`, `style.css`, …) is *not* included in this build. It can stay on [GitHub Pages](https://genoj83.github.io/School-Dynamics/) or you can add a second Netlify site later.

## Option A — Netlify UI (recommended)

1. Push this repository to GitHub (if it is not already).
2. In [Netlify](https://app.netlify.com): **Add new site** → **Import an existing project** → pick the repo.
3. Netlify should read **`netlify.toml`** automatically:
   - **Build command:** `cd webapp && npm ci && npm run build`
   - **Publish directory:** `webapp/dist`
4. Deploy. Your live URL will look like `https://random-name.netlify.app`.
5. Optional: **Domain settings** → add a custom domain.

## Option B — Netlify CLI

```bash
npm install -g netlify-cli
cd /path/to/School-Dynamics
netlify login
netlify init    # link site, confirm build settings from netlify.toml
netlify deploy --prod
```

## After deploy

- Open the site root `/` — portal chooser (staff vs parent).
- Staff: `/login` → `/app/dashboard`
- Parents: `/parents/login`

If routes 404 on refresh, confirm `netlify.toml` includes the `[[redirects]]` block (SPA fallback).

## Environment

- **Node 20** is set in `netlify.toml`. Change `NODE_VERSION` if your team standard differs.
