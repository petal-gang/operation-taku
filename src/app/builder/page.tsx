"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FlowerCard } from "@/components/FlowerCard";
import { NoteForm } from "@/components/NoteForm";
import { SelectionCounter } from "@/components/SelectionCounter";
import { flowers } from "@/data/flowers";
import { encodeBouquetToSearchParams } from "@/lib/bouquetShare";
import { MAX_FLOWERS, useBouquetStore } from "@/store/bouquetStore";

export default function BuilderPage() {
  const router = useRouter();
  const selectedIds = useBouquetStore((s) => s.selectedIds);
  const note = useBouquetStore((s) => s.note);
  const toggleFlower = useBouquetStore((s) => s.toggleFlower);
  const setNote = useBouquetStore((s) => s.setNote);
  const canBuild = useBouquetStore((s) => s.canBuild);

  const atMax = selectedIds.length >= MAX_FLOWERS;

  const handleBuild = () => {
    if (!canBuild()) return;
    const qs = encodeBouquetToSearchParams({
      flowers: selectedIds,
      note,
    });
    router.push(`/bouquet?${qs}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm text-dark-green/60 underline-offset-2 hover:text-dark-green hover:underline"
            >
              ← Home
            </Link>
            <h1 className="mt-2 font-heading text-4xl font-semibold text-dark-green sm:text-5xl">
              Build a friend card
            </h1>
            <p className="mt-2 text-lg text-dark-green/75">
              Pick flowers, write a note, and surprise someone you actually like.
            </p>
          </div>
          <SelectionCounter count={selectedIds.length} />
        </header>

        <section
          className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4"
          aria-label="Flower selection"
        >
          {flowers.map((flower) => {
            const selected = selectedIds.includes(flower.id);
            const disabled = atMax && !selected;
            return (
              <FlowerCard
                key={flower.id}
                flower={flower}
                selected={selected}
                disabled={disabled}
                onToggle={() => toggleFlower(flower.id)}
              />
            );
          })}
        </section>

        <NoteForm note={note} onChange={setNote} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleBuild}
            disabled={!canBuild()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-gold bg-gold/20 px-8 py-3 text-lg font-semibold text-dark-green transition enabled:hover:bg-gold/35 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Create card
          </button>
          {selectedIds.length < 1 ? (
            <p className="text-sm text-dark-green/60">
              Select at least one flower.
            </p>
          ) : null}
          {!note.message.trim() ? (
            <p className="text-sm text-dark-green/60">Add a message to continue.</p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
