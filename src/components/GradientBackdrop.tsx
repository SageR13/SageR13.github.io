import styles from './GradientBackdrop.module.css';

export function GradientBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.orbBlue} />
      <div className={styles.orbViolet} />
      <div className={styles.orbCyan} />
      <div className={styles.orbMagenta} />
    </div>
  );
}
