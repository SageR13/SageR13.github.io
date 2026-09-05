import type { CaseStudySection } from '../../data/caseStudyTypes';
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from '../ScrollReveal';
import styles from './CaseStudyContent.module.css';

type CaseStudyResearchSectionProps = {
  section: CaseStudySection;
  sectionIndex?: number;
};

export function CaseStudyResearchSection({ section, sectionIndex = 0 }: CaseStudyResearchSectionProps) {
  const [featuredQuote, ...supportingQuotes] = section.quotes ?? [];

  return (
    <>
      {section.details?.length ? (
        <ScrollRevealGroup className={styles.researchMeta} stagger={0.08}>
          {section.details.map((detail, index) => (
            <ScrollRevealItem key={detail.label} as="article" className={styles.researchMetaCard}>
              <p className={styles.researchMetaIndex}>{String(index + 1).padStart(2, '0')}</p>
              <p className={styles.researchMetaLabel}>{detail.label}</p>
              <p className={styles.researchMetaValue}>{detail.value}</p>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      ) : null}

      {featuredQuote ? (
        <>
          <ScrollReveal as="blockquote" className={styles.researchQuoteFeatured} variant="spring" index={sectionIndex}>
            <span className={styles.researchQuoteMark} aria-hidden="true">
              “
            </span>
            <p>{featuredQuote.text.replace(/^"|"$/g, '')}</p>
            <footer>{featuredQuote.attribution}</footer>
          </ScrollReveal>

          {supportingQuotes.length ? (
            <ScrollRevealGroup className={styles.researchQuoteGrid} stagger={0.08}>
              {supportingQuotes.map((quote) => (
                <ScrollRevealItem key={quote.text} as="blockquote" className={styles.researchQuoteCard}>
                  <p>{quote.text}</p>
                  <footer>{quote.attribution}</footer>
                </ScrollRevealItem>
              ))}
            </ScrollRevealGroup>
          ) : null}
        </>
      ) : null}

      {section.findings?.length ? (
        <ScrollRevealGroup className={styles.researchFindings} stagger={0.08}>
          {section.findings.map((finding, index) => (
            <ScrollRevealItem key={finding.label} as="article" className={styles.researchFinding}>
              <p className={styles.researchFindingIndex}>{String(index + 1).padStart(2, '0')}</p>
              <p className={styles.researchFindingLabel}>{finding.label}</p>
              <p className={styles.researchFindingText}>{finding.text}</p>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      ) : null}

      {section.reasoningChain?.length ? (
        <ScrollReveal variant="rise" index={sectionIndex} delay={0.04}>
          <div className={styles.researchPipeline}>
            <p className={styles.researchPipelineTitle}>From research to design</p>
            <ScrollRevealGroup className={styles.researchPipelineTrack} stagger={0.1}>
              {section.reasoningChain.map((step, stepIndex) => (
                <ScrollRevealItem key={step.label} className={styles.researchPipelineStepWrap}>
                  <article className={styles.researchPipelineStep}>
                    <p className={styles.researchPipelineLabel}>{step.label}</p>
                    <p className={styles.researchPipelineText}>{step.text}</p>
                  </article>
                  {stepIndex < section.reasoningChain!.length - 1 ? (
                    <span className={styles.researchPipelineArrow} aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </ScrollRevealItem>
              ))}
            </ScrollRevealGroup>
          </div>
        </ScrollReveal>
      ) : null}
    </>
  );
}

export function isResearchSection(section: CaseStudySection) {
  return section.label.toLowerCase() === 'research' || section.label.toLowerCase() === 'user research';
}
