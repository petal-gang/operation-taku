import type { ReactNode } from "react";

type GiftCardFrameProps = {
  children: ReactNode;
};

export function GiftCardFrame({ children }: GiftCardFrameProps) {
  return (
    <div
      id="bouquet-gift-card"
      className="relative mx-auto box-border w-full max-w-sm shrink-0 overflow-hidden rounded-3xl p-5 sm:p-6"
      style={{
        aspectRatio: "4 / 5",
        width: "min(100%, 24rem)",
        background:
          "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(220,232,242,0.95) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 75% 75%, rgba(253,235,212,0.85) 0%, transparent 50%), linear-gradient(165deg, #f5f8fb 0%, #eef4f8 45%, #fdebd4 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute left-[12%] top-[18%] h-16 w-16 rounded-full bg-white/50 blur-xl" />
        <div className="absolute right-[15%] top-[35%] h-12 w-12 rounded-full bg-white/40 blur-lg" />
        <div className="absolute bottom-[25%] left-[40%] h-10 w-10 rounded-full bg-white/35 blur-md" />
      </div>

      <div
        className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border-2 border-gold/50 bg-[#fffef8] p-4 shadow-xl sm:p-5"
        style={{
          boxShadow:
            "0 8px 32px rgba(47, 79, 79, 0.12), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 0 0 1px rgba(212, 175, 55, 0.35)",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\"), linear-gradient(#fffef8, #fffef8)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-3 rounded-xl border border-gold/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-0 top-[18%] bottom-[18%] w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-[18%] bottom-[18%] w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent"
          aria-hidden
        />

        <div className="relative z-[1] min-h-0 flex-1 overflow-hidden">
          {children}
        </div>
        <p
          className="relative z-[3] mt-3 shrink-0 text-center text-xs uppercase tracking-[0.2em] text-dark-green/50"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          From a friend
        </p>
      </div>
    </div>
  );
}
