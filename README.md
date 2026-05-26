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

Pushes to `main` run `.github/workflows/deploy-github-pages.yml`.

1. **Settings → Pages** → Source: **Deploy from a branch** → **gh-pages** → **/ (root)**
2. Site URL: `https://petal-gang.github.io/operation-taku/`

Local Pages build test:

```bash
npm run build:pages
```

## Attribution

See footer on the app and `src/data/attributions.ts`, `src/data/pngtreeAttribution.ts`.
