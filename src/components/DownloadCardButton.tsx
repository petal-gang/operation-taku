"use client";

import { useCallback, useState } from "react";
import { captureGiftCardPng } from "@/lib/captureGiftCard";
import {
  isMobileBrowser,
  saveGiftCardPng,
} from "@/lib/downloadGiftCard";
import { prepareGiftCardForCapture } from "@/lib/prepareGiftCardForCapture";
import { preloadCardImages } from "@/lib/preloadCardImages";

type DownloadCardButtonProps = {
  toName?: string;
};

export function DownloadCardButton({ toName }: DownloadCardButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const closePreview = useCallback(() => setPreviewUrl(null), []);

  const handleDownload = async () => {
    const node = document.getElementById("bouquet-gift-card");
    if (!node) {
      setError("Gift card not found. Try refreshing the page.");
      return;
    }

    setLoading(true);
    setError(null);
    setPreviewUrl(null);

    let restoreCaptureStyles: (() => void) | undefined;

    try {
      await preloadCardImages(node);
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await new Promise((r) => setTimeout(r, 900));
      restoreCaptureStyles = prepareGiftCardForCapture(node);

      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r)),
      );

      const dataUrl = await captureGiftCardPng(node);

      const slug = toName?.trim()
        ? toName.trim().replace(/\s+/g, "-").toLowerCase()
        : "gift";
      const filename = `friend-card-${slug}.png`;

      const result = await saveGiftCardPng(dataUrl, filename);

      if (result === "preview") {
        setPreviewUrl(dataUrl);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      setError(
        isMobileBrowser()
          ? "Could not save the image. Try again or use a screenshot."
          : "Could not save the image. Try refreshing the page.",
      );
    } finally {
      restoreCaptureStyles?.();
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full max-w-sm flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleDownload}
          disabled={loading}
          className="inline-flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-full border-2 border-gold bg-gold/25 px-8 py-3 text-lg font-semibold text-dark-green transition enabled:hover:bg-gold/40 disabled:cursor-wait disabled:opacity-60"
        >
          {loading
            ? "Creating image…"
            : isMobileBrowser()
              ? "Save card"
              : "Download card"}
        </button>
        {isMobileBrowser() && !error ? (
          <p className="text-center text-xs text-dark-green/60">
            Opens your share menu, or press and hold the image to save.
          </p>
        ) : null}
        {error ? (
          <p className="text-center text-sm text-dark-green/70">{error}</p>
        ) : null}
      </div>

      {previewUrl ? (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-end gap-4 bg-dark-green/60 p-4 pb-8 backdrop-blur-sm sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="save-card-title"
        >
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-cream p-4 shadow-2xl">
            <h2
              id="save-card-title"
              className="text-center text-lg font-semibold text-dark-green"
            >
              Save your card
            </h2>
            <p className="text-center text-sm text-dark-green/75">
              Press and hold the image below, then choose{" "}
              <strong>Save Image</strong> (or Add to Photos).
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Your friend card — press and hold to save"
              className="max-h-[55vh] w-full rounded-xl object-contain shadow-lg"
            />
            <button
              type="button"
              onClick={closePreview}
              className="inline-flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-full border-2 border-dark-green/30 px-6 py-3 font-semibold text-dark-green"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
