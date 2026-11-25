# Monolith — Centered Image-Only Landing Page

A serene, pure-image minimalist architectural photography landing page built with the latest React & Next.js stack, engineered specifically for zero-config deployment on **Vercel**.

## Stack

- **Next.js 16** (App Router + Turbopack + built-in AVIF/WebP image optimization)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Lenis** inertia smooth scrolling (respects `prefers-reduced-motion`)
- **Motion** (`motion/react`) subtle GPU-composited scroll parallax, editorial reveals, and touch-swipe Lightbox transitions

## Design Highlights

- **Pure-Image Canvas**: Zero visible text on the landing page—strictly 4 curated architectural photographs centered on a pure black canvas (`#000000`). Screen-reader accessibility (`alt`, `aria-label`, semantic HTML) is preserved invisibly.
- **Uniform Full-Width Centered Layout**: All 4 photographs render at the exact same size (`aspect-[4/3]` on mobile, `aspect-[16/10]` on tablet/desktop), spanning full width with clean minimal padding and centered alignment across every viewport.
- **Full-Screen Lightbox**: Tap or click any image to open a full-screen viewer with swipe navigation on touch devices, keyboard controls (`←`, `→`, `Esc`), backdrop dismiss, and a centered miniature image-only filmstrip.
- **Vercel Image Optimization**: Static ES imports in `src/data/gallery.ts` automatically generate build-time blur placeholders (`placeholder="blur"`), prevent layout shift (`CLS = 0`), and serve responsive AVIF/WebP sizes.

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

Push this repository to GitHub/GitLab/Bitbucket and import it into [Vercel](https://vercel.com/new)—Next.js is detected automatically with zero extra configuration, or deploy directly with the CLI:

```bash
npx vercel
```

## Swapping Images

Replace or add photographs inside `src/assets/gallery/` and update the imports and centered band sequence in `src/data/gallery.ts`.
