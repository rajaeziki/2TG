"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const SPLASH_MS = 1800;

// Opening screen: the logo draws itself, then the page is revealed. Plays on every page load, kept short.
export default function Splash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setVisible(false), SPLASH_MS);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-cream"
          style={{
            backgroundImage: "radial-gradient(50% 40% at 50% 50%, rgba(15,90,72,0.10), transparent 70%)",
          }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={() => setVisible(false)}
          aria-hidden
        >
          <div className="flex flex-col items-center" dir="ltr">
            <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
              <motion.rect
                x="24"
                y="24"
                width="72"
                height="72"
                rx="10"
                transform="rotate(45 60 60)"
                stroke="#A67C2E"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              <motion.text
                x="60"
                y="70"
                textAnchor="middle"
                fill="#A67C2E"
                fontSize="30"
                fontFamily="var(--font-playfair), serif"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                2T
              </motion.text>
            </svg>
            <motion.p
              className="mt-5 font-display text-4xl font-semibold text-ink-950"
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              2TG
            </motion.p>
            <motion.p
              className="mt-3 text-[11px] uppercase tracking-[0.45em] text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              Business Services
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
