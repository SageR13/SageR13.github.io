export type ProjectLayout =
  | 'large-left'
  | 'large-right'
  | 'full'
  | 'split-small-left'
  | 'split-small-right';

export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  timeline: string;
  description: string;
  tagline: string;
  discipline: string;
  image: string;
  /** How the homepage card image fills its tile — use contain for device mockups. */
  imageFit?: 'cover' | 'contain';
  heroImage: string;
  showcaseImage?: string;
  /** How the project hero image fills its frame — use contain for device mockups. */
  heroImageFit?: 'cover' | 'contain';
  /** Optional hero frame aspect ratio, e.g. "1 / 1" for square mockups. */
  heroImageAspect?: string;
  showcaseVideo?: string;
  layout: ProjectLayout;
  category: string;
  tags: string[];
  featured?: boolean;
  /** Homepage card CTA — case-study for flagship UX work, project for exploratory pieces. */
  ctaType?: 'case-study' | 'project';
  highlight?: string;
  storeLinks?: {
    appStore?: string;
    googlePlay?: string;
    web?: string;
    webLabel?: string;
    note?: string;
  };
  overview: string;
  problem: string;
  research: string;
  process: string;
  iterations: string;
  prototype: string;
  outcome: string;
}

export const SITE = {
  name: 'Sage Rebello',
  title: 'Product Designer + Design Engineer',
  headline: 'I design intuitive experiences for complex systems.',
  principleHeadline: 'I design intuitive experiences using',
  positioning:
    'Product designer + design engineer working across digital products, AI, physical interaction, and emerging technology.',
  intro:
    'Focused on clarity, measurable impact, and craft across digital and physical products.',
  availability: 'Open to full-time & contract roles',
  location: 'New York, NY',
  email: 'sagellen21@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sage-rebello-a11205241/',
  resume: '/sageResume.pdf',
  profileImage: '/sage-reference.jpg',
};

/** Top three projects positioned for UX/product recruiting. */
export const FEATURED_PROJECT_SLUGS = ['course-correct', 'talkit', 'confident'] as const;

