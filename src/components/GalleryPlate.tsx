"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
} from "motion/react";
import type { GalleryItem } from "@/data/gallery";

interface GalleryPlateProps {
  item: GalleryItem;
  onSelect: (index: number, triggerEl: HTMLButtonElement) => void;
  priority?: boolean;
  isFirst?: boolean;
}

const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

export function GalleryPlate({
  item,
  onSelect,
  priority = false,
  isFirst = false,
}: GalleryPlateProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const handleClick = () => {
    if (buttonRef.current) {
      onSelect(item.index, buttonRef.current);
    }
  };

  return (
    <motion.figure
      className="m-0 flex w-full items-center justify-center"
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : isFirst
            ? { opacity: 0, scale: 0.99 }
            : { opacity: 0, y: 28 }
      }
      animate={isFirst ? { opacity: 1, scale: 1 } : undefined}
      whileInView={isFirst ? undefined : { opacity: 1, y: 0 }}
      viewport={isFirst ? undefined : { once: true, amount: 0.1 }}
      transition={{
        duration: isFirst ? 0.9 : 0.85,
        ease: EDITORIAL_EASE,
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        aria-label={`Open full-screen view: ${item.alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden bg-[#111111] p-0 text-left outline-none ring-1 ring-inset ring-white/[0.08] transition-[box-shadow,ring-color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:ring-white/[0.2] hover:shadow-[0_28px_80px_-24px_rgba(255,255,255,0.1)] focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
      >
        <div className="relative w-full overflow-hidden">
          <motion.div className="relative h-auto w-full">
            <div className="relative w-full">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.src.width}
                height={item.src.height}
                priority={priority}
                fetchPriority={priority ? "high" : undefined}
                placeholder="blur"
                sizes={item.sizes}
                quality={90}
                className="block h-auto w-full select-none"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </button>
    </motion.figure>
  );
}
