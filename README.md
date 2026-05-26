# Flower Bouquet Builder

A Next.js app to pick up to five flowers, write a note, and view a layered digital bouquet with gift-card download.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Zustand with `sessionStorage` persist (`bouquet-builder-v1`)
- Framer Motion, `html-to-image`
- Fonts: Cormorant Garamond (headings), Dancing Script (note card)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing — floating petals, random compliment, optional ambient music |
| `/builder` | Flower grid (max 5), wrap picker, note form |
| `/bouquet` | Gift card, bouquet, share link, PNG download |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Bouquet assets (PNGTree + SVG decorations)

Phase 2.5 uses **dual assets** per flower:

| Use | Path |
|-----|------|
| Builder preview (stem picks) | `public/flowers/stems/{id}.png` |
| Bouquet gift card (blooms in wrap) | `public/flowers/newflowers/*` |
| Legacy bloom density (unused on card) | `public/flowers/blooms/{id}.png` |
| Triangular paper wrap | `public/wraps/triangle_{pink,beige,blush,sage}.png` |
| Gift-card corners/sides | `public/flowers/{id}.svg` |
| Bouquet greenery | `public/greenery/pngtree/{id}.png` |

### Replace with licensed PNGTree downloads

1. Sign in at [PNGTree](https://pngtree.com/) and download transparent PNGs ([flower stems](https://pngtree.com/so/flower-stem), [leaves](https://pngtree.com/so/leaf)).
2. Save stems as `public/flowers/stems/{id}.png` (same IDs as `src/data/flowers.ts`).
3. Save leaves as `public/greenery/pngtree/{id}.png` (same IDs as `src/data/greenery.ts`).
4. Update `src/data/pngtreeAttribution.ts` with asset URLs if needed.

Until then, run `npm run generate:assets` to rebuild stem, bloom, leaf, and triangular-wrap PNGs from project SVGs.

### Corner decorations (Noun Project / line art)

Keep SVGs in `public/flowers/` for card corners. Update `src/data/attributions.ts` when swapping to Noun Project icons.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new) — preset **Next.js**.
3. No env vars required.

```bash
npm run build
```

## Attribution

- Corner flower SVGs: Noun Project (see footer + `src/data/attributions.ts`)
- Bouquet PNG stems/leaves: [PNGTree](https://pngtree.com/) — see `src/data/pngtreeAttribution.ts` and [license terms](https://pngtree.com/legal/terms)
