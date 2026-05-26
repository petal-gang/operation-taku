import { toPng } from "html-to-image";

/** Measure export root after layout is stable. */
export function measureGiftCard(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  return {
    width: Math.max(1, Math.ceil(rect.width)),
    height: Math.max(1, Math.ceil(rect.height)),
  };
}

/**
 * Capture #bouquet-gift-card without Retina / width-height cropping bugs.
 * See html-to-image issues #72, #553 — avoid pixelRatio>1 with manual width/height.
 */
export async function captureGiftCardPng(node: HTMLElement): Promise<string> {
  const { width, height } = measureGiftCard(node);
  const exportScale = 2;

  return toPng(node, {
    cacheBust: true,
    backgroundColor: "#f5f8fb",
    pixelRatio: 1,
    width,
    height,
    canvasWidth: width * exportScale,
    canvasHeight: height * exportScale,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      maxWidth: `${width}px`,
      margin: "0",
      boxSizing: "border-box",
      transform: "none",
    },
  });
}
