import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WORK_GALLERY_CENTER_EVENT, useLenisScroll } from './SmoothScroll';
import { PROJECTS, getGalleryDiscipline, getProjectCtaLabel } from '../data/projects';
import { ProjectBlockCaption } from './ProjectBlockCaption';
import { ProjectBlockMedia } from './ProjectBlockMedia';
import styles from './HeroProjectWell.module.css';

interface HeroProjectCardProps {
  slug: string;
  title: string;
  tagline: string;
  discipline: string;
  image: string;
  video?: string;
  ctaLabel: string;
  isActive: boolean;
}

const HeroProjectCard = memo(function HeroProjectCard({
  slug,
  title,
  tagline,
  discipline,
  image,
  video,
  ctaLabel,
  isActive,
}: HeroProjectCardProps) {
  return (
    <article className={`${styles.card} ${isActive ? styles.cardActive : ''}`}>
      <Link
        to={`/project/${slug}`}
        className={styles.link}
        aria-label={`View ${title} case study`}
      >
        <span className={styles.mediaWrap}>
          <ProjectBlockMedia image={image} video={video} className={styles.image} />
          <span className={styles.ctaOverlay} aria-hidden="true">
            {ctaLabel}
          </span>
        </span>
        <ProjectBlockCaption
          variant="hero"
          title={title}
          tagline={tagline}
          discipline={discipline}
        />
      </Link>
    </article>
  );
});

function buildScrollPages(row: HTMLDivElement, inner: HTMLDivElement) {
  const maxScroll = Math.max(0, row.scrollWidth - row.clientWidth);
  if (maxScroll <= 0) return [0];

  const cards = Array.from(inner.children) as HTMLElement[];
  const step =
    cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : maxScroll / 3;

  const pages = [
    0,
    Math.min(maxScroll, Math.round(step)),
    Math.min(maxScroll, Math.round(step * 2)),
    maxScroll,
  ];

  return [...new Set(pages)].sort((a, b) => a - b);
}

function getPageFromScroll(scrollLeft: number, pages: number[]) {
  if (pages.length === 0) return 0;

  let nearest = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;

  pages.forEach((page, index) => {
    const distance = Math.abs(scrollLeft - page);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = index;
    }
  });

  return nearest;
}

function getFocusedCardIndex(row: HTMLDivElement, inner: HTMLDivElement) {
  const cards = Array.from(inner.children) as HTMLElement[];
  if (cards.length === 0) return 0;

  const rowCenter = row.scrollLeft + row.clientWidth / 2;
  let nearest = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(rowCenter - cardCenter);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = index;
    }
  });

  return nearest;
}

