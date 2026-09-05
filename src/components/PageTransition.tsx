import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { applePageTransition } from '../styles/motion';

export function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div {...applePageTransition} style={{ width: '100%' }}>
      {children}
    </motion.div>
  );
}

export function AnimatedRoutes({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <LayoutGroup id="portfolio-pages">
      <AnimatePresence mode="popLayout" initial={false}>
        {children}
      </AnimatePresence>
    </LayoutGroup>
  );
}
