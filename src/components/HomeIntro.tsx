import { SITE } from '../data/projects';
import { HeroProjectWell } from './HeroProjectWell';
import styles from './HomeIntro.module.css';

export function HomeIntro() {
  return (
    <>
      <section className={styles.heroBlock} id="about" aria-label="Introduction">
        <header className={styles.intro}>
          <h1 className={styles.name}>{SITE.name}</h1>
          <p className={styles.headline}>{SITE.headline}</p>
          <p className={styles.positioning}>{SITE.positioning}</p>
          <p className={styles.selectedCue}>
            Selected work
            <span aria-hidden="true"> ↓</span>
          </p>
        </header>
      </section>

      <HeroProjectWell />
    </>
  );
}
