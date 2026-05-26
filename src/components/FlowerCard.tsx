"use client";

import Image from "next/image";
import type { Flower } from "@/data/flowers";
import { assetPath } from "@/lib/assetPath";

type FlowerCardProps = {
  flower: Flower;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
};

export function FlowerCard({
  flower,
  selected,
  disabled,
  onToggle,
}: FlowerCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      title={flower.meaning}
      aria-pressed={selected}
      aria-label={`${flower.name}${selected ? ", selected" : ""}`}
      className={[
        "group relative flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-2xl border-2 p-4 transition-all",
        "min-w-[44px] touch-manipulation",
        selected
          ? "border-gold bg-soft-pink/50 shadow-md ring-2 ring-gold/40"
          : "border-warm-beige bg-white/70 hover:border-gold/50 hover:bg-soft-peach/40",
        disabled && !selected
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer",
      ].join(" ")}
    >
      <div
        className="relative flex h-24 w-16 items-end justify-center"
        style={
          selected
            ? { boxShadow: `0 0 0 3px ${flower.color}33` }
            : undefined
        }
      >
        <Image
          src={assetPath(flower.image)}
          alt=""
          width={64}
          height={96}
          unoptimized
          className="h-24 w-auto object-contain object-bottom"
        />
      </div>
      <span className="font-heading text-lg font-semibold text-dark-green">
        {flower.name}
      </span>
      <span className="sr-only group-hover:not-sr-only group-focus-within:not-sr-only absolute -bottom-1 left-1/2 z-10 max-w-[90%] -translate-x-1/2 translate-y-full rounded-md bg-dark-green px-2 py-1 text-xs text-cream">
        {flower.meaning}
      </span>
    </button>
  );
}
