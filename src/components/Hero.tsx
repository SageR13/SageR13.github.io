import { HomeBentoGrid } from './HomeBentoGrid';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <div className={styles.heroWrap}>
      <HomeBentoGrid />
    </div>
  );
}
