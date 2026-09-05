import styles from './ProjectBlockCaption.module.css';

interface ProjectBlockCaptionProps {
  title: string;
  tagline: string;
  discipline?: string;
  variant?: 'default' | 'hero';
}

export function ProjectBlockCaption({
  title,
  tagline,
  discipline,
  variant = 'default',
}: ProjectBlockCaptionProps) {
  if (variant === 'hero') {
    return (
      <span className={styles.captionHero}>
        <span className={styles.titleHero}>{title}</span>
        <span className={styles.taglineHero}>{tagline}</span>
        {discipline ? <span className={styles.disciplineHero}>{discipline}</span> : null}
      </span>
    );
  }

  return (
    <span className={styles.caption}>
      <span className={styles.title}>{title}</span>
      {discipline ? <span className={styles.discipline}>{discipline}</span> : null}
      <span className={styles.tagline}>{tagline}</span>
    </span>
  );
}
