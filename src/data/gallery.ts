import type { StaticImageData } from "next/image";

import arch01Hero from "@/assets/gallery/arch-01-hero.jpg";
import arch02Monolith from "@/assets/gallery/arch-02-monolith.jpg";
import arch05Horizon from "@/assets/gallery/arch-05-horizon.jpg";
import arch09Sanctuary from "@/assets/gallery/arch-09-sanctuary.jpg";

export interface GalleryItem {
  id: string;
  index: number;
  src: StaticImageData;
  alt: string;
  sizes: string;
}

const FULL_WIDTH_SIZES =
  "(max-width: 640px) calc(100vw - 24px), calc(100vw - 48px)";

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "pavilion-reflection",
    index: 0,
    src: arch01Hero,
    alt: "Cantilevered raw concrete pavilion resting above a still reflecting pool in warm late afternoon sunlight",
    sizes: FULL_WIDTH_SIZES,
  },
  {
    id: "concrete-colonnade",
    index: 1,
    src: arch02Monolith,
    alt: "Board-formed concrete colonnade and travertine courtyard cut by a diagonal shaft of golden afternoon sunlight",
    sizes: FULL_WIDTH_SIZES,
  },
  {
    id: "coastal-horizon",
    index: 2,
    src: arch05Horizon,
    alt: "Minimalist cliffside concrete pavilion with an infinity water basin meeting a calm misty dawn sea horizon",
    sizes: FULL_WIDTH_SIZES,
  },
  {
    id: "oculus-sanctuary",
    index: 3,
    src: arch09Sanctuary,
    alt: "Symmetrical board-formed concrete sanctuary with a circular roof oculus pouring golden dusk light onto a central water basin",
    sizes: FULL_WIDTH_SIZES,
  },
];
