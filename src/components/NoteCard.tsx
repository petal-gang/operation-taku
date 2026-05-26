"use client";

import { useBouquetStore } from "@/store/bouquetStore";

type NoteCardProps = {
  /** overlay = legacy absolute top; card = flex row at bottom/middle */
  variant?: "overlay" | "card";
};

export function NoteCard({ variant = "card" }: NoteCardProps) {
  const note = useBouquetStore((s) => s.note);

  const baseClass =
    "rounded-sm border border-warm-beige/80 bg-[#fffef8] px-3 py-4 shadow-lg sm:px-4 sm:py-5";

  const variantClass =
    variant === "overlay"
      ? "absolute right-2 top-[8%] z-[8] w-[min(88%,200px)] -rotate-2 sm:right-4"
      : "relative mx-auto w-[min(92%,220px)] -rotate-1";

  return (
    <div
      className={`${baseClass} ${variantClass}`}
      style={{
        boxShadow: "2px 4px 14px rgba(47, 79, 79, 0.14)",
        backgroundColor: "#fffef8",
      }}
    >
      {note.to.trim() ? (
        <p
          className="mb-1.5 text-xs text-dark-green/70 sm:text-sm"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          To: {note.to}
        </p>
      ) : null}
      <p
        className="whitespace-pre-wrap text-base leading-relaxed text-dark-green sm:text-lg"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        {note.message}
      </p>
    </div>
  );
}
