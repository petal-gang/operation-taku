"use client";

import Image from "next/image";
import { getFlowerById } from "@/data/flowers";
import { assetPath } from "@/lib/assetPath";

type SlotId =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "sideLeft"
  | "sideRight";

type DecorSlot = {
  id: SlotId;
  flowerId: string;
  className: string;
  rotate: number;
  scale: number;
  opacity: number;
};

function resolveFlowerId(selectedIds: string[], index: number): string | null {
  if (selectedIds.length === 0) return null;
  return selectedIds[index % selectedIds.length] ?? selectedIds[0];
}

function buildSlots(selectedIds: string[]): DecorSlot[] {
  if (selectedIds.length === 0) return [];

  const omitBottom = selectedIds.length <= 2;

  const slots: DecorSlot[] = [
    {
      id: "topLeft",
      flowerId: resolveFlowerId(selectedIds, 0)!,
      className: "top-3 left-3",
      rotate: -12,
      scale: 0.38,
      opacity: 0.35,
    },
    {
      id: "topRight",
      flowerId: resolveFlowerId(selectedIds, 1)!,
      className: "top-3 right-3",
      rotate: 12,
      scale: 0.38,
      opacity: 0.35,
    },
  ];

  if (!omitBottom) {
    slots.push(
      {
        id: "bottomLeft",
        flowerId: resolveFlowerId(selectedIds, 2)!,
        className: "bottom-[18%] left-3",
        rotate: 8,
        scale: 0.34,
        opacity: 0.38,
      },
      {
        id: "bottomRight",
        flowerId: resolveFlowerId(selectedIds, 3)!,
        className: "bottom-[18%] right-3",
        rotate: -8,
        scale: 0.34,
        opacity: 0.38,
      },
    );
  }

  if (selectedIds.length >= 3) {
    slots.push({
      id: "sideLeft",
      flowerId: resolveFlowerId(selectedIds, 4)!,
      className: "left-1 top-[42%]",
      rotate: -6,
      scale: 0.32,
      opacity: 0.4,
    });
  }

  if (selectedIds.length >= 2) {
    slots.push({
      id: "sideRight",
      flowerId:
        selectedIds.length <= 2
          ? resolveFlowerId(selectedIds, 0)!
          : resolveFlowerId(selectedIds, 1)!,
      className: "right-1 top-[48%]",
      rotate: 6,
      scale: 0.32,
      opacity: 0.4,
    });
  }

  return slots;
}

function CornerFlourish({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-5 w-5 border-gold/50 ${className}`}
      aria-hidden
    />
  );
}

type CardCornerDecorationsProps = {
  selectedIds: string[];
};

export function CardCornerDecorations({
  selectedIds,
}: CardCornerDecorationsProps) {
  const slots = buildSlots(selectedIds);
  const showBottomFlourish = selectedIds.length > 2;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-visible">
      <CornerFlourish className="left-3 top-3 border-l-2 border-t-2" />
      <CornerFlourish className="right-3 top-3 border-r-2 border-t-2" />
      {showBottomFlourish ? (
        <>
          <CornerFlourish className="bottom-[18%] left-3 border-b-2 border-l-2" />
          <CornerFlourish className="bottom-[18%] right-3 border-b-2 border-r-2" />
        </>
      ) : null}

      {slots.map((slot) => {
        const flower = getFlowerById(slot.flowerId);
        if (!flower) return null;
        const size = Math.round(72 * slot.scale);

        return (
          <div
            key={slot.id}
            className={`absolute ${slot.className}`}
            style={{
              opacity: slot.opacity,
              transform: `rotate(${slot.rotate}deg)`,
            }}
          >
            <Image
              src={assetPath(flower.decorationImage)}
              alt=""
              width={size}
              height={size}
              unoptimized
              className="drop-shadow-sm"
            />
          </div>
        );
      })}
    </div>
  );
}
