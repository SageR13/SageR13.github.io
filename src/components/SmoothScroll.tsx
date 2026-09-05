import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const WORK_GALLERY_CENTER_EVENT = 'portfolio:center-gallery';

interface LenisScrollContextValue {
  scrollToWork: () => void;
  scrollToTop: () => void;
}

const LenisScrollContext = createContext<LenisScrollContextValue | null>(null);

export function useLenisScroll() {
  return useContext(LenisScrollContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToTop = useCallback(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: reducedMotion });
      return;
    }

    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [reducedMotion]);

  const scrollToWork = useCallback(() => {
    const target = document.getElementById('work');
    if (!target) return;

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: -88, immediate: reducedMotion });
      return;
    }

    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.085,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 1.05,
      anchors: {
        offset: -72,
      },
    });

    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, [reducedMotion]);

  const value = useMemo(() => ({ scrollToWork, scrollToTop }), [scrollToWork, scrollToTop]);

  return <LenisScrollContext.Provider value={value}>{children}</LenisScrollContext.Provider>;
}
