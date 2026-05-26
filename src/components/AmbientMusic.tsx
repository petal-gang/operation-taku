"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Soft ambient pad via Web Audio (no external audio file).
 * Starts muted; user opts in with the control.
 */
export function AmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);

  const stop = useCallback(() => {
    nodesRef.current.forEach((o) => {
      try {
        o.stop();
        o.disconnect();
      } catch {
        /* already stopped */
      }
    });
    nodesRef.current = [];
    gainRef.current?.disconnect();
    gainRef.current = null;
    void ctxRef.current?.close();
    ctxRef.current = null;
    setPlaying(false);
  }, []);

  const start = useCallback(async () => {
    if (typeof window === "undefined") return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    stop();
    const ctx = new AudioCtx();
    await ctx.resume();
    const gain = ctx.createGain();
    gain.gain.value = 0.04;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    const freqs = [261.63, 329.63, 392.0];
    const oscillators = freqs.map((freq) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      osc.start();
      return osc;
    });
    nodesRef.current = oscillators;
    ctxRef.current = ctx;
    setPlaying(true);
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  const toggle = () => {
    if (playing) stop();
    else void start();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-gold/50 bg-cream/90 px-3 py-2 text-xs font-semibold text-dark-green/80 shadow-sm backdrop-blur-sm transition hover:border-gold hover:bg-soft-pink/50"
      aria-pressed={playing}
      aria-label={playing ? "Mute ambient music" : "Play ambient music"}
    >
      {playing ? "♪ On" : "♪ Off"}
    </button>
  );
}
