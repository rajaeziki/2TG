"use client";

import { useEffect, useMemo, useRef } from "react";
import { useLang } from "@/i18n/LangProvider";

export type RingImage = { id: number; url: string };

const MAX = 12;
const RADIUS = 430;

// 3D carousel: square photos on a ring, auto-spinning, draggable.
export default function Ring({ images }: { images: RingImage[] }) {
  const { t } = useLang();
  const n = Math.min(MAX, images.length);
  const items = useMemo(() => Array.from({ length: n }, (_, i) => images[Math.floor((i * images.length) / n)]), [images, n]);
  const stage = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const rot = useRef(0);
  const drag = useRef<{ x: number; r: number } | null>(null);
  const visible = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (visible.current) {
        if (!drag.current && !reduce) rot.current += dt * 14;
        if (stage.current) stage.current.style.transform = `rotateY(${rot.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  if (n === 0) return null;

  return (
    <div
      ref={wrap}
      className="relative mx-auto h-[320px] w-full max-w-4xl cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
      style={{ perspective: "1500px" }}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, r: rot.current };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (drag.current) rot.current = drag.current.r + (e.clientX - drag.current.x) * 0.35;
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
    >
      <div className="absolute left-1/2 top-1/2 h-0 w-0 scale-[0.62] sm:scale-100">
        <div ref={stage} className="relative h-0 w-0 [transform-style:preserve-3d]">
          {items.map((img, i) => (
            <div
              key={img.id}
              className="absolute -left-[110px] -top-[110px] h-[220px] w-[220px] overflow-hidden rounded-xl border border-gold/30 bg-cream-200 shadow-[0_14px_40px_rgba(15,58,48,0.28)] [backface-visibility:hidden]"
              style={{ transform: `rotateY(${(i * 360) / n}deg) translateZ(${RADIUS}px)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={t.gallery.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-2 w-full text-center text-xs text-ink-950/40">{t.gallery.drag}</p>
    </div>
  );
}
