"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BouquetCanvas } from "@/components/BouquetCanvas";
import { FloatingPetals } from "@/components/FloatingPetals";
import { CopyShareLinkButton } from "@/components/CopyShareLinkButton";
import { DownloadCardButton } from "@/components/DownloadCardButton";
import { GiftCardFrame } from "@/components/GiftCardFrame";
import { NoteCard } from "@/components/NoteCard";
import { decodeBouquetFromSearchParams } from "@/lib/bouquetShare";
import { useBouquetStore } from "@/store/bouquetStore";

function BouquetPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hydrated, setHydrated] = useState(false);
  const [shareApplied, setShareApplied] = useState(false);

  const selectedIds = useBouquetStore((s) => s.selectedIds);
  const note = useBouquetStore((s) => s.note);
  const reset = useBouquetStore((s) => s.reset);
  const hydrateFromShare = useBouquetStore((s) => s.hydrateFromShare);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || shareApplied) return;
    const qs = searchParams.toString();
    if (!qs) {
      setShareApplied(true);
      return;
    }
    const payload = decodeBouquetFromSearchParams(qs);
    if (payload) {
      hydrateFromShare({
        selectedIds: payload.flowers,
        note: payload.note,
      });
    }
    setShareApplied(true);
  }, [hydrated, searchParams, shareApplied, hydrateFromShare]);

  useEffect(() => {
    if (hydrated && shareApplied && selectedIds.length === 0) {
      router.replace("/builder");
    }
  }, [hydrated, shareApplied, selectedIds.length, router]);

  if (!hydrated || !shareApplied) {
    return (
      <main className="flex min-h-screen items-center justify-center text-dark-green/70">
        Loading your card…
      </main>
    );
  }

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <FloatingPetals count={8} className="opacity-60" />
      <main className="relative z-[1] mx-auto flex w-full max-w-lg flex-1 flex-col items-center gap-8 px-4 py-10 sm:px-6">
        <header className="w-full text-center">
          <h1 className="font-heading text-4xl font-semibold text-dark-green sm:text-5xl">
            Your flower card
          </h1>
          <p className="mt-2 text-lg text-dark-green/75">
            Ready to send to a friend.
          </p>
        </header>

        <GiftCardFrame>
          <div className="relative flex min-h-[380px] flex-col overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <BouquetCanvas selectedIds={selectedIds} priority animate />
            </div>
            <div className="relative z-50 flex flex-1 items-center justify-center px-3 py-6">
              <NoteCard variant="card" />
            </div>
          </div>
        </GiftCardFrame>

        <div className="flex w-full max-w-sm flex-col gap-3">
          <DownloadCardButton toName={note.to} />
          <CopyShareLinkButton />
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/builder"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-dark-green/30 px-6 py-3 text-center font-semibold text-dark-green transition hover:border-gold hover:bg-soft-peach/50"
            >
              Edit card
            </Link>
            <button
              type="button"
              onClick={() => {
                reset();
                router.push("/builder");
              }}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-warm-beige px-6 py-3 font-semibold text-dark-green/80 transition hover:border-gold/50 hover:text-dark-green"
            >
              Start over
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BouquetPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center text-dark-green/70">
          Loading your card…
        </main>
      }
    >
      <BouquetPageContent />
    </Suspense>
  );
}
