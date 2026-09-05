import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CaseStudyContent } from '../components/caseStudy/CaseStudyContent';
import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';
import { useLenisScroll } from '../components/SmoothScroll';
import { getCaseStudy, getCaseStudyExtras } from '../data/caseStudies';
import { getAdjacentProjects, getProject, SITE } from '../data/projects';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getProjectCoverLayoutId, projectCoverLayoutTransition } from '../styles/motion';
import styles from './ProjectPage.module.css';

const SECTIONS = [
  { key: 'overview', label: 'Overview' },
  { key: 'problem', label: 'Problem' },
  { key: 'research', label: 'Research' },
  { key: 'process', label: 'Process' },
  { key: 'iterations', label: 'Iterations' },
  { key: 'prototype', label: 'Prototype' },
  { key: 'outcome', label: 'Outcome' },
] as const;

export function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  const caseStudy = slug ? getCaseStudy(slug) : undefined;
  const caseStudyExtras = slug ? getCaseStudyExtras(slug) : undefined;

  usePageTitle(project ? `${project.title} — ${SITE.name}` : SITE.name);
  const { scrollToTop } = useLenisScroll() ?? {};
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    scrollToTop?.();
  }, [slug, scrollToTop]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { prev, next } = getAdjacentProjects(project.slug);
  const heroImage = project.showcaseImage ?? project.heroImage;

  return (
    <PageTransition>
      <Navigation />
      <main className={styles.page}>
        <section className={styles.hero}>
          <motion.div
            className={`${styles.heroCopy} pearlGlass`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.kicker}>
              {project.discipline} · {project.year}
            </p>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.lead}>{project.tagline}</p>
            <p className={styles.summary}>{project.description}</p>

            <dl className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>Timeline</dt>
                <dd>{project.timeline}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt>Focus</dt>
                <dd>{project.highlight ?? project.category}</dd>
              </div>
            </dl>

            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            {project.storeLinks ? (
              <div className={styles.storeLinks}>
                {project.storeLinks.note ? (
                  <p className={styles.storeNote}>{project.storeLinks.note}</p>
                ) : null}
                <div className={styles.storeLinkRow}>
                  {project.storeLinks.appStore ? (
                    <a
                      href={project.storeLinks.appStore}
                      className={styles.storeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      App Store
                    </a>
                  ) : null}
                  {project.storeLinks.googlePlay ? (
                    <a
                      href={project.storeLinks.googlePlay}
                      className={styles.storeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Play
                    </a>
                  ) : null}
                  {project.storeLinks.web ? (
                    <a
                      href={project.storeLinks.web}
                      className={styles.storeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.storeLinks.webLabel ?? 'Web demo'}
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}

          </motion.div>

          <motion.div
            layoutId={reducedMotion ? undefined : getProjectCoverLayoutId(project.slug)}
            className={`${styles.heroImage} ${
              project.heroImageFit === 'contain' ? styles.heroImageContain : ''
            }`}
            style={
              project.heroImageAspect ? { aspectRatio: project.heroImageAspect } : undefined
            }
            transition={projectCoverLayoutTransition}
          >
            <img src={heroImage} alt={`${project.title} showcase`} />
          </motion.div>
        </section>

        {caseStudy ? (
          <CaseStudyContent sections={caseStudy} reflection={caseStudyExtras?.reflection} />
        ) : (
          <div className={styles.body}>
            {SECTIONS.map((section, index) => (
              <ScrollReveal
                key={section.key}
                as="section"
                className={styles.section}
                index={index}
                delay={index * 0.04}
              >
                <p className={styles.label}>{section.label}</p>
                <p className={styles.copy}>{project[section.key]}</p>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal as="nav" className={styles.pagination} aria-label="Project navigation" variant="rise" index={0}>
          {prev ? (
            <Link to={`/project/${prev.slug}`} className={styles.pageLink}>
              <span className={styles.pageDirection}>Previous</span>
              <span className={styles.pageTitle}>{prev.title}</span>
              <span className={styles.pageTagline}>{prev.tagline}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/project/${next.slug}`} className={`${styles.pageLink} ${styles.pageLinkNext}`}>
              <span className={styles.pageDirection}>
                {caseStudyExtras?.nextTeaser?.direction ?? 'Next'}
              </span>
              <span className={styles.pageTitle}>
                {caseStudyExtras?.nextTeaser?.title ?? next.title}
              </span>
              <span className={styles.pageTagline}>
                {caseStudyExtras?.nextTeaser?.tagline ?? next.tagline}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </ScrollReveal>

        <ScrollReveal className={styles.backWrap} variant="blur" index={1} delay={0.08}>
          <Link to="/#work" className={styles.back}>
            ← All projects
          </Link>
          <a href={`mailto:${SITE.email}`} className={styles.back}>
            Discuss this project
          </a>
        </ScrollReveal>
      </main>
      <Footer />
    </PageTransition>
  );
}
