export type GreenerySlot = {
  greeneryId: string;
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  zIndex: number;
};

/** Auto-placed leaf slots — tightened ~25%, smaller scale to frame dome */
export const greeneryLayouts: Record<number, GreenerySlot[]> = {
  1: [
    {
      greeneryId: "lily_leaf",
      x: -42,
      y: -18,
      rotate: -18,
      scale: 0.65,
      zIndex: 0,
    },
    {
      greeneryId: "eucalyptus_round",
      x: 38,
      y: 11,
      rotate: 12,
      scale: 0.55,
      zIndex: 1,
    },
    {
      greeneryId: "vine_curl",
      x: 0,
      y: 42,
      rotate: 5,
      scale: 0.5,
      zIndex: 2,
    },
  ],
  2: [
    {
      greeneryId: "lily_leaf",
      x: 0,
      y: -34,
      rotate: -5,
      scale: 0.7,
      zIndex: 0,
    },
    {
      greeneryId: "fern_frond",
      x: -56,
      y: 8,
      rotate: -22,
      scale: 0.6,
      zIndex: 1,
    },
    {
      greeneryId: "fern_frond",
      x: 56,
      y: 8,
      rotate: 22,
      scale: 0.6,
      zIndex: 1,
    },
    {
      greeneryId: "eucalyptus_round",
      x: 0,
      y: 38,
      rotate: 0,
      scale: 0.5,
      zIndex: 2,
    },
  ],
  3: [
    {
      greeneryId: "lily_leaf",
      x: 0,
      y: -38,
      rotate: -5,
      scale: 0.72,
      zIndex: 0,
    },
    {
      greeneryId: "olive_branch",
      x: -60,
      y: 4,
      rotate: -15,
      scale: 0.62,
      zIndex: 1,
    },
    {
      greeneryId: "olive_branch",
      x: 60,
      y: 4,
      rotate: 15,
      scale: 0.62,
      zIndex: 1,
    },
    {
      greeneryId: "eucalyptus_round",
      x: -19,
      y: 34,
      rotate: -8,
      scale: 0.48,
      zIndex: 2,
    },
    {
      greeneryId: "vine_curl",
      x: 22,
      y: 42,
      rotate: 10,
      scale: 0.5,
      zIndex: 3,
    },
    {
      greeneryId: "sage_leaf",
      x: -45,
      y: 26,
      rotate: -12,
      scale: 0.45,
      zIndex: 2,
    },
  ],
  4: [
    {
      greeneryId: "lily_leaf",
      x: 0,
      y: -42,
      rotate: -5,
      scale: 0.75,
      zIndex: 0,
    },
    {
      greeneryId: "fern_frond",
      x: -64,
      y: 0,
      rotate: -20,
      scale: 0.62,
      zIndex: 1,
    },
    {
      greeneryId: "sage_leaf",
      x: 64,
      y: 0,
      rotate: 20,
      scale: 0.62,
      zIndex: 1,
    },
    {
      greeneryId: "eucalyptus_round",
      x: -26,
      y: 30,
      rotate: -10,
      scale: 0.45,
      zIndex: 2,
    },
    {
      greeneryId: "eucalyptus_round",
      x: 30,
      y: 26,
      rotate: 8,
      scale: 0.45,
      zIndex: 2,
    },
    {
      greeneryId: "vine_curl",
      x: 0,
      y: 46,
      rotate: 0,
      scale: 0.55,
      zIndex: 4,
    },
    {
      greeneryId: "fern_frond",
      x: 42,
      y: 36,
      rotate: 18,
      scale: 0.42,
      zIndex: 3,
    },
  ],
  5: [
    {
      greeneryId: "lily_leaf",
      x: 0,
      y: -44,
      rotate: -5,
      scale: 0.75,
      zIndex: 0,
    },
    {
      greeneryId: "fern_frond",
      x: -68,
      y: -4,
      rotate: -22,
      scale: 0.65,
      zIndex: 1,
    },
    {
      greeneryId: "olive_branch",
      x: 68,
      y: -4,
      rotate: 22,
      scale: 0.65,
      zIndex: 1,
    },
    {
      greeneryId: "eucalyptus_round",
      x: -30,
      y: 28,
      rotate: -12,
      scale: 0.45,
      zIndex: 2,
    },
    {
      greeneryId: "sage_leaf",
      x: 34,
      y: 32,
      rotate: 10,
      scale: 0.48,
      zIndex: 2,
    },
    {
      greeneryId: "vine_curl",
      x: 0,
      y: 46,
      rotate: 3,
      scale: 0.55,
      zIndex: 4,
    },
    {
      greeneryId: "lily_leaf",
      x: -42,
      y: 36,
      rotate: -14,
      scale: 0.42,
      zIndex: 3,
    },
  ],
};

/** Fewer leaves on narrow viewports. */
export const greeneryLayoutsMobile: Record<number, GreenerySlot[]> = {
  1: greeneryLayouts[1].slice(0, 2),
  2: greeneryLayouts[2].slice(0, 3),
  3: greeneryLayouts[3].slice(0, 4),
  4: greeneryLayouts[4].slice(0, 4),
  5: greeneryLayouts[5].slice(0, 4),
};

export function getGreeneryLayoutForCount(
  count: number,
  mobile = false,
): GreenerySlot[] {
  const clamped = Math.min(5, Math.max(1, count));
  const table = mobile ? greeneryLayoutsMobile : greeneryLayouts;
  return table[clamped] ?? table[1];
}
