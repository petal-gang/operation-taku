"use client";

import { useState } from "react";
import { buildShareUrl } from "@/lib/bouquetShare";
import { useBouquetStore } from "@/store/bouquetStore";

export function CopyShareLinkButton() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedIds = useBouquetStore((s) => s.selectedIds);
  const note = useBouquetStore((s) => s.note);

  const handleCopy = async () => {
    setError(null);
    const url = buildShareUrl({
      flowers: selectedIds,
      note,
    });

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Could not copy link. Try selecting the URL from the address bar.");
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-1">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border-2 border-dark-green/25 px-6 py-3 font-semibold text-dark-green transition hover:border-gold hover:bg-soft-peach/50"
      >
        {copied ? "Link copied!" : "Copy share link"}
      </button>
      {error ? (
        <p className="text-center text-sm text-dark-green/70">{error}</p>
      ) : null}
    </div>
  );
}
