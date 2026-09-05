import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE } from '../data/projects';
import { listItem, springPop, staggerChildren } from '../styles/motion';
import styles from './SidebarMenu.module.css';

const LINKS = [
  { label: 'Work', number: '01', href: '/#work' },
  { label: 'About', number: '02', href: '/#about' },
  { label: 'Résumé', number: '03', href: SITE.resume, external: true },
  { label: 'Contact', number: '04', href: '/#contact' },
] as const;

interface SidebarMenuProps {
  open: boolean;
  onClose: () => void;
}

export function SidebarMenu({ open, onClose }: SidebarMenuProps) {
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const resolveHref = (href: string) => (href.startsWith('/#') ? href : onHome ? href : `/${href}`);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.root}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" className={styles.backdrop} aria-label="Close menu" onClick={onClose} />

          <motion.aside
            id="site-sidebar"
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.header}>
              <p className={styles.kicker}>Navigation</p>
              <button type="button" className={styles.close} aria-label="Close menu" onClick={onClose}>
                ×
              </button>
            </div>

            <motion.nav
              className={styles.nav}
              aria-label="Menu"
              variants={staggerChildren(0.08, 0.12)}
              initial="hidden"
              animate="visible"
            >
              {LINKS.map((item) => {
                if ('external' in item && item.external) {
                  return (
                    <motion.div key={item.label} variants={listItem} whileHover={{ x: 8 }} transition={springPop}>
                      <a
                        href={item.href}
                        className={styles.item}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                      >
                        <span className={styles.itemText}>
                          {item.label}
                          <sup className={styles.number}>{item.number}</sup>
                        </span>
                      </a>
                    </motion.div>
                  );
                }

                const isActive = location.hash === item.href.replace(/^\//, '');

                return (
                  <motion.div key={item.label} variants={listItem} whileHover={{ x: 8 }} transition={springPop}>
                    <Link
                      to={resolveHref(item.href)}
                      className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                      onClick={onClose}
                    >
                      <span className={styles.itemText}>
                        {item.label}
                        <sup className={styles.number}>{item.number}</sup>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <div className={styles.footer}>
              <p className={styles.legal}>©2026 {SITE.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
