import { motion } from 'framer-motion';
import { SITE } from '../data/projects';
import { fadeUp, springPop } from '../styles/motion';
import styles from './Contact.module.css';

const setInteractiveHover = (active: boolean) => {
  document.body.classList.toggle('is-interactive-hover', active);
};

const linkMotion = {
  whileHover: { y: -4, scale: 1.06 },
  whileTap: { scale: 0.96 },
  transition: springPop,
  onHoverStart: () => setInteractiveHover(true),
  onHoverEnd: () => setInteractiveHover(false),
} as const;

export function Contact({ compact = false, expressive = false }: { compact?: boolean; expressive?: boolean }) {
  if (compact) {
    return (
      <section
        id="contact"
        className={`${styles.section} ${styles.sectionCompact} ${expressive ? styles.sectionExpressive : ''}`}
        aria-label="Contact"
      >
        <motion.div
          className={`${styles.inner} ${styles.innerCompact} ${expressive ? styles.innerExpressive : ''}`}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          custom={0}
        >
          <div className={`${styles.panel} ${styles.panelFinale} ${expressive ? styles.panelExpressive : 'pearlGlass'}`}>
            <h2 className={styles.titleFinale}>Let&apos;s talk.</h2>
            <p className={styles.leadFinale}>
              I&apos;m always happy to connect about product design, emerging technology, and interesting
              problems worth solving.
            </p>
            <motion.div
              className={styles.linksFinale}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a href={`mailto:${SITE.email}`} className={styles.linkFinale} {...linkMotion}>
                Email
              </motion.a>
              <span className={styles.linkSep} aria-hidden="true">
                ·
              </span>
              <motion.a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkFinale}
                {...linkMotion}
              >
                LinkedIn
              </motion.a>
              <span className={styles.linkSep} aria-hidden="true">
                ·
              </span>
              <motion.a href={SITE.resume} className={styles.linkFinale} {...linkMotion}>
                Resume
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <motion.div
        className={styles.inner}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
        custom={0}
      >
        <motion.div
          className={`${styles.panel} pearlGlass`}
          whileHover={{ y: -3 }}
          transition={springPop}
        >
          <p className={styles.label}>Contact</p>
          <h2 className={styles.titleFinale}>Let&apos;s talk.</h2>
          <p className={styles.leadFinale}>
            I&apos;m always happy to connect about product design, emerging technology, and interesting
            problems worth solving.
          </p>

          <motion.div
            className={styles.linksFinale}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a href={`mailto:${SITE.email}`} className={styles.linkFinale} {...linkMotion}>
              Email
            </motion.a>
            <span className={styles.linkSep} aria-hidden="true">
              ·
            </span>
            <motion.a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkFinale}
              {...linkMotion}
            >
              LinkedIn
            </motion.a>
            <span className={styles.linkSep} aria-hidden="true">
              ·
            </span>
            <motion.a href={SITE.resume} className={styles.linkFinale} {...linkMotion}>
              Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
