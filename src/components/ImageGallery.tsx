"use client";

import { useCallback, useRef, useState } from "react";
import { GALLERY_ITEMS } from "@/data/gallery";
import { GalleryPlate } from "@/components/GalleryPlate";
import { Lightbox } from "@/components/Lightbox";

export function ImageGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const handleSelect = useCallback(
    (index: number, triggerEl: HTMLButtonElement) => {
      lastTriggerRef.current = triggerEl;
      setDirection(0);
      setActiveIndex(index);
    },
    []
  );

  const handleNavigate = useCallback((nextIndex: number, dir: number) => {
    setDirection(dir);
    setActiveIndex(nextIndex);
  }, []);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus({ preventScroll: true });
    });
  }, []);

  return (
    <>
      <main className="flex min-h-[100svh] w-full flex-col items-center bg-black px-3 py-3 sm:px-5 sm:py-5 md:px-6 md:py-6">
        <h1 className="sr-only">Askamaya Menu</h1>

        <div className="mx-auto flex w-full flex-col items-center gap-3 sm:gap-5 md:gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <section
              key={item.id}
              className="mx-auto flex w-full items-center justify-center"
            >
              <GalleryPlate
                item={item}
                onSelect={handleSelect}
                priority={idx === 0}
                isFirst={idx === 0}
              />
            </section>
          ))}
        </div>
      </main>

      <Lightbox
        items={GALLERY_ITEMS}
        activeIndex={activeIndex}
        direction={direction}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </>
  );
}
