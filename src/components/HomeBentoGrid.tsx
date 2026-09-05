import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS, SITE, getGalleryDiscipline } from '../data/projects';
import { useHomeViewFilter } from '../context/HomeViewFilterContext';
import { useProfileAvatar } from '../context/ProfileAvatarContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ProjectBlockMedia } from './ProjectBlockMedia';
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from './ScrollReveal';
import { DownloadIcon, GmailIcon, LinkedInIcon } from './UtilityIcons';
import { ProfilePhoto } from './ProfilePhoto';
import { ToolsMarquee } from './ToolsMarquee';
import {
  projectCardTap,
} from '../styles/motion';
import styles from './HomeBentoGrid.module.css';

function getCaseStudyDescription(project: (typeof PROJECTS)[number]) {
  const snippet = project.overview.split('. ').slice(0, 2).join('. ');
  return snippet.endsWith('.') ? snippet : `${snippet}.`;
}

export function HomeBentoGrid() {
  const [emailCopied, setEmailCopied] = useState(false);
  const { filter = 'all' } = useHomeViewFilter() ?? {};
  const profileAvatar = useProfileAvatar();
  const reducedMotion = useReducedMotion();
  const showStaticAvatar = reducedMotion || !profileAvatar;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  const caseStudies = PROJECTS.filter((project) => project.ctaType === 'case-study');

  return (
    <div className={styles.page} data-filter={filter}>
      <div className={styles.grid}>
        <ScrollReveal
          as="section"
          className={`${styles.card} ${styles.aboutCard} ${styles.filterAbout}`}
          id="about"
          aria-label="Introduction"
          variant="spring"
          index={0}
          repeat={false}
          resetKey={filter}
        >
          <div className={styles.aboutLayout}>
            <div
              ref={profileAvatar?.sourceRef}
              className={`${styles.aboutAvatarSlot} ${!showStaticAvatar ? styles.aboutAvatarSlotFlying : ''}`}
            >
              {showStaticAvatar ? <ProfilePhoto wrapClassName={styles.aboutAvatarSlotStatic} /> : null}
            </div>
            <div className={styles.aboutContent}>
              <p className={styles.greeting}>
                Hey{' '}
                <span className={styles.greetingWave} aria-hidden="true">
                  👋
                </span>
              </p>
              <p className={styles.bio}>
                I&apos;m {SITE.name}, a {SITE.title.toLowerCase()} based in {SITE.location}.
              </p>
              <p className={styles.bioMuted}>{SITE.positioning}</p>
              <p className={styles.availability}>{SITE.availability}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal
          as="button"
          type="button"
          className={`${styles.card} ${styles.utilityCard} ${styles.emailCard} ${styles.filterAbout}`}
          onClick={copyEmail}
          aria-label="Copy email address"
          variant="pop"
          index={1}
          delay={0.05}
          repeat={false}
          resetKey={filter}
        >
          <span className={`${styles.utilityIcon} ${styles.utilityIconGmail}`} aria-hidden="true">
            <GmailIcon className={styles.utilityIconSvg} />
          </span>
          <span className={styles.utilityLabel}>{emailCopied ? 'Copied' : 'Email'}</span>
          <span className={styles.utilityHint}>{SITE.email}</span>
        </ScrollReveal>

        <ScrollReveal
          as="a"
          href={SITE.linkedin}
          className={`${styles.card} ${styles.utilityCard} ${styles.linkedinCard} ${styles.filterAbout}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="pop"
          index={2}
          delay={0.1}
          repeat={false}
          resetKey={filter}
        >
          <span className={`${styles.utilityIcon} ${styles.utilityIconLinkedIn}`} aria-hidden="true">
            <LinkedInIcon className={styles.utilityIconSvg} />
          </span>
          <span className={styles.utilityLabel}>LinkedIn</span>
        </ScrollReveal>

        <ScrollReveal
          as="a"
          href={SITE.resume}
          className={`${styles.card} ${styles.utilityCard} ${styles.resumeCard} ${styles.filterAbout}`}
          variant="pop"
          index={3}
          delay={0.15}
          repeat={false}
          resetKey={filter}
        >
          <span className={`${styles.utilityIcon} ${styles.utilityIconResume}`} aria-hidden="true">
            <DownloadIcon className={styles.utilityIconSvg} />
          </span>
          <span className={styles.utilityLabel}>Résumé</span>
        </ScrollReveal>

        <ScrollReveal
          as="figure"
          className={`${styles.card} ${styles.principleCard} ${styles.filterAbout}`}
          variant="tilt"
          index={4}
          repeat={false}
          resetKey={filter}
        >
          <blockquote className={styles.principle}>{SITE.principleHeadline}</blockquote>
          <ToolsMarquee />
        </ScrollReveal>

        <ScrollReveal
          as="section"
          className={`${styles.workIntro} ${styles.filterWork}`}
          id="work"
          aria-label="Selected work"
          variant="blur"
          index={5}
          repeat={false}
          resetKey={filter}
        >
          <p className={styles.workKicker}>Selected work</p>
          <p className={styles.workLead}>{SITE.intro}</p>
        </ScrollReveal>

        <ScrollRevealGroup
          className={styles.projectRevealGroup}
          stagger={0.07}
          repeat={false}
          resetKey={filter}
        >
          {PROJECTS.map((project) => (
            <ScrollRevealItem
              key={project.slug}
              as="article"
              className={`${styles.card} ${styles.projectCard} ${styles.filterWork}`}
            >
              <motion.div {...(reducedMotion ? {} : projectCardTap)} style={{ height: '100%' }}>
                <Link to={`/project/${project.slug}`} className={styles.projectLink}>
                  <div className={styles.projectMedia}>
                    <ProjectBlockMedia
                      image={project.image}
                      video={project.showcaseVideo}
                      className={styles.projectImage}
                      fit={project.imageFit}
                      priority
                    />
                  </div>
                  <div className={styles.projectChrome}>
                    <span className={styles.projectOverlay}>
                      <span className={styles.projectTitle}>{project.title}</span>
                      <span className={styles.projectTagline}>{project.tagline}</span>
                    </span>
                    <span className={styles.projectOpen} aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Link>
              </motion.div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>

      {caseStudies.length ? (
        <section
          className={`${styles.caseIndex} ${styles.filterWork}`}
          aria-labelledby="case-studies-heading"
        >
          <ScrollReveal
            as="h2"
            id="case-studies-heading"
            className={styles.caseIndexTitle}
            variant="rise"
            repeat={false}
            resetKey={filter}
          >
            Case studies
          </ScrollReveal>
          <ScrollRevealGroup
            className={styles.caseIndexList}
            stagger={0.09}
            delay={0.04}
            repeat={false}
            resetKey={filter}
          >
            {caseStudies.map((project, index) => (
              <ScrollRevealItem key={project.slug} as="article" className={styles.caseIndexItem}>
                <Link
                  to={`/project/${project.slug}`}
                  className={styles.caseIndexLink}
                  aria-label={`View ${project.title} case study`}
                >
                  <div className={styles.caseIndexMedia}>
                    <ProjectBlockMedia
                      image={project.image}
                      video={project.showcaseVideo}
                      className={styles.caseIndexImage}
                      fit={project.imageFit}
                      priority
                    />
                  </div>
                  <div className={styles.caseIndexChrome}>
                    <span className={styles.caseIndexCopy}>
                      <span className={styles.caseIndexMeta}>
                        <span className={styles.caseIndexIndex}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.caseIndexMetaText}>
                          {getGalleryDiscipline(project.discipline)} · {project.year}
                        </span>
                      </span>
                      <span className={styles.caseIndexProject}>{project.title}</span>
                      <h3 className={styles.caseIndexHeading}>{project.tagline}</h3>
                      <p className={styles.caseIndexBody}>{getCaseStudyDescription(project)}</p>
                      <span className={styles.caseIndexCta} aria-hidden="true">
                        View case study ↗
                      </span>
                    </span>
                  </div>
                </Link>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </section>
      ) : null}
    </div>
  );
}
