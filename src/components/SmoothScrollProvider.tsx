"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

interface SmoothScrollContextValue {
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  stop: () => {},
  start: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const initLenis = () => {
      if (mediaQuery.matches || lenisRef.current) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.15,
        autoResize: true,
      });

      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);
    };

    const destroyLenis = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };

    initLenis();

    const handlePreferenceChange = () => {
      if (mediaQuery.matches) {
        destroyLenis();
      } else {
        initLenis();
      }
    };

    mediaQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handlePreferenceChange);
      destroyLenis();
    };
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollContext.Provider value={{ stop, start }}>
        {children}
      </SmoothScrollContext.Provider>
    </MotionConfig>
  );
}
