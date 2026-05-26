"use client";

import { MAX_FLOWERS } from "@/store/bouquetStore";

type SelectionCounterProps = {
  count: number;
};

export function SelectionCounter({ count }: SelectionCounterProps) {
  return (
    <p className="text-lg text-dark-green/80 font-medium tracking-wide">
      <span className="text-gold font-semibold">{count}</span>
      {count === 1 ? " flower" : " flowers"}
      <span className="text-dark-green/50"> · up to {MAX_FLOWERS}</span>
    </p>
  );
}
