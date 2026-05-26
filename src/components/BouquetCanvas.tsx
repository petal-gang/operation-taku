"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { getFlowerById } from "@/data/flowers";
import { getBouquetVariantSrc } from "@/data/bouquetFlowerAssets";
import { getScatteredBlooms } from "@/data/scatteredBouquetLayout";

type BouquetCanvasProps = {
  selectedIds: string[];
  priority?: boolean;
  animate?: boolean;
};

export function BouquetCanvas({
  selectedIds,
  priority = false,
  animate = true,
}: BouquetCanvasProps) {
  const blooms = useMemo(
    () => getScatteredBlooms(selectedIds),
    [selectedIds],
  );

  const motionProps = (index: number) =>
    animate
      ? {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: {
            duration: 0.35,
            delay: Math.min(index * 0.004, 0.8),
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }
      : { initial: false as const, animate: { opacity: 1, scale: 1 } };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-label="Scattered flowers on card"
    >
      {blooms.map((bloom, index) => {
        const flower = getFlowerById(bloom.flowerId);
        if (!flower) return null;

        const size = Math.round(118 * bloom.scale);
        const src = getBouquetVariantSrc(bloom.flowerId, bloom.variantIndex);

        return (
          <motion.div
            key={`${bloom.flowerId}-${index}-v${bloom.variantIndex}-${bloom.x}`}
            className="pointer-events-none absolute origin-center"
            style={{
              left: `${bloom.x}%`,
              top: `${bloom.y}%`,
              zIndex: 1,
              transform: "translate(-50%, -50%)",
            }}
            {...motionProps(index)}
          >
            <div
              style={{ transform: `rotate(${bloom.rotate}deg)` }}
              className="origin-center"
            >
            <Image
              src={src}
              alt={index === 0 ? flower.name : ""}
              aria-hidden={index > 0}
              width={size}
              height={Math.round(size * 1.1)}
              unoptimized
              className="block h-auto w-auto object-contain drop-shadow-md saturate-[1.08]"
              style={{
                maxHeight: size,
                maxWidth: Math.round(size * 1.05),
              }}
              priority={priority && index < 3}
            />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
