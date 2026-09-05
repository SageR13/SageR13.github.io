import { motion, useAnimation, useInView } from 'framer-motion';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  buildScrollRevealVariants,
  getScrollVariant,
  scrollInViewOptions,
  scrollInViewOptionsStable,
  scrollRevealChild,
  staggerChildren,
  type ScrollRevealVariant,
} from '../styles/motion';

type ScrollRevealTag =
  | 'div'
  | 'section'
  | 'article'
  | 'header'
  | 'aside'
  | 'figure'
  | 'button'
  | 'a'
  | 'footer'
  | 'nav'
  | 'blockquote'
  | 'dl'
  | 'h2';

type ScrollRevealProps = {
  as?: ScrollRevealTag;
  variant?: ScrollRevealVariant;
  index?: number;
  delay?: number;
  resetKey?: string | number;
  repeat?: boolean;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

function useRevealWhenVisible(
  ref: React.RefObject<HTMLElement | null>,
  controls: ReturnType<typeof useAnimation>,
  {
    inView,
    repeat,
    reducedMotion,
    resetKey,
  }: {
    inView: boolean;
    repeat: boolean;
    reducedMotion: boolean;
    resetKey?: string | number;
  },
) {
  useEffect(() => {
    if (reducedMotion) return;

    if (inView) {
      void controls.start('visible');
      return;
    }

    if (repeat) {
      controls.set('hidden');
    }
  }, [inView, controls, reducedMotion, repeat]);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;

    const revealIfVisible = () => {
      if (cancelled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      if (visibleHeight > rect.height * 0.12) {
        void controls.start('visible');
      }
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(revealIfVisible);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [resetKey, controls, reducedMotion, inView]);
}

export function ScrollReveal({
  as = 'div',
  variant,
  index = 0,
  delay = 0,
  resetKey,
  repeat = true,
  className,
  children,
  style,
  ...rest
}: ScrollRevealProps & Record<string, unknown>) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const viewport = repeat ? scrollInViewOptions : scrollInViewOptionsStable;
  const inView = useInView(ref, { ...viewport, once: !repeat });
  const chosenVariant = variant ?? getScrollVariant(index);
  const variants = buildScrollRevealVariants(chosenVariant, delay);

  useRevealWhenVisible(ref, controls, { inView, repeat, reducedMotion, resetKey });

  if (reducedMotion) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      animate={controls}
      {...rest}
    >
      {children}
    </Component>
  );
}

type ScrollRevealGroupProps = {
  className?: string;
  stagger?: number;
  delay?: number;
  resetKey?: string | number;
  repeat?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
};

export function ScrollRevealGroup({
  className,
  stagger = 0.07,
  delay = 0,
  resetKey,
  repeat = true,
  children,
  style,
}: ScrollRevealGroupProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const viewport = repeat ? scrollInViewOptions : scrollInViewOptionsStable;
  const inView = useInView(ref, { ...viewport, once: !repeat });

  useRevealWhenVisible(ref, controls, { inView, repeat, reducedMotion, resetKey });

  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={staggerChildren(stagger, delay)}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

type ScrollRevealItemProps = {
  as?: ScrollRevealTag;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

export function ScrollRevealItem({
  as = 'div',
  className,
  children,
  style,
  ...rest
}: ScrollRevealItemProps & Record<string, unknown>) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  const Component = motion[as] as typeof motion.div;

  return (
    <Component className={className} style={style} variants={scrollRevealChild} {...rest}>
      {children}
    </Component>
  );
}
