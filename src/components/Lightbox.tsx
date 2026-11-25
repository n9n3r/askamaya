"use client";

import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import type { GalleryItem } from "@/data/gallery";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  direction: number;
  onClose: () => void;
  onNavigate: (nextIndex: number, direction: number) => void;
}

const SWIPE_DISTANCE_THRESHOLD = 55;
const SWIPE_VELOCITY_THRESHOLD = 320;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : direction > 0 ? 48 : -48,
    opacity: 0,
    scale: 0.985,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction === 0 ? 0 : direction > 0 ? -48 : 48,
    opacity: 0,
    scale: 0.985,
  }),
};

export function Lightbox({
  items,
  activeIndex,
  direction,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = activeIndex !== null;
  const { stop, start } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    const prev = (activeIndex - 1 + items.length) % items.length;
    onNavigate(prev, -1);
  }, [activeIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    const next = (activeIndex + 1) % items.length;
    onNavigate(next, 1);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 40);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      start();
    };
  }, [isOpen, start, stop]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goNext, goPrev]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;
    if (
      offset.x < -SWIPE_DISTANCE_THRESHOLD ||
      velocity.x < -SWIPE_VELOCITY_THRESHOLD
    ) {
      goNext();
    } else if (
      offset.x > SWIPE_DISTANCE_THRESHOLD ||
      velocity.x > SWIPE_VELOCITY_THRESHOLD
    ) {
      goPrev();
    }
  };

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const activeRatio = activeItem
    ? activeItem.src.width / activeItem.src.height
    : 1;

  return (
    <AnimatePresence>
      {isOpen && activeItem && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen architectural photography viewer"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        >
          {/* Minimal hairline close control */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close viewer"
            className="fixed top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/45 hover:bg-black/85 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 sm:top-6 sm:right-6"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3.75 3.75L14.25 14.25M14.25 3.75L3.75 14.25"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Desktop left/right directional controls */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="fixed top-1/2 left-4 z-30 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/45 hover:bg-black/85 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 sm:flex md:left-7"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M11.25 3.75L6 9L11.25 14.25"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="fixed top-1/2 right-4 z-30 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/45 hover:bg-black/85 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 sm:flex md:right-7"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6.75 3.75L12 9L6.75 14.25"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Centered full-bleed photographic stage with touch swipe */}
          <div className="relative flex w-full flex-1 items-center justify-center px-4 pt-16 pb-20 sm:px-20 sm:pt-14 sm:pb-24">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={activeItem.id}
                custom={direction}
                variants={prefersReducedMotion ? undefined : slideVariants}
                initial={prefersReducedMotion ? { opacity: 0 } : "enter"}
                animate={prefersReducedMotion ? { opacity: 1 } : "center"}
                exit={prefersReducedMotion ? { opacity: 0 } : "exit"}
                transition={{
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={handleDragEnd}
                onClick={(e) => e.stopPropagation()}
                className="flex touch-pan-y cursor-grab items-center justify-center active:cursor-grabbing"
              >
                <div
                  className="lightbox-frame relative overflow-hidden bg-[#0D0D0D] ring-1 ring-white/[0.1] shadow-[0_32px_90px_rgba(0,0,0,0.7)]"
                  style={
                    {
                      "--plate-ratio": activeRatio,
                      aspectRatio: `${activeItem.src.width} / ${activeItem.src.height}`,
                    } as CSSProperties
                  }
                >
                  <Image
                    src={activeItem.src}
                    alt={activeItem.alt}
                    fill
                    priority
                    placeholder="blur"
                    quality={90}
                    sizes="(max-width: 640px) 92vw, (max-width: 1440px) 80vw, 1200px"
                    className="pointer-events-none object-cover select-none"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centered pure-image miniature filmstrip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 items-center justify-center gap-1.5 px-3 sm:bottom-6 sm:gap-2"
          >
            {items.map((item) => {
              const isSelected = item.index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onNavigate(
                      item.index,
                      activeIndex !== null && item.index < activeIndex ? -1 : 1
                    )
                  }
                  aria-label={`View image ${item.index + 1}: ${item.alt}`}
                  aria-current={isSelected ? "true" : undefined}
                  className={`relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 sm:h-9 sm:w-9 ${
                    isSelected
                      ? "z-10 scale-110 opacity-100 ring-1 ring-white/95"
                      : "opacity-35 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="40px"
                    quality={60}
                    className="object-cover select-none"
                    draggable={false}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
