import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHomeViewFilter } from '../context/HomeViewFilterContext';
import { useProfileAvatar } from '../context/ProfileAvatarContext';
import { ProfilePhoto } from './ProfilePhoto';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './ProfileScrollAvatar.module.css';

const SCROLL_DISTANCE = 340;
const HANDOFF_PROGRESS = 0.98;

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function readRect(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function easeOut(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function captureOrigin(source: HTMLDivElement | null, originRef: React.MutableRefObject<Rect | null>) {
  if (!source) return;

  if (window.scrollY < 12 || !originRef.current) {
    originRef.current = readRect(source);
  }
}

export function ProfileScrollAvatar() {
  const location = useLocation();
  const onHome = location.pathname === '/';
  const reducedMotion = useReducedMotion();
  const avatar = useProfileAvatar();
  const homeView = useHomeViewFilter();
  const filter = homeView?.filter ?? 'all';
  const originRef = useRef<Rect | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { scrollY } = useScroll();

  const applyAtScroll = useCallback(
    (latest: number) => {
      if (!avatar) return;

      const { sourceRef, targetRef, setProgress } = avatar;
      captureOrigin(sourceRef.current, originRef);

      const progress = Math.min(1, Math.max(0, latest / SCROLL_DISTANCE));
      const eased = easeOut(progress);
      setProgress(eased);

      const flyer = document.getElementById('profile-scroll-avatar');
      const origin = originRef.current;
      const target = targetRef.current ? readRect(targetRef.current) : null;

      if (!flyer || !origin || !target) {
        flyer?.style.setProperty('opacity', '0');
        return;
      }

      if (progress >= HANDOFF_PROGRESS) {
        flyer.style.opacity = '0';
        setIsReady(true);
        return;
      }

      const top = lerp(origin.top, target.top, eased);
      const left = lerp(origin.left, target.left, eased);
      const width = lerp(origin.width, target.width, eased);
      const height = lerp(origin.height, target.height, eased);

      flyer.style.opacity = '1';
      flyer.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      flyer.style.width = `${width}px`;
      flyer.style.height = `${height}px`;
      setIsReady(true);
    },
    [avatar],
  );

  useLayoutEffect(() => {
    if (!onHome || reducedMotion || !avatar || filter === 'work') return;

    originRef.current = null;

    const { sourceRef, targetRef } = avatar;

    const sync = () => {
      captureOrigin(sourceRef.current, originRef);
      applyAtScroll(scrollY.get());
    };

    sync();
    const frame = requestAnimationFrame(() => requestAnimationFrame(sync));

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            captureOrigin(sourceRef.current, originRef);
            applyAtScroll(scrollY.get());
          })
        : null;

    const observeTargets = () => {
      if (sourceRef.current) resizeObserver?.observe(sourceRef.current);
      if (targetRef.current) resizeObserver?.observe(targetRef.current);
    };

    observeTargets();
    const observeFrame = requestAnimationFrame(observeTargets);

    window.addEventListener('resize', sync);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(observeFrame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', sync);
      avatar.setProgress(0);
      setIsReady(false);
    };
  }, [applyAtScroll, avatar, filter, onHome, reducedMotion, scrollY]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!onHome || reducedMotion || !avatar || filter === 'work') return;
    applyAtScroll(latest);
  });

  if (!onHome || !avatar || filter === 'work') return null;

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      id="profile-scroll-avatar"
      className={`${styles.flyer} ${isReady ? styles.flyerReady : ''}`}
      aria-hidden="true"
    >
      <ProfilePhoto wrapClassName={styles.imageWrap} />
    </div>
  );
}
