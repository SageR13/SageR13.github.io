import { motion } from 'framer-motion';
import { SITE } from '../data/projects';
import { fadeUp, lineReveal, listItem, springPop, staggerChildren } from '../styles/motion';
import styles from './About.module.css';

const SKILLS = [
  'Product Design',
  'UX Research',
  'Physical Computing',
  'Prototyping',
  'Design Systems',
  'XR / AR',
];

const TOOLS = ['Figma', 'Arduino', 'Framer', 'Blender', 'Cursor', 'Adobe CC'];

export function About({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section id="about" className={`${styles.section} ${styles.sectionCompact}`} aria-label="About">
        <div className={`${styles.gridCompact} pearlGlass`}>
          <motion.div
            className={styles.copyCompact}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
            custom={0}
          >
            <p className={styles.label}>About</p>
            <h2 className={styles.titleCompact}>
              Product designer with depth in hardware, XR, and experimental interaction.
            </h2>
            <p className={styles.body}>
              {SITE.intro} Based in {SITE.location}. {SITE.availability}.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className={styles.section} aria-label="About">
      <div className={`${styles.grid} pearlGlass`}>
        <motion.div
          className={styles.copy}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          custom={0}
        >
          <p className={styles.label}>About</p>
          <h2 className={styles.title}>
            <span className={styles.lineWrap}>
              <motion.span className={styles.line} variants={lineReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.08}>
                Hi, I&apos;m Sage —
              </motion.span>
            </span>
            <span className={styles.lineWrap}>
              <motion.span className={styles.lineMuted} variants={lineReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.16}>
                a <span className={styles.textAccent}>product designer</span> and design engineer
                creating digital + physical experiences.
              </motion.span>
            </span>
          </h2>
          <motion.p
            className={styles.body}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.28}
          >
            {SITE.intro} Based in {SITE.location}, I partner with teams on 0→1 products, design systems,
            and research-backed prototypes — from Figma to functional code.
          </motion.p>

          <motion.p
            className={styles.availability}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.34}
          >
            {SITE.availability}
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.facts}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 1.05, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={`${styles.block} pearlGlassSoft`}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={springPop}
          >
            <p className={styles.blockLabel}>Skills</p>
            <motion.ul
              className={styles.list}
              variants={staggerChildren(0.06, 0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-4%' }}
            >
              {SKILLS.map((item) => (
                <motion.li
                  key={item}
                  variants={listItem}
                  whileHover={{ x: 6, color: 'var(--ink)' }}
                  transition={springPop}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className={`${styles.block} pearlGlassSoft`}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={springPop}
          >
            <p className={styles.blockLabel}>Tools</p>
            <motion.ul
              className={styles.list}
              variants={staggerChildren(0.06, 0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-4%' }}
            >
              {TOOLS.map((item) => (
                <motion.li
                  key={item}
                  variants={listItem}
                  whileHover={{ x: 6, color: 'var(--ink)' }}
                  transition={springPop}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className={`${styles.block} pearlGlassSoft`}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={springPop}
          >
            <p className={styles.blockLabel}>Education</p>
            <p className={styles.education}>
              BFA Product Design — human-centered systems, physical computing, and interaction design.
              Coursework in UX research, prototyping, and design engineering.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
