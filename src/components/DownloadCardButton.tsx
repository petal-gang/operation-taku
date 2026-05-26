"use client";

import { useState } from "react";
import { captureGiftCardPng } from "@/lib/captureGiftCard";
import { preloadCardImages } from "@/lib/preloadCardImages";

type DownloadCardButtonProps = {
  toName?: string;
};

export function DownloadCardButton({ toName }: DownloadCardButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    const node = document.getElementById("bouquet-gift-card");
    if (!node) {
      setError("Gift card not found. Try refreshing the page.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await preloadCardImages(node);
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r)),
      );

      const dataUrl = await captureGiftCardPng(node);

      const slug = toName?.trim()
        ? toName.trim().replace(/\s+/g, "-").toLowerCase()
        : "gift";
      const link = document.createElement("a");
      link.download = `friend-card-${slug}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      setError(
        "Could not save the image. On mobile, try a screenshot or desktop browser.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border-2 border-gold bg-gold/25 px-8 py-3 text-lg font-semibold text-dark-green transition enabled:hover:bg-gold/40 disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? "Creating image…" : "Download card"}
      </button>
      {error ? (
        <p className="text-center text-sm text-dark-green/70">{error}</p>
      ) : null}
    </div>
  );
}
