import { getVariantCount } from "@/data/bouquetFlowerAssets";

export const CARD_BLOOM_COUNT = 100;

const GRID_COLS = 10;
const GRID_ROWS = 10;

export type ScatteredBloom = {
  flowerId: string;
  variantIndex: number;
  /** Horizontal position as % of card area (0–100). */
  x: number;
  /** Vertical position as % of card area (0–100). */
  y: number;
  rotate: number;
  scale: number;
  zIndex: number;
};

function createRng(seed: string) {
  let state = 0;
  for (let i = 0; i < seed.length; i++) {
    state = (state * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

/** Build exactly 100 flower ids: one type → ×100; many types → mixed frequency. */
export function expandToCardBlooms(selectedIds: string[]): string[] {
  if (selectedIds.length === 0) return [];

  const rng = createRng(`${selectedIds.join(",")}:expand`);

  if (selectedIds.length === 1) {
    return Array(CARD_BLOOM_COUNT).fill(selectedIds[0]!);
  }

  const ids: string[] = [];
  while (ids.length < CARD_BLOOM_COUNT) {
    if (rng() < 0.55) {
      ids.push(selectedIds[ids.length % selectedIds.length]!);
    } else {
      ids.push(selectedIds[Math.floor(rng() * selectedIds.length)]!);
    }
  }
  return ids;
}

/** Shuffle grid cell order so placement feels random but covers the whole card. */
function shuffledCellIndices(rng: () => number): number[] {
  const indices = Array.from({ length: CARD_BLOOM_COUNT }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j]!, indices[i]!];
  }
  return indices;
}

/** Stable layout: 100 blooms on a jittered grid (corners to center). */
export function getScatteredBlooms(selectedIds: string[]): ScatteredBloom[] {
  const flowerIds = expandToCardBlooms(selectedIds);
  if (flowerIds.length === 0) return [];

  const rng = createRng(flowerIds.join("|"));
  const cellOrder = shuffledCellIndices(rng);
  const variantUse = new Map<string, number>();
  const cellW = 100 / GRID_COLS;
  const cellH = 100 / GRID_ROWS;

  const nextVariant = (flowerId: string) => {
    const n = variantUse.get(flowerId) ?? 0;
    variantUse.set(flowerId, n + 1);
    return n % getVariantCount(flowerId);
  };

  const placed: ScatteredBloom[] = [];

  for (let i = 0; i < flowerIds.length; i++) {
    const flowerId = flowerIds[i]!;
    const cell = cellOrder[i] ?? i;
    const col = cell % GRID_COLS;
    const row = Math.floor(cell / GRID_COLS);

    const x =
      (col + 0.5) * cellW + (rng() - 0.5) * cellW * 0.65;
    const y =
      (row + 0.5) * cellH + (rng() - 0.5) * cellH * 0.65;

    placed.push({
      flowerId,
      variantIndex: nextVariant(flowerId),
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y)),
      rotate: Math.round((rng() - 0.5) * 80),
      scale: 0.62 + rng() * 0.38,
      zIndex: i + 1,
    });
  }

  return placed.sort((a, b) => a.zIndex - b.zIndex);
}
