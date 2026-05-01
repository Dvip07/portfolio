"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  images: { src: string; alt: string }[];
  interval?: number; // ms between auto-advances, default 4000
}

export default function ImageCarousel({ images, interval = 4000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  // Auto-advance
  useEffect(() => {
    if (paused || images.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [paused, next, interval, images.length]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ aspectRatio: "3/4", background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={current === 0}
          />
          {/* Subtle gradient at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24"
            style={{ background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)", opacity: 0.6 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all opacity-70 hover:opacity-100"
            style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            aria-label="Previous image"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--fg)" }}>
              <path d="M10 4l-6 4 6 4" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all opacity-70 hover:opacity-100"
            style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            aria-label="Next image"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--fg)" }}>
              <path d="M6 4l6 4-6 4" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "20px" : "8px",
                height: "8px",
                background: i === current ? "var(--gold)" : "var(--fg-faint)",
              }}
            />
          ))}
        </div>
      )}

      {/* Auto-play progress bar */}
      {!paused && images.length > 1 && (
        <motion.div
          key={`progress-${current}`}
          className="absolute bottom-0 left-0 h-0.5 z-10"
          style={{ background: "var(--gold)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: interval / 1000, ease: "linear" }}
        />
      )}
    </div>
  );
}
