import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 38, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 420, damping: 38, mass: 0.4 });

  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion, x, y]);

  if (reducedMotion) return null;

  return (
    <motion.div
      className="custom-cursor"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    />
  );
}
