export const ease = [0.16, 1, 0.3, 1] as const;
export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeBounce = [0.34, 1.56, 0.64, 1] as const;

export const duration = {
  fast: 0.45,
  base: 0.62,
  slow: 0.78,
  hero: 1.1,
  ambient: 18,
} as const;

export const springPop = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 22,
  mass: 0.55,
};

export const springSoft = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 24,
  mass: 0.8,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, delay, ease },
  }),
};

export const lineReveal = {
  hidden: { y: '108%', opacity: 0.2 },
  visible: (delay = 0) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: duration.hero, delay, ease },
  }),
};

export const listItem = {
  hidden: { opacity: 0, x: -16, y: 8 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: duration.base, ease },
  },
};

export const staggerChildren = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const hoverLift = {
  y: -6,
  transition: springPop,
};

export const hoverPop = {
  scale: 1.04,
  transition: springPop,
};

export const scrollInViewOptions = {
  amount: 0.18,
  margin: '-4% 0px -8% 0px' as const,
};

/** Stable viewport for work sections — animates once, fewer edge retriggers while scrolling. */
export const scrollInViewOptionsStable = {
  amount: 0.28,
  margin: '-10% 0px -14% 0px' as const,
};

/** @deprecated Use scrollInViewOptions — kept for any legacy imports */
export const scrollViewport = {
  once: false,
  ...scrollInViewOptions,
};

export const scrollRevealChild = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.fast, ease },
  },
};

export type ScrollRevealVariant =
  | 'rise'
  | 'slideLeft'
  | 'slideRight'
  | 'mediaSlideLeft'
  | 'mediaSlideRight'
  | 'pop'
  | 'tilt'
  | 'blur'
  | 'spring';

export const scrollVariantOrder: ScrollRevealVariant[] = [
  'rise',
  'slideLeft',
  'pop',
  'slideRight',
  'tilt',
  'spring',
  'blur',
];

export function getScrollVariant(index: number): ScrollRevealVariant {
  return scrollVariantOrder[((index % scrollVariantOrder.length) + scrollVariantOrder.length) % scrollVariantOrder.length];
}

type ScrollRevealState = {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  rotateX?: number;
  filter?: string;
};

type ScrollRevealStep = ScrollRevealState & {
  transition?: Record<string, unknown>;
};

export const scrollRevealVariants: Record<
  ScrollRevealVariant,
  { hidden: ScrollRevealState; visible: (delay?: number) => ScrollRevealStep }
> = {
  rise: {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: duration.base, delay, ease },
    }),
  },
  slideLeft: {
    hidden: { opacity: 0, x: -28, y: 12 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: duration.base, delay, ease },
    }),
  },
  slideRight: {
    hidden: { opacity: 0, x: 28, y: 12 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: duration.base, delay, ease },
    }),
  },
  mediaSlideLeft: {
    hidden: { opacity: 1, x: -20, y: 12, scale: 0.99 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: duration.fast, delay, ease },
    }),
  },
  mediaSlideRight: {
    hidden: { opacity: 1, x: 20, y: 12, scale: 0.99 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: duration.fast, delay, ease },
    }),
  },
  pop: {
    hidden: { opacity: 0, scale: 0.97, y: 16 },
    visible: (delay = 0) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: duration.fast, delay, ease },
    }),
  },
  tilt: {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: duration.base, delay, ease },
    }),
  },
  blur: {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: duration.base, delay, ease },
    }),
  },
  spring: {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: duration.base, delay, ease },
    }),
  },
};

export function buildScrollRevealVariants(variant: ScrollRevealVariant, delay = 0) {
  const definition = scrollRevealVariants[variant];

  return {
    hidden: definition.hidden,
    visible: definition.visible(delay),
  };
}

export function getProjectCoverLayoutId(slug: string) {
  return `project-cover-${slug}`;
}

export const projectCoverLayoutTransition = {
  layout: {
    duration: 0.62,
    ease: [0.16, 1, 0.3, 1],
  },
};

export const applePageTransition = {
  initial: { opacity: 0, y: 18, scale: 0.986 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.992 },
  transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
};

export const projectCardTap = {
  whileTap: { scale: 0.982 },
  transition: springPop,
};