export const PROJECTS: Project[] = [
  {
    slug: 'course-correct',
    title: 'Course Correct',
    year: '2026',
    role: 'Lead Product Designer / UI·UX',
    timeline: 'Ongoing',
    category: 'Mobile App',
    discipline: 'Product Design · UX Research',
    tagline: 'Reducing cognitive load for instructors during live lessons.',
    tags: ['Mobile', 'Scheduling', 'Instructors'],
    featured: true,
    ctaType: 'case-study',
    highlight: 'Live lesson support for instructors',
    description:
      'A driving lesson support app built for instructors during live, on-the-road training sessions.',
    image: '/thumbs/courseCorrect.jpg',
    heroImage: '/thumbs/courseCorrect.jpg',
    showcaseImage: '/hero/courseCorrect.png',
    showcaseVideo: '/blockVid/carVid.mov',
    layout: 'full',
    overview:
      'A mobile product that helps driving instructors monitor progress, give feedback, and manage lessons without splitting attention away from the road.',
    problem:
      'Driving instructors are expected to monitor student behavior, navigate live road conditions, provide real-time feedback, and track lesson progress — all simultaneously, with no dedicated tools to help.',
    research:
      'Instructor interviews and industry research surfaced stress around multitasking, lesson documentation, and adapting feedback to each student\'s stage — from neighborhood turns to highway readiness.',
    process:
      'Journey mapping for in-car sessions, progressive lesson stages, and UI designed for glanceable interaction. Prioritized one-handed flows and high-contrast states for outdoor visibility.',
    iterations:
      'Lesson stage models, feedback capture patterns, and scheduling flows refined through scenario walkthroughs with instructors. Reduced in-session taps for common actions.',
    prototype:
      'High-fidelity mobile prototype covering lesson tracking, stage progression, and instructor notes — tested against paper-based workflows instructors use today.',
    outcome:
      'A product direction that reduces instructor cognitive load during high-stakes training — positioning Sage as a UX/product designer solving real workflow problems.',
  },
  {
    slug: 'talkit',
    title: 'talkIT',
    year: '2026',
    role: 'Product Design / XR',
    timeline: '14 weeks',
    category: 'XR / AI',
    discipline: 'AI · Product Design · UX Research',
    tagline: 'Turning surroundings into language practice.',
    tags: ['Spatial UI', 'Language', 'Vision'],
    featured: true,
    ctaType: 'case-study',
    highlight: 'Immersive language practice',
    description:
      'An AI-powered XR language-learning experience designed to help people practice conversational language in immersive environments.',
    image: '/hero/talkITcover.png',
    heroImage: '/hero/talkITcover.png',
    showcaseImage: '/hero/talkITcover.png',
    showcaseVideo: '/blockVid/talkITThumb.mp4',
    storeLinks: {
      note: 'Try the interactive web version.',
      web: 'https://aubwaub.github.io/Blink/',
      webLabel: 'Open web demo',
    },
    layout: 'full',
    overview:
      'An immersive language product that turns real-world context into conversational practice — reducing anxiety through situational, low-stakes repetition.',
    problem:
      'Language learners need safe, contextual conversation practice beyond flashcards and scripted drills. Existing apps optimize for streaks, not real confidence.',
    research:
      'Learner interviews highlighted anxiety, lack of situational context, and desire for low-stakes repetition. Shadowing sessions revealed drop-off when feedback felt punitive.',
    process:
      'Conversation design, spatial UI, AI interaction patterns, and immersive prototyping. Established a prompt → practice → reflect loop anchored in scanned environments.',
    iterations:
      'Dialogue flows, spatial anchors, and feedback states tested across multiple immersion scenarios. Simplified vocabulary reveals from modal to ambient overlays.',
    prototype:
      'XR prototype with object-scan prompts, vocabulary reveals, and live conversational coaching. Tested in English and Spanish learning contexts.',
    outcome:
      'A product direction that makes language practice feel social, situational, and emotionally safe — with measurable gains in session completion vs. a flat mobile baseline.',
  },
  {
    slug: 'confident',
    title: 'confiDENT',
    year: '2025',
    role: 'Product Design / UX',
    timeline: '16 weeks',
    category: 'Health Tech',
    discipline: 'Health Tech · Interaction Design',
    tagline: 'Hands-free interaction for dental examinations.',
    tags: ['Mobile', 'Hardware', 'AI'],
    featured: true,
    ctaType: 'case-study',
    highlight: 'At-home oral health monitoring',
    description:
      'At-home intraoral camera and companion app designed to make oral health documentation and monitoring more accessible.',
    image: '/thumbs/confiDENT.jpg',
    heroImage: '/thumbs/confiDENT.jpg',
    showcaseImage: '/hero/teeth.png',
    showcaseVideo: '/blockVid/confiThumbVid.mp4',
    layout: 'large-left',
    overview:
      'A physical-digital system that helps people capture, understand, and share oral health data from home — bridging the gap between clinical visits with a product patients actually want to use.',
    problem:
      'Dental monitoring outside the clinic is fragmented, clinical, and difficult for everyday users to maintain. Patients lack tools that feel approachable, accurate, and worth returning to.',
    research:
      'Interviews with patients and hygienists surfaced friction around documentation, device ergonomics, and trust in at-home capture. Diary studies revealed drop-off after the first session without guided feedback.',
    process:
      'Hardware form studies, companion app flows, and iterative prototyping across device and interface. Defined a capture-to-review loop with progressive disclosure for clinical terms.',
    iterations:
      'Multiple enclosure scales, grip variants, and app onboarding paths tested for clarity and confidence. Reduced setup steps from seven to three based on moderated usability tests.',
    prototype:
      'Functional prototype pairing a handheld camera with guided capture and AI-assisted review in the app. Tested with 8 participants across two rounds.',
    outcome:
      'A cohesive product experience that makes at-home documentation feel approachable and trustworthy — with a clear path from daily habit to shareable clinical summary.',
  },
  {
    slug: 'blink',
    title: 'Blink',
    year: '2026',
    role: 'UI/UX Designer · Animator · Illustrator',
    timeline: '11 weeks',
    category: 'Mobile AR',
    discipline: 'Product Design · AI',
    tagline: 'Giving everyday objects a voice.',
    tags: ['AR', 'AI conversation', 'Illustration', 'Prompt design'],
    featured: true,
    ctaType: 'project',
    highlight: 'Authored AR companion objects',
    description:
      'An AR app that lets your favorite objects talk back with the personality you\'ve always imagined for them.',
    image: '/thumbs/blink.png',
    heroImage: '/thumbs/blink.png',
    showcaseImage: '/thumbs/blink.png',
    heroImageFit: 'contain',
    heroImageAspect: '1 / 1',
    showcaseVideo: '/blockVid/blinkVid.mov',
    layout: 'split-small-left',
    overview:
      'A playful AR companion where users photograph objects they already love, shape their personality, and build a bond that grows over time — authorship turns a demo into a relationship.',
    problem:
      'College students often struggle to find someone available and accepting to talk to, leaving them unable to express themselves and increasingly isolated.',
    research:
      'Three identical sessions varied only by whether users chose, named, and shaped the object before hearing it speak. Authorship did all the work — self-scanned objects felt real; generic AR objects felt like tech demos.',
    process:
      'Illustrated UI, AR object recognition, personality blending, prompt engineering, and LiveKit voice pipeline — designed so the object feels like it has needs, not just responses.',
    iterations:
      'From a mood calendar (mirror, not relationship) to generic talking objects (novelty dies in minutes) to user-authored companions (trust already deposited).',
    prototype:
      'Mobile AR build with scan → shape → converse → feed loop, nine blendable personality traits, and bond-level prompt evolution.',
    outcome:
      'Proof that authorship — not novelty — creates connection. Users stayed when the object was theirs first; a reference for humane AI companion design beyond chatbot patterns.',
  },
  {
    slug: 'rock-on-raccoon',
    title: 'Rock On, Raccoon!',
    year: '2023',
    role: 'Game UI / Interaction Design',
    timeline: '20 weeks',
    category: 'Game UI',
    discipline: 'Game UI · Interaction',
    tagline: 'Character-led rhythm with readable mobile timing',
    tags: ['Mobile', 'Rhythm', 'Character'],
    ctaType: 'project',
    highlight: 'Character-led rhythm game',
    description:
      'A mobile rhythm game designed around playful interaction, timing, and visual feedback.',
    image: '/thumbs/rockOnRaccoon.jpg',
    heroImage: '/thumbs/rockOnRaccoon.jpg',
    showcaseImage: '/case/rockBack.png',
    showcaseVideo: '/blockVid/rockThumb.mp4',
    storeLinks: {
      note: 'You can play it on the App Store.',
      appStore: 'https://apps.apple.com/app/rock-on-raccoon/id6450372557',
    },
    layout: 'split-small-right',
    overview:
      'A rhythm game built around expressive characters, timing, and tactile visual feedback — targeting mobile-first play sessions under three minutes.',
    problem:
      'Mobile rhythm games often sacrifice personality for generic arcade visual systems. Players struggle to read timing windows at smaller screen sizes.',
    research:
      'Gameplay sessions and competitor audits informed timing clarity and character-led feedback. Mapped failure states to encouraging, not punishing, copy.',
    process:
      'Character design, touch-first UI, level rhythm tuning, and feedback animation. Built a component library for combo states and hit windows.',
    iterations:
      'Hit windows, combo states, and visual language tuned for readability and delight. Increased touch target sizes by 18% after playtest round one.',
    prototype:
      'Playable mobile build with touch-first rhythm mechanics and expressive character reactions. Usability tested with 10 casual mobile gamers.',
    outcome:
      'A playful game identity with strong timing clarity and memorable visual charm — portfolio proof of end-to-end game UI craft.',
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return FEATURED_PROJECT_SLUGS.map((slug) => getProject(slug)).filter(
    (project): project is Project => project !== undefined,
  );
}

export function getProjectCtaLabel(slug: string): string {
  const project = getProject(slug);
  return project?.ctaType === 'case-study' ? 'View case study ↗' : 'View project ↗';
}

/** Shorter discipline line for homepage gallery cards. */
export function getGalleryDiscipline(discipline: string): string {
  return discipline
    .split(' · ')
    .slice(0, 2)
    .join(' · ');
}

export function getAdjacentProjects(slug: string) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };

  return {
    prev: index > 0 ? PROJECTS[index - 1] : undefined,
    next: index < PROJECTS.length - 1 ? PROJECTS[index + 1] : undefined,
  };
}
