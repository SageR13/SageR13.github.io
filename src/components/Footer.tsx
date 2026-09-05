import { Link } from 'react-router-dom';
import { SITE } from '../data/projects';
import { ScrollReveal } from './ScrollReveal';
import styles from './Footer.module.css';

interface FooterProps {
  variant?: 'default' | 'finale';
}

export function Footer({ variant = 'default' }: FooterProps) {
  const year = new Date().getFullYear();

  if (variant === 'finale') {
    return (
      <ScrollReveal as="footer" className={`${styles.footer} ${styles.footerFinale}`} variant="spring">
        <div className={styles.finaleInner}>
          <p className={styles.finaleName}>{SITE.name}</p>
          <p className={styles.finaleTitle}>{SITE.title}</p>
          <nav className={styles.finaleLinks} aria-label="Footer">
            <a href={`mailto:${SITE.email}`}>Email</a>
            <span aria-hidden="true">·</span>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a href={SITE.resume}>Resume</a>
          </nav>
          <p className={styles.finaleCopyright}>© {year}</p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal as="footer" className={styles.footer} variant="spring">
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <Link to="/" className={styles.brand}>
            {SITE.name}
          </Link>
          <p className={styles.tagline}>{SITE.title}</p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <Link to="/#work" className={styles.link}>
            Work
          </Link>
          <Link to="/#about" className={styles.link}>
            About
          </Link>
          <Link to="/#contact" className={styles.link}>
            Contact
          </Link>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
            LinkedIn
          </a>
        </nav>

        <div className={styles.meta}>
          <a href={`mailto:${SITE.email}`} className={styles.email}>
            {SITE.email}
          </a>
          <p className={styles.copyright}>© {year} {SITE.name}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}
