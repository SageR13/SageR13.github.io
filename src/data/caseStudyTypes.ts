export interface CaseStudyStat {
  value: string;
  description: string;
}

export interface CaseStudyDetail {
  label: string;
  value: string;
}

export interface CaseStudyQuote {
  text: string;
  attribution: string;
}

export interface CaseStudyFinding {
  label: string;
  text: string;
}

export interface CaseStudySpec {
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudyIteration {
  version: string;
  title: string;
  body?: string;
  problem?: string;
  improvement?: string;
  remainingIssue?: string;
  decision?: string;
  result?: string;
}

export interface CaseStudyReasoningStep {
  label: string;
  text: string;
}

export interface CaseStudyContextPhoto {
  src: string;
  alt: string;
  headline: string;
  body: string;
}

export interface CaseStudyReflection {
  label: string;
  body: string;
}

export interface CaseStudyMedia {
  src: string;
  alt: string;
  caption?: string;
  badge?: string;
  /** Normalizes device frame height when PNG canvas padding differs. */
  frameScale?: number;
  /** Vertical offset of device frame within PNG (0–1). */
  frameOffset?: number;
}

export interface CaseStudySection {
  number: string;
  label: string;
  heading: { lead: string; accent?: string };
  body?: string;
  stats?: CaseStudyStat[];
  details?: CaseStudyDetail[];
  quotes?: CaseStudyQuote[];
  findings?: CaseStudyFinding[];
  reasoningChain?: CaseStudyReasoningStep[];
  tags?: string[];
  conceptVideo?: string;
  /** Optional aspect ratio for concept video container, e.g. "9 / 16". */
  conceptVideoAspect?: string;
  conceptImage?: string;
  contextPhoto?: CaseStudyContextPhoto;
  specs?: CaseStudySpec[];
  processImage?: string;
  iterations?: CaseStudyIteration[];
  hero?: CaseStudyMedia;
  slides?: CaseStudyMedia[];
  galleryTitle?: string;
  galleryDescription?: string;
  screens?: CaseStudyMedia[];
  /** Replace the screen strip with a single showcase video. */
  screensVideo?: string;
  screensVideoCaption?: string;
  /** Override default phone mockup height in the screen strip. */
  screenHeight?: string;
}

export interface CaseStudyBundle {
  sections: CaseStudySection[];
  reflection?: CaseStudyReflection;
  nextTeaser?: {
    direction: string;
    title: string;
    tagline: string;
  };
}
