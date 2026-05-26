"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type FloatingPetalsProps = {
  count?: number;
  className?: string;
};

export function FloatingPetals({ count = 12, className = "" }: FloatingPetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 17) % 84)}%`,
        delay: (i % 5) * 0.9,
        duration: 9 + (i % 4) * 2,
        size: 10 + (i % 3) * 4,
        drift: i % 2 === 0 ? 24 : -24,
      })),
    [count],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-[50%_50%_50%_0] bg-soft-pink"
          style={{
            left: p.left,
            top: "-8%",
            width: p.size,
            height: p.size,
            opacity: 0.28,
          }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.drift],
            rotate: [0, 180, 360],
            opacity: [0, 0.35, 0.2, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
