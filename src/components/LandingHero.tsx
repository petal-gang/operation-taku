"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pickRandomCompliment } from "@/data/compliments";
import { AmbientMusic } from "./AmbientMusic";
import { FloatingPetals } from "./FloatingPetals";

export function LandingHero() {
  const [compliment, setCompliment] = useState("");

  useEffect(() => {
    setCompliment(pickRandomCompliment());
  }, []);

  return (
    <main className="relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16">
      <FloatingPetals count={14} />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--soft-pink) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, var(--soft-peach) 0%, transparent 45%), linear-gradient(180deg, var(--cream) 0%, var(--warm-beige) 100%)",
        }}
      />
      <div className="max-w-2xl text-center">
        <h1 className="font-heading text-5xl font-semibold tracking-tight text-dark-green sm:text-6xl md:text-7xl">
          Flower Card for Friends
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-dark-green/80 sm:text-2xl">
          Pick flowers, write a note, and send a fun card to a friend — no
          romance required.
        </p>
        {compliment ? (
          <p
            className="mt-5 text-lg italic text-dark-green/65 animate-fade-in"
          >
            {compliment}
          </p>
        ) : null}
        <Link
          href="/builder"
          className="mt-10 inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full border-2 border-gold bg-gold/15 px-10 py-3 text-lg font-semibold text-dark-green transition hover:bg-gold/30"
        >
          Start building
        </Link>
      </div>
      <AmbientMusic />
    </main>
  );
}
