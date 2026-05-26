export function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mime = /data:([^;]+);/.exec(header)?.[1] ?? "image/png";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

export function isMobileBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export type SaveGiftCardResult = "downloaded" | "shared" | "preview";

/** Save PNG on desktop; share sheet or long-press preview on mobile. */
export async function saveGiftCardPng(
  dataUrl: string,
  filename: string,
): Promise<SaveGiftCardResult> {
  const blob = dataUrlToBlob(dataUrl);
  const file = new File([blob], filename, { type: "image/png" });

  const canShareFiles =
    typeof navigator.share === "function" &&
    (!navigator.canShare || navigator.canShare({ files: [file] }));

  if (canShareFiles) {
    try {
      await navigator.share({
        files: [file],
        title: "Friend card",
      });
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw err;
      }
    }
  }

  const objectUrl = URL.createObjectURL(blob);
  try {
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();

    if (isIOS()) {
      return "preview";
    }
    return "downloaded";
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }
}
