"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type CSSProperties } from "react";

type RibbonBowProps = {
  className?: string;
  style?: CSSProperties;
};

export function RibbonBow({ className = "", style }: RibbonBowProps) {
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = () => {
    setMessage("Bonus flair — friend approved.");
    window.setTimeout(() => setMessage(null), 2200);
  };

  const positioned = Boolean(className || style);

  return (
    <div className={className} style={style}>
      <button
        type="button"
        onClick={handleClick}
        className={`${positioned ? "relative mx-auto block" : "absolute left-1/2 -translate-x-1/2"} z-[15] cursor-pointer touch-manipulation rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
        aria-label="Ribbon — click for a surprise"
      >
        <motion.svg
          width="56"
          height="36"
          viewBox="0 0 56 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
        >
          <path
            d="M28 18 C20 8 8 10 10 20 C12 28 22 26 28 18 C34 26 44 28 46 20 C48 10 36 8 28 18Z"
            fill="#e8a0b8"
            stroke="#d4889c"
            strokeWidth="1"
          />
          <circle
            cx="28"
            cy="18"
            r="5"
            fill="#f5c6d6"
            stroke="#d4889c"
            strokeWidth="1"
          />
          <path
            d="M28 23 L28 34"
            stroke="#d4889c"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 32 Q28 28 38 32"
            stroke="#d4889c"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
      </button>
      <AnimatePresence>
        {message ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="pointer-events-none absolute left-1/2 top-full z-[20] mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/40 bg-cream/95 px-3 py-1 text-xs font-semibold text-dark-green shadow-md"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
