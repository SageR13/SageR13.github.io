import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { useHomeViewFilter } from '../context/HomeViewFilterContext';
import { useProfileAvatar } from '../context/ProfileAvatarContext';
import { ProfilePhoto } from './ProfilePhoto';
import { SITE } from '../data/projects';
import { useSiteOverlay } from '../context/SiteOverlayContext';
import { useLenisScroll } from './SmoothScroll';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { springPop } from '../styles/motion';
import styles from './Navigation.module.css';

const setInteractiveHover = (active: boolean) => {
  document.body.classList.toggle('is-interactive-hover', active);
};

const NAV_LINKS = [
  { label: 'All', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#work' },
  { label: 'Résumé', href: SITE.resume, external: true },
] as const;

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(!onHome);
  const profileAvatar = useProfileAvatar();
  const homeView = useHomeViewFilter();
  const activeFilter = onHome ? (homeView?.filter ?? 'all') : 'all';
  const reducedMotion = useReducedMotion();
  const showNavAvatar = onHome && profileAvatar && (reducedMotion ? scrolled : profileAvatar.progress >= 0.98);
  const brandTextPadLeft =
    onHome && profileAvatar && (showNavAvatar || profileAvatar.progress > 0.02) ? 44 : 0;
  const { openMenu } = useSiteOverlay();
  const { scrollToTop } = useLenisScroll() ?? {};
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!onHome) return;
    setScrolled(latest > 48);
  });

  const navClass = [
    styles.nav,
    onHome ? styles.navHome : styles.navSolid,
    onHome && scrolled ? styles.navScrolled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const hoverProps = {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: springPop,
    onHoverStart: () => setInteractiveHover(true),
    onHoverEnd: () => setInteractiveHover(false),
  } as const;

  const handleWorkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (location.pathname !== '/') {
      navigate('/#work');
      return;
    }

    homeView?.setFilter('work');
    requestAnimationFrame(() => scrollToTop?.());
  };

  const handleAboutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (location.pathname !== '/') {
      navigate('/#about');
      return;
    }

    homeView?.setFilter('about');
    requestAnimationFrame(() => scrollToTop?.());
  };

  const handleAllClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
      return;
    }

    homeView?.setFilter('all');
    requestAnimationFrame(() => scrollToTop?.());
  };

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
      return;
    }

    homeView?.setFilter('all');
    requestAnimationFrame(() => scrollToTop?.());
  };

  const isNavFilterActive = (label: (typeof NAV_LINKS)[number]['label']) => {
    if (!onHome) return false;
    if (label === 'All') return activeFilter === 'all';
    if (label === 'About') return activeFilter === 'about';
    if (label === 'Work') return activeFilter === 'work';
    return false;
  };

  return (
    <motion.header
      className={navClass}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div {...hoverProps} className={styles.brandWrap}>
        <Link to="/" className={styles.brandPill} onClick={handleBrandClick}>
          {onHome && profileAvatar ? (
            <span
              ref={profileAvatar.targetRef}
              className={styles.brandAvatarTarget}
              aria-hidden={!showNavAvatar}
            >
              {showNavAvatar ? <ProfilePhoto wrapClassName={styles.brandAvatarImage} /> : null}
            </span>
          ) : null}
          <span
            className={styles.brandText}
            style={{
              paddingLeft: brandTextPadLeft,
              transition: 'padding-left 0.2s var(--ease-out)',
            }}
          >
            {SITE.name}
          </span>
        </Link>
      </motion.div>

      <nav className={styles.center} aria-label="Primary">
        {NAV_LINKS.map((item) => (
          <motion.div key={item.label} {...hoverProps}>
            {'external' in item && item.external ? (
              <a href={item.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ) : item.label === 'Work' ? (
              <Link
                to={item.href}
                className={`${styles.link} ${isNavFilterActive(item.label) ? styles.linkActive : ''}`}
                onClick={handleWorkClick}
                aria-current={isNavFilterActive(item.label) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ) : item.label === 'About' ? (
              <Link
                to={item.href}
                className={`${styles.link} ${isNavFilterActive(item.label) ? styles.linkActive : ''}`}
                onClick={handleAboutClick}
                aria-current={isNavFilterActive(item.label) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ) : item.label === 'All' ? (
              <Link
                to={item.href}
                className={`${styles.link} ${isNavFilterActive(item.label) ? styles.linkActive : ''}`}
                onClick={handleAllClick}
                aria-current={isNavFilterActive(item.label) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <Link to={item.href} className={styles.link}>
                {item.label}
              </Link>
            )}
          </motion.div>
        ))}
      </nav>

      <div className={styles.right}>
        <motion.a
          href={`mailto:${SITE.email}`}
          className={styles.cta}
          {...hoverProps}
        >
          Let&apos;s talk
        </motion.a>
        <motion.button
          type="button"
          className={styles.menuButton}
          aria-controls="site-sidebar"
          aria-label="Open menu"
          onClick={openMenu}
          {...hoverProps}
        >
          Menu
        </motion.button>
      </div>
    </motion.header>
  );
}
