import type { CSSProperties } from 'react';
import type { CaseStudyReflection, CaseStudySection } from '../../data/caseStudyTypes';
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from '../ScrollReveal';
import { CaseStudyResearchSection, isResearchSection } from './CaseStudyResearchSection';
import styles from './CaseStudyContent.module.css';

interface CaseStudyContentProps {
  sections: CaseStudySection[];
  reflection?: CaseStudyReflection;
}

export function CaseStudyContent({ sections, reflection }: CaseStudyContentProps) {
  return (
    <div className={styles.root}>
      {sections.map((section, index) => {
        const researchSection = isResearchSection(section);

        return (
          <section
            key={`${section.number}-${section.label}`}
            className={`${styles.section} ${researchSection ? styles.sectionResearch : ''}`}
          >
            <ScrollReveal as="header" className={styles.sectionHead} variant="rise" index={index}>
              <p className={styles.kicker}>
                {section.number} · {section.label}
              </p>
              <h2 className={styles.heading}>
                {section.heading.lead}
                {section.heading.accent ? (
                  <>
                    <br />
                    <span className={styles.headingAccent}>{section.heading.accent}</span>
                  </>
                ) : null}
              </h2>
              {section.body ? <p className={styles.body}>{section.body}</p> : null}
            </ScrollReveal>

            {researchSection ? (
              <CaseStudyResearchSection section={section} sectionIndex={index} />
            ) : (
              <>
                {section.stats?.length ? (
                  <ScrollRevealGroup className={styles.stats} stagger={0.08}>
                    {section.stats.map((stat) => (
                      <ScrollRevealItem key={stat.value} as="article" className={styles.stat}>
                        <p className={styles.statValue}>{stat.value}</p>
                        <p className={styles.statDesc}>{stat.description}</p>
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                ) : null}

                {section.details?.length ? (
                  <ScrollRevealGroup className={styles.details} stagger={0.06}>
                    {section.details.map((detail) => (
                      <ScrollRevealItem key={detail.label} className={styles.detail}>
                        <dt>{detail.label}</dt>
                        <dd>{detail.value}</dd>
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                ) : null}

                {section.quotes?.length ? (
                  <ScrollRevealGroup className={styles.quotes} stagger={0.1}>
                    {section.quotes.map((quote) => (
                      <ScrollRevealItem key={quote.text} as="blockquote" className={styles.quote}>
                        <p>{quote.text}</p>
                        <footer>{quote.attribution}</footer>
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                ) : null}

                {section.findings?.length ? (
                  <ScrollRevealGroup className={styles.findings} stagger={0.08}>
                    {section.findings.map((finding) => (
                      <ScrollRevealItem key={finding.label} as="article" className={styles.finding}>
                        <p className={styles.findingLabel}>{finding.label}</p>
                        <p className={styles.findingText}>{finding.text}</p>
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                ) : null}

                {section.reasoningChain?.length ? (
                  <ScrollRevealGroup className={styles.reasoningChain} stagger={0.1}>
                    {section.reasoningChain.map((step, stepIndex) => (
                      <ScrollRevealItem key={step.label} className={styles.reasoningStepWrap}>
                        <article className={styles.reasoningStep}>
                          <p className={styles.reasoningLabel}>{step.label}</p>
                          <p className={styles.reasoningText}>{step.text}</p>
                        </article>
                        {stepIndex < section.reasoningChain!.length - 1 ? (
                          <span className={styles.reasoningArrow} aria-hidden="true">
                            ↓
                          </span>
                        ) : null}
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                ) : null}

                {section.conceptVideo || section.conceptImage || section.tags?.length ? (
                  <ScrollReveal variant="blur" index={index} delay={0.06}>
                    <div className={styles.concept}>
                      {section.conceptVideo ? (
                        <div
                          className={`${styles.conceptMedia} ${styles.conceptMediaVideo}`}
                          style={
                            section.conceptVideoAspect
                              ? { aspectRatio: section.conceptVideoAspect }
                              : undefined
                          }
                        >
                          <video autoPlay muted loop playsInline className={styles.video}>
                            <source src={section.conceptVideo} type="video/mp4" />
                          </video>
                        </div>
                      ) : section.conceptImage ? (
                        <div className={styles.conceptMedia}>
                          <img src={section.conceptImage} alt="" className={styles.image} />
                        </div>
                      ) : null}
                      {section.tags?.length ? (
                        <div className={styles.tagRow}>
                          {section.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </ScrollReveal>
                ) : null}

                {section.specs?.length ? (
                  <ScrollRevealGroup className={styles.specs} stagger={0.07}>
                    {section.specs.map((spec) => (
                      <ScrollRevealItem key={spec.label} as="article" className={styles.spec}>
                        <p className={styles.specLabel}>{spec.label}</p>
                        <p className={styles.specValue}>{spec.value}</p>
                        <p className={styles.specDetail}>{spec.detail}</p>
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                ) : null}

                {section.contextPhoto ? (
                  <ScrollReveal as="figure" className={styles.contextPhoto} variant="slideLeft" index={index}>
                    <div className={styles.contextPhotoMedia}>
                      <img src={section.contextPhoto.src} alt={section.contextPhoto.alt} />
                    </div>
                    <figcaption className={styles.contextPhotoCopy}>
                      <p className={styles.contextPhotoHeadline}>{section.contextPhoto.headline}</p>
                      <p className={styles.contextPhotoBody}>{section.contextPhoto.body}</p>
                    </figcaption>
                  </ScrollReveal>
                ) : null}

                {section.processImage ? (
                  <ScrollReveal as="figure" className={styles.processFigure} variant="rise" index={index}>
                    <img src={section.processImage} alt="" className={styles.processImage} />
                  </ScrollReveal>
                ) : null}

                {section.iterations?.length ? (
                  <ScrollRevealGroup className={styles.iterations} stagger={0.1}>
                    {section.iterations.map((iteration, iterIndex) => (
                      <ScrollRevealItem key={iteration.version} className={styles.iterationWrap}>
                        <article className={styles.iteration}>
                          <p className={styles.iterVersion}>
                            {iteration.version} — {iteration.title}
                          </p>
                          {iteration.problem ? (
                            <p className={styles.iterMeta}>
                              <span className={styles.iterMetaLabel}>Problem</span>
                              {iteration.problem}
                            </p>
                          ) : null}
                          {iteration.improvement ? (
                            <p className={styles.iterMeta}>
                              <span className={styles.iterMetaLabel}>Improvement</span>
                              {iteration.improvement}
                            </p>
                          ) : null}
                          {iteration.remainingIssue ? (
                            <p className={styles.iterMeta}>
                              <span className={styles.iterMetaLabel}>Remaining issue</span>
                              {iteration.remainingIssue}
                            </p>
                          ) : null}
                          {iteration.decision ? (
                            <p className={styles.iterMeta}>
                              <span className={styles.iterMetaLabel}>Decision</span>
                              {iteration.decision}
                            </p>
                          ) : null}
                          {iteration.result ? (
                            <p className={styles.iterMeta}>
                              <span className={styles.iterMetaLabel}>Result</span>
                              {iteration.result}
                            </p>
                          ) : null}
                          {iteration.body ? <p className={styles.iterBody}>{iteration.body}</p> : null}
                        </article>
                        {iterIndex < section.iterations!.length - 1 ? (
                          <span className={styles.iterationArrow} aria-hidden="true">
                            ↓
                          </span>
                        ) : null}
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                ) : null}

                {section.hero ? (
                  <ScrollReveal as="figure" className={styles.showcaseHero} variant="spring" index={index}>
                    <img src={section.hero.src} alt={section.hero.alt} className={styles.showcaseHeroImage} />
                    <figcaption className={styles.showcaseHeroCaption}>
                      {section.hero.badge ? <span className={styles.badge}>{section.hero.badge}</span> : null}
                      {section.hero.caption ? <p>{section.hero.caption}</p> : null}
                    </figcaption>
                  </ScrollReveal>
                ) : null}

                {section.slides?.length ? (
                  <ScrollRevealGroup className={styles.slides} stagger={0.08}>
                    {section.slides.map((slide) => (
                      <ScrollRevealItem key={slide.src} as="figure" className={styles.slide}>
                        <img src={slide.src} alt={slide.alt} />
                        {slide.caption ? <figcaption>{slide.caption}</figcaption> : null}
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                ) : null}

                {section.galleryTitle || section.galleryDescription ? (
                  <ScrollReveal variant="blur" index={index}>
                    <div className={styles.galleryIntro}>
                      {section.galleryTitle ? <p className={styles.galleryTitle}>{section.galleryTitle}</p> : null}
                      {section.galleryDescription ? (
                        <p className={styles.galleryDescription}>{section.galleryDescription}</p>
                      ) : null}
                    </div>
                  </ScrollReveal>
                ) : null}

                {section.screensVideo ? (
                  <ScrollReveal as="figure" className={styles.screensVideo} variant="blur" index={index}>
                    <div className={styles.screensVideoMedia}>
                      <video autoPlay muted loop playsInline className={styles.screensVideoEl}>
                        <source src={section.screensVideo} type="video/mp4" />
                      </video>
                    </div>
                    {section.screensVideoCaption ? (
                      <figcaption>{section.screensVideoCaption}</figcaption>
                    ) : null}
                  </ScrollReveal>
                ) : section.screens?.length ? (
                  <ScrollRevealGroup className={styles.screenStrip} stagger={0.06}>
                    {section.screens.map((screen) => (
                      <ScrollRevealItem key={screen.src} as="figure" className={styles.screen}>
                        <div
                          className={styles.screenMedia}
                          style={
                            section.screenHeight
                              ? ({ '--phone-height': section.screenHeight } as CSSProperties)
                              : undefined
                          }
                        >
                          <img src={screen.src} alt={screen.alt} />
                        </div>
                        {screen.caption ? <figcaption>{screen.caption}</figcaption> : null}
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealGroup>
                ) : null}
              </>
            )}
          </section>
        );
      })}

      {reflection ? (
        <ScrollReveal as="aside" className={styles.reflection} variant="spring" index={sections.length}>
          <p className={styles.reflectionLabel}>{reflection.label}</p>
          <p className={styles.reflectionBody}>{reflection.body}</p>
        </ScrollReveal>
      ) : null}
    </div>
  );
}
