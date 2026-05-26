/** Bouquet gift-card blooms — separate from builder stem PNGs in flowers.ts */
export const bouquetVariantsByFlowerId: Record<string, string[]> = {
  rose_red: ["/flowers/newflowers/redrose.png"],
  rose_white: ["/flowers/newflowers/whiterose.png"],
  tulip: ["/flowers/newflowers/tulip-1.png"],
  sunflower: ["/flowers/newflowers/sunflower-imgs.png"],
  lily: ["/flowers/newflowers/lily-1.png", "/flowers/newflowers/lily-2.png"],
  lavender: [
    "/flowers/newflowers/lavender-1.png",
    "/flowers/newflowers/lavender-2.png",
  ],
  baby_breath: [
    "/flowers/newflowers/babybreath-1.png",
    "/flowers/newflowers/babybreath-2.png",
  ],
  peony: ["/flowers/newflowers/peony.png"],
};

export function getVariantCount(flowerId: string): number {
  return bouquetVariantsByFlowerId[flowerId]?.length ?? 1;
}

export function getBouquetVariantSrc(
  flowerId: string,
  variantIndex: number,
): string {
  const variants = bouquetVariantsByFlowerId[flowerId];
  if (!variants?.length) {
    return bouquetVariantsByFlowerId.rose_red![0]!;
  }
  return variants[variantIndex % variants.length]!;
}
