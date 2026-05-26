"use client";

import Image from "next/image";
import { wraps } from "@/data/wraps";

type WrapSelectorProps = {
  selectedId: string;
  onSelect: (wrapId: string) => void;
};

export function WrapSelector({ selectedId, onSelect }: WrapSelectorProps) {
  return (
    <section aria-label="Wrap style">
      <h2 className="font-heading text-2xl font-semibold text-dark-green">
        Choose your wrap
      </h2>
      <p className="mt-1 text-dark-green/70">
        Pick the paper that holds your bouquet together.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {wraps.map((wrap) => {
          const selected = wrap.id === selectedId;
          return (
            <button
              key={wrap.id}
              type="button"
              onClick={() => onSelect(wrap.id)}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition ${
                selected
                  ? "border-gold bg-soft-pink/50 shadow-sm"
                  : "border-warm-beige/80 bg-[#fffef8] hover:border-gold/50"
              }`}
              aria-pressed={selected}
            >
              <Image
                src={wrap.image}
                alt=""
                width={64}
                height={84}
                className="h-auto w-14 object-contain"
              />
              <span className="text-center text-sm font-semibold text-dark-green">
                {wrap.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