export function HeroProjectWell() {
  const location = useLocation();
  const { scrollToWork } = useLenisScroll() ?? {};
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const navTargetRef = useRef<number | null>(null);
  const isNavigatingRef = useRef(false);
  const navClearTimerRef = useRef<number | null>(null);
  const scrollPagesRef = useRef<number[]>([0]);
  const [scrollPages, setScrollPages] = useState<number[]>([0]);
  const [activePage, setActivePage] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const rebuildScrollPages = useCallback(() => {
    const row = rowRef.current;
    const inner = innerRef.current;
    if (!row || !inner) return [0];

    const pages = buildScrollPages(row, inner);
    scrollPagesRef.current = pages;
    setScrollPages(pages);
    return pages;
  }, []);

  const scrollToPage = useCallback((pageIndex: number) => {
    const row = rowRef.current;
    const pages = scrollPagesRef.current;
    if (!row || pages.length === 0) return;

    const page = Math.min(Math.max(0, pageIndex), pages.length - 1);
    const target = pages[page];

    isNavigatingRef.current = true;
    navTargetRef.current = page;
    setActivePage(page);

    if (navClearTimerRef.current !== null) {
      window.clearTimeout(navClearTimerRef.current);
    }
    navClearTimerRef.current = window.setTimeout(() => {
      navTargetRef.current = null;
      isNavigatingRef.current = false;
      navClearTimerRef.current = null;
    }, 700);

    row.scrollTo({ left: target, behavior: 'smooth' });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (navTargetRef.current !== page) return;
        if (Math.abs(row.scrollLeft - target) <= 2) return;
        row.scrollLeft = target;
      });
    });
  }, []);

  const projects = useMemo(
    () =>
      PROJECTS.map((project) => ({
        ...project,
        key: project.slug,
        image: project.showcaseImage ?? project.image,
        video: project.showcaseVideo,
      })),
    [],
  );

  useEffect(() => {
    const onCenterGallery = () => {
      scrollToPage(0);
    };

    window.addEventListener(WORK_GALLERY_CENTER_EVENT, onCenterGallery);
    return () => window.removeEventListener(WORK_GALLERY_CENTER_EVENT, onCenterGallery);
  }, [scrollToPage]);

  useEffect(() => {
    if (location.pathname !== '/' || location.hash !== '#work') return;

    const frame = requestAnimationFrame(() => {
      scrollToWork?.();
    });

    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, scrollToWork]);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const inner = innerRef.current;
    if (!row || !inner) return;

    let frame = 0;
    let lastPage = -1;
    let lastFocused = -1;

    const setPage = (page: number) => {
      if (page !== lastPage) {
        lastPage = page;
        setActivePage(page);
      }
    };

    const setFocused = (index: number) => {
      if (index !== lastFocused) {
        lastFocused = index;
        setFocusedIndex(index);
      }
    };

    const updateScrollEdges = () => {
      const maxScroll = Math.max(0, row.scrollWidth - row.clientWidth);
      const edgeThreshold = 8;
      setCanScrollPrev(row.scrollLeft > edgeThreshold);
      setCanScrollNext(maxScroll > edgeThreshold && row.scrollLeft < maxScroll - edgeThreshold);
    };

    const clearNavLock = () => {
      if (navClearTimerRef.current !== null) {
        window.clearTimeout(navClearTimerRef.current);
        navClearTimerRef.current = null;
      }
      navTargetRef.current = null;
      isNavigatingRef.current = false;
    };

    const updateProgress = () => {
      frame = 0;
      const pages = scrollPagesRef.current;
      if (pages.length === 0) return;

      updateScrollEdges();
      setFocused(getFocusedCardIndex(row, inner));

      if (navTargetRef.current !== null && isNavigatingRef.current) {
        const targetLeft = pages[navTargetRef.current] ?? 0;
        if (Math.abs(row.scrollLeft - targetLeft) > 24) {
          clearNavLock();
        } else {
          setPage(navTargetRef.current);
          return;
        }
      }

      setPage(getPageFromScroll(row.scrollLeft, pages));
    };

    const resetToStart = () => {
      if (isNavigatingRef.current || navTargetRef.current !== null) return;
      if (row.scrollLeft > 16) {
        updateProgress();
        return;
      }

      const pages = rebuildScrollPages();
      row.scrollLeft = pages[0] ?? 0;
      setPage(0);
      setFocused(0);
      updateScrollEdges();
    };

    const onScroll = () => {
      const pages = scrollPagesRef.current;

      if (navTargetRef.current !== null && isNavigatingRef.current) {
        const targetLeft = pages[navTargetRef.current] ?? 0;
        if (Math.abs(row.scrollLeft - targetLeft) > 24) {
          clearNavLock();
        }
      }

      if (frame) return;
      frame = requestAnimationFrame(updateProgress);
    };

    const onScrollEnd = () => {
      const pages = scrollPagesRef.current;
      updateScrollEdges();

      if (navTargetRef.current !== null) {
        const targetPage = navTargetRef.current;
        const targetLeft = pages[targetPage] ?? 0;
        if (Math.abs(row.scrollLeft - targetLeft) > 2) {
          row.scrollLeft = targetLeft;
        }
        clearNavLock();
      }

      updateProgress();
    };

    rebuildScrollPages();
    resetToStart();

    const onMediaLoad = () => resetToStart();
    row.querySelectorAll('img, video').forEach((media) => {
      if (media instanceof HTMLImageElement && media.complete) return;
      if (media instanceof HTMLVideoElement && media.readyState >= 1) return;
      media.addEventListener('load', onMediaLoad);
      media.addEventListener('loadedmetadata', onMediaLoad);
    });

    const onResize = () => {
      rebuildScrollPages();
      resetToStart();
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(row);
    window.addEventListener('resize', onResize);
    row.addEventListener('scroll', onScroll, { passive: true });
    row.addEventListener('scrollend', onScrollEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      row.removeEventListener('scroll', onScroll);
      row.removeEventListener('scrollend', onScrollEnd);
      if (navClearTimerRef.current !== null) {
        window.clearTimeout(navClearTimerRef.current);
      }
      if (frame) cancelAnimationFrame(frame);
      row.querySelectorAll('img, video').forEach((media) => {
        media.removeEventListener('load', onMediaLoad);
        media.removeEventListener('loadedmetadata', onMediaLoad);
      });
    };
  }, [projects.length, rebuildScrollPages]);

  const goPrev = () => scrollToPage(activePage - 1);
  const goNext = () => scrollToPage(activePage + 1);

  return (
    <div className={styles.wellBleed} aria-label="Selected work">
      <div className={styles.well}>
        <div className={styles.affordanceBar}>
          <p className={styles.affordanceText}>Scroll sideways →</p>
          <div className={styles.progress} role="tablist" aria-label="Gallery scroll progress">
            {scrollPages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.progressDot} ${index === activePage ? styles.progressDotActive : ''}`}
                aria-label={`Go to gallery page ${index + 1} of ${scrollPages.length}`}
                aria-selected={index === activePage}
                onClick={() => scrollToPage(index)}
              />
            ))}
          </div>
        </div>

        <div className={styles.trackShell} id="work" ref={trackRef}>
          <div className={styles.edgeFadeLeft} aria-hidden="true" />
          <div className={styles.edgeFadeRight} aria-hidden="true" />

          <div className={styles.cardRow} ref={rowRef} data-lenis-prevent-horizontal>
            <div className={styles.cardRowInner} ref={innerRef}>
              {projects.map((project, index) => (
                <HeroProjectCard
                  key={project.key}
                  slug={project.slug}
                  title={project.title}
                  tagline={project.tagline}
                  discipline={getGalleryDiscipline(project.discipline)}
                  image={project.image}
                  video={project.video}
                  ctaLabel={getProjectCtaLabel(project.slug)}
                  isActive={index === focusedIndex}
                />
              ))}
            </div>
          </div>

          <div className={styles.navLayer}>
            {canScrollPrev ? (
              <button
                type="button"
                className={`${styles.navButton} ${styles.navButtonPrev}`}
                aria-label="Previous gallery page"
                onClick={goPrev}
              >
                ←
              </button>
            ) : null}
            {canScrollNext ? (
              <button
                type="button"
                className={`${styles.navButton} ${styles.navButtonNext}`}
                aria-label="Next gallery page"
                onClick={goNext}
              >
                →
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
