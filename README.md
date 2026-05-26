# Operation Taku

A friend-themed flower card builder — pick flowers, write a note, scatter 100 blooms on a card, download or share.

**Live site:** https://petal-gang.github.io/operation-taku/

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Zustand (`sessionStorage`)
- Framer Motion, `html-to-image`

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing |
| `/builder` | Pick flowers + note |
| `/bouquet` | Card preview, share link, PNG download |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (GitHub Pages)

Workflow: [`.github/workflows/github-pages.yml`](.github/workflows/github-pages.yml) — runs on every push to `main`.

### One-time setup (required)

1. Open **https://github.com/petal-gang/operation-taku/settings/pages**
2. **Build and deployment** → Source: **Deploy from a branch** (not “GitHub Actions”)
3. **Branch:** `gh-pages` · **Folder:** `/ (root)` · Save
4. **Actions** → **GitHub Pages** → **Run workflow** (first run creates `gh-pages`)

### Live URL

**https://petal-gang.github.io/operation-taku/**

### Test locally before pushing

```bash
npm run build:pages
npm run verify:pages
```

## Attribution

See footer on the app and `src/data/attributions.ts`, `src/data/pngtreeAttribution.ts`.
