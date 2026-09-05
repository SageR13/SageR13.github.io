import type { CaseStudyReflection, CaseStudySection } from './caseStudyTypes';

export const CASE_STUDIES: Record<string, CaseStudySection[]> = {
  'course-correct': [
    {
      number: '01',
      label: 'The Problem',
      heading: { lead: 'Teaching driving is', accent: 'high-stakes multitasking.' },
      body:
        'Driving instructors monitor student behavior, navigate live road conditions, give real-time feedback, and track lesson progress — simultaneously, with no dedicated tools built for the passenger seat.',
      stats: [
        {
          value: 'Student driver',
          description:
            'Lessons progress through fundamentals, local roads, and highway readiness — each phase with distinct skill demands and anxiety triggers.',
        },
        {
          value: 'Driving instructor',
          description:
            '"Once a student feels comfortable with roads and skills, I take them to an unfamiliar lot so they can carry that skill no matter the environment."',
        },
        {
          value: 'Industry research',
          description:
            'Instructor stress is common. Balancing student safety, managing expectations, and adapting to live road conditions requires sustained attention with minimal tooling.',
        },
      ],
    },
    {
      number: '02',
      label: 'User Research',
      heading: { lead: 'Stress lives in', accent: 'the in-between moments.' },
      details: [
        { label: 'Method', value: 'Contextual interviews and ride-along observation of live driving lessons' },
        { label: 'Participants', value: '2 licensed driving instructors, 1 student driver' },
        {
          label: 'Focus question',
          value: 'What mental and logistical burdens do instructors carry during a live lesson — and where do current tools fail them?',
        },
        {
          label: 'Synthesis',
          value: 'Pain point clustering → instructor journey map → opportunity framing by lesson phase',
        },
      ],
      quotes: [
        {
          text: '"I watch the road, watch their hands, remember what we covered last session."',
          attribution: 'Instructor, 6 years · independent',
        },
        {
          text: '"During my sessions I take notes in my notebook."',
          attribution: 'Instructor, 11 years · independent',
        },
        {
          text: '"Stressed the whole drive and would feel better with reassurance from teacher."',
          attribution: 'Student · NJ',
        },
      ],
      findings: [
        {
          label: 'Finding 01',
          text: 'Instructors still handwrite notes during and after lessons — nothing captures feedback in the moment without pulling focus from the road.',
        },
        {
          label: 'Finding 02',
          text: 'Progress tracking breaks down across students over time. Instructors lose continuity on each learner\'s skill gaps.',
        },
      ],
      reasoningChain: [
        {
          label: 'Research finding',
          text: 'Instructors constantly switch attention between the student, road, notes, and lesson progress.',
        },
        {
          label: 'Insight',
          text: 'Any interface requiring sustained visual attention introduces another source of distraction.',
        },
        {
          label: 'Design principle',
          text: 'Eyes on the road. Interaction in seconds.',
        },
        {
          label: 'Design decision',
          text: 'Replace dashboard navigation with glanceable cards, voice logging, and one-tap flags.',
        },
      ],
    },
    {
      number: '03',
      label: 'The Opportunity',
      heading: { lead: 'Log every moment.', accent: 'Review everything after.' },
      body:
        'Research pointed to a split workflow: capture in the moment with minimal attention, then review and organize after the lesson — not a single dashboard competing with the road.',
      conceptVideo: '/case/car.mp4',
      tags: [
        'Voice logging',
        'Swipe flags',
        'Session reports',
        'Student profiles',
        'Scanning notes',
        'Smart navigation',
      ],
    },
    {
      number: '04',
      label: 'Core Experience',
      heading: { lead: 'Built for the', accent: 'passenger seat.' },
      body:
        'Every feature was evaluated against one constraint: can an instructor use it without leaving the lesson.',
      specs: [
        {
          label: 'Navigation',
          value: 'Smart path',
          detail: 'Voice or type student-specific routes (e.g. "closest grocery store with the most stop signs")',
        },
        {
          label: 'Swipe-to-flag',
          value: 'Left / right',
          detail: 'Instant issue flagging across customizable categories',
        },
        {
          label: 'Voice notes',
          value: 'Hands-free',
          detail: 'Timestamped audio clipped to the lesson timeline',
        },
        {
          label: 'Auto report',
          value: 'Post-session',
          detail: 'Structured summary generated at the end of every lesson',
        },
        {
          label: 'Student profiles',
          value: 'Persistent',
          detail: 'Full history of skills, flags, and progress across all sessions',
        },
        {
          label: 'Flag creation',
          value: '1 tap',
          detail: 'Create and manage flags before the lesson begins',
        },
      ],
      contextPhoto: {
        src: '/case/driveInUSe.png',
        alt: 'Course Correct in use from the passenger seat during a live lesson',
        headline: 'Designed for 40 mph, not a desk.',
        body:
          'The interaction model was intentionally designed for minimal visual attention — shaped by the constraint of a moving vehicle, not a design critique on a monitor.',
      },
    },
    {
      number: '05',
      label: 'Process',
      heading: { lead: 'Iteration.', accent: 'Intention.' },
      body:
        'Three interface directions tested the same question: how little can the instructor look at the screen while still capturing what matters?',
      iterations: [
        {
          version: 'V1',
          title: 'Dashboard',
          problem: 'Too much information competed for instructor attention during live lessons.',
          body: 'Detailed stats and controls on one screen — overwhelming mid-lesson while watching the road.',
        },
        {
          version: 'V2',
          title: 'Tabbed layout',
          improvement: 'Reduced information density by separating live logging from student history.',
          remainingIssue: 'Switching views still required attention away from the lesson.',
          body: 'Tabs helped organize content, but navigation still pulled focus at the wrong moments.',
        },
        {
          version: 'V3',
          title: 'Glance-first',
          decision: 'Surface only the action needed at that moment.',
          result: 'Fewer decisions while driving — map, large swipe targets, and one active flag in the live view.',
          body: 'Everything else surfaces before or after the session, not during it.',
        },
      ],
    },
    {
      number: '06',
      label: 'Final Design',
      heading: { lead: 'The app,', accent: 'screen by screen.' },
      body:
        'With problem, research, principles, and iteration established — the full system: live session logging on the road and student histories for review after.',
      hero: {
        src: '/hero/courseCorrect.png',
        alt: 'Course Correct app — hero shot',
        badge: 'Mobile app',
        caption: 'Live session dashboard — swipe-to-flag, voice-to-text notes, auto-generated summary reports',
      },
      slides: [
        { src: '/case/driveInUSe.png', alt: 'Live session in vehicle context', caption: 'In-vehicle context' },
        { src: '/case/start.png', alt: 'Flag and note system', caption: 'Flag & note system' },
        { src: '/case/studentReports.png', alt: 'Session report', caption: 'Session report' },
      ],
      galleryTitle: 'App screens',
      galleryDescription:
        'Calm, high-contrast UI designed to minimize distraction — fast to read, fast to interact with, structured for each phase of the lesson.',
      screens: [
        { src: '/case/map.png', alt: 'Home', caption: 'Home' },
        { src: '/case/start.png', alt: 'Start session', caption: 'Start session' },
        { src: '/case/profile.png', alt: 'Driver profile', caption: 'Driver profile' },
        { src: '/case/studentSkillList.png', alt: 'Student flag list', caption: 'Student flag list' },
        { src: '/case/scanDoc.png', alt: 'Scan written notes', caption: 'Scan written notes' },
        { src: '/case/studentReports.png', alt: 'Student reports archive', caption: 'Reports archive' },
      ],
    },
    {
      number: '07',
      label: 'Outcome',
      heading: { lead: 'Less screen.', accent: 'More teaching.' },
      body:
        'Qualitative outcomes from instructor walkthroughs and prototype testing — no manufactured metrics.',
      stats: [
        {
          value: 'Reduced interaction complexity',
          description:
            'Critical lesson actions are available without navigating multiple screens or dense dashboards.',
        },
        {
          value: 'Preserved lesson context',
          description:
            'Notes, flags, and progress remain available for structured post-drive review.',
        },
        {
          value: 'Shifted documentation out of the drive',
          description:
            'Detailed review happens after the lesson rather than competing with road attention.',
        },
      ],
    },
  ],

  talkit: [
    {
      number: '01',
      label: 'The Problem',
      heading: { lead: 'Language learning', accent: 'is broken.' },
      body:
        'Most apps teach generic sentences you\'ll never use. Vocabulary is memorized in isolation — separated from the real places and objects where conversation actually happens.',
      stats: [
        {
          value: '79.1%',
          description: 'of learners have seen an everyday object and struggled to remember its translation.',
        },
        {
          value: '79.1%',
          description: 'said associating vocabulary with real-world contexts helps with retention.',
        },
        {
          value: 'Majority',
          description: 'reported forgetting recently learned vocabulary within days of a lesson.',
        },
      ],
    },
    {
      number: '02',
      label: 'User Research',
      heading: { lead: 'Listening before', accent: 'designing.' },
      details: [
        { label: 'Method', value: 'Semi-structured interviews and one-week diary studies with active learners' },
        { label: 'Participants', value: '8 language learners, ages 18–34, across 4 target languages' },
        { label: 'Focus question', value: 'When does vocabulary stick — and when does it disappear?' },
        { label: 'Synthesis', value: 'Response clustering → pain point mapping → narrowed product direction' },
      ],
      quotes: [
        {
          text: '"I have difficulty remembering vocabulary because if you don\'t use words frequently you lose them."',
          attribution: 'Participant 3 · French learner, 25',
        },
        {
          text: '"In other language apps, I don\'t like how I\'m put at a level that feels too beginner for me."',
          attribution: 'Participant 6 · Russian learner, 27',
        },
        {
          text: '"During conversation, sometimes I lose words mid-sentence and end up describing instead of using the vocab word."',
          attribution: 'Participant 1 · Hindi learner, 19',
        },
      ],
      findings: [
        {
          label: 'Finding 01',
          text: 'Vocabulary learned out of context doesn\'t transfer. Words need environmental anchors to stick.',
        },
        {
          label: 'Finding 02',
          text: 'Learners want multi-use practice — not gamified streak mechanics that increase anxiety.',
        },
        {
          label: 'Design opportunity',
          text: 'Situated cognition research shows words encoded with physical context are recalled significantly faster.',
        },
        {
          label: 'Design principle',
          text: 'The environment should be the curriculum. Let the user\'s world drive what they learn.',
        },
      ],
    },
    {
      number: '03',
      label: 'The Concept',
      heading: { lead: 'Your world is', accent: 'the lesson.' },
      body:
        'Point your camera at any object. talkIT identifies it, teaches you the word, then pulls you into a real conversation about what you\'re looking at.',
      conceptVideo: '/blockVid/talkITFinal.mp4',
      tags: ['Object recognition', 'AI conversation', 'Adaptive difficulty', 'Any language', 'Prompt design'],
    },
    {
      number: '04',
      label: 'Process',
      heading: { lead: 'How we got', accent: 'to the answer.' },
      body:
        'Three rounds of user testing shaped talkIT from a basic flashcard scanner into a full conversational flow. Each round surfaced a different failure — and a sharper solution.',
      processImage: '/case/useTest.png',
      iterations: [
        {
          version: 'v1',
          title: 'Scan & label',
          body: 'Simple object recognition with vocabulary overlay. Users learned words but had no instance to use them in conversation.',
        },
        {
          version: 'v2',
          title: 'Prompted practice',
          body: 'Scripted follow-up questions after scanning. Users wanted to respond naturally, not choose from fixed options.',
        },
        {
          version: 'v3',
          title: 'Free conversation',
          body: 'Open-ended AI conversation guided by the scanned object. Users stayed engaged 3× longer and reported the flow felt natural.',
        },
      ],
    },
    {
      number: '05',
      label: 'Final Design',
      heading: { lead: 'The app.' },
      body:
        'Warm, high-contrast UI for use on the go. Bold type for quick reading, large tap targets, and a conversational tone that makes the AI feel like a patient tutor.',
      hero: {
        src: '/hero/talkIT.png',
        alt: 'talkIT — conversation with a scanned object',
        badge: 'Core flow',
        caption: 'Scan an object, learn the word, then stay in an open-ended AI conversation about what you\'re looking at',
      },
      galleryTitle: 'App screens',
      galleryDescription:
        'Onboarding, object scan, vocabulary reveal, real-time conversation, teacher creation, and past sessions — each built for quick reading in the moment.',
      screenHeight: 'clamp(280px, 32vh, 340px)',
      screens: [
        { src: '/case/onboarding.png', alt: 'Onboarding', caption: 'Onboarding' },
        { src: '/case/scan.png', alt: 'Object scan', caption: 'Object scan' },
        { src: '/case/m1.png', alt: 'Vocabulary reveal', caption: 'Vocabulary reveal' },
        { src: '/case/m2.png', alt: 'Conversation', caption: 'Real-time conversation' },
        { src: '/case/m3.png', alt: 'Creating a new teacher', caption: 'Creating a teacher' },
        { src: '/case/calm4.png', alt: 'Past conversations', caption: 'Past conversations' },
      ],
    },
  ],

  confident: [
    {
      number: '01',
      label: 'The Problem',
      heading: { lead: 'You can\'t fix what', accent: 'you can\'t see.' },
      body:
        'Most people inspect teeth with a bathroom mirror or phone camera. Back molars, gumlines, and early decay stay invisible — leaving patients anxious, uninformed, and waiting until their next visit.',
      stats: [
        {
          value: '63.2%',
          description:
            'of adults have been unsure whether to seek care because they couldn\'t gauge how serious an issue was.',
        },
        {
          value: '75%',
          description: 'of interviewees found it difficult to examine teeth at home due to lighting and reach.',
        },
        {
          value: '0',
          description: 'users could confidently assess a problem they felt in their teeth with existing tools.',
        },
      ],
    },
    {
      number: '02',
      label: 'User Research',
      heading: { lead: 'Anxiety lives in', accent: 'the unknown.' },
      details: [
        { label: 'Method', value: 'Contextual interviews and observational study of at-home oral care routines' },
        { label: 'Participants', value: '20 adults, ages 18–60, from dental-avoidant to proactive' },
        {
          label: 'Focus question',
          value: 'What stops people from understanding or acting on their oral health at home?',
        },
        { label: 'Synthesis', value: 'Pain point analysis → user journey map → opportunity framing' },
      ],
      quotes: [
        {
          text: '"It\'s hard to check my back teeth — I just can\'t see back there no matter what I do."',
          attribution: 'Participant 4 · dental-avoidant, 34',
        },
        {
          text: '"I never know if I should actually go to the dentist or if I\'m overreacting."',
          attribution: 'Participant 7 · 28',
        },
        {
          text: '"Even when I see something that looks off, I have no idea if it\'s serious. I don\'t speak dentist."',
          attribution: 'Participant 2 · 41',
        },
      ],
      findings: [
        {
          label: 'Finding 01',
          text: 'Visibility is the first barrier. Users cannot inspect their full mouth with existing tools.',
        },
        {
          label: 'Finding 02',
          text: 'Even when something is visible, users lack the knowledge to interpret what they\'re seeing.',
        },
        {
          label: 'Design opportunity',
          text: 'A device that extends reach and interprets findings removes both barriers in one interaction.',
        },
        {
          label: 'Design principle',
          text: 'Confidence comes from clarity. The product should make dental health legible, not clinical.',
        },
      ],
    },
    {
      number: '03',
      label: 'The Concept',
      heading: { lead: 'See every corner.', accent: 'Understand what it means.' },
      body:
        'A slim intraoral camera with tongue-controlled tilt and rotation — minimal hand movement. The companion app captures, analyzes, and flags anything suspicious.',
      conceptVideo: '/case/comm.mp4',
      tags: ['1920 HD camera', 'Tongue navigation', 'AI analysis', 'Dentist sharing', '3D modeling'],
    },
    {
      number: '04',
      label: 'Hardware',
      heading: { lead: 'Built to reach', accent: 'where you can\'t.' },
      specs: [
        {
          label: 'Camera resolution',
          value: '1920 HD',
          detail: 'Captures detail invisible to the naked eye',
        },
        {
          label: 'Device length',
          value: '9 in',
          detail: 'Reaches all posterior molars comfortably',
        },
        {
          label: 'Cable length',
          value: '55 in',
          detail: 'Full range of motion without awkward reaching',
        },
        {
          label: 'Tilt range',
          value: '45°',
          detail: 'Tongue-controlled; full upper and lower coverage',
        },
        {
          label: 'Rotation',
          value: '±15°',
          detail: 'Fine-tuned repositioning without removing the device',
        },
        {
          label: 'Control method',
          value: 'Tongue',
          detail: 'Hands-limited; intuitive after one practice session',
        },
      ],
    },
    {
      number: '05',
      label: 'Process',
      heading: { lead: 'Three versions.', accent: 'One that works.' },
      body:
        'Significant physical and UX iteration — from an unwieldy first prototype to a slim, ergonomic form users could operate hands-free with confidence.',
      processImage: '/case/iteration.png',
      iterations: [
        {
          version: 'v1',
          title: 'Proof of concept',
          body: 'Basic camera on an extendable wand. Users struggled with one-handed control and couldn\'t reach back teeth comfortably.',
        },
        {
          version: 'v2',
          title: 'Ergonomic rethink',
          body: 'Slimmer profile, angled tip, handle buttons. Better reach, but hands were still occupied — limiting natural mouth positioning.',
        },
        {
          version: 'v3',
          title: 'Tongue navigation',
          body: 'All controls shifted to tongue-activated sensors. Users reported full control and could reach every area without assistance.',
        },
      ],
    },
    {
      number: '06',
      label: 'Final Design',
      heading: { lead: 'The prototype', accent: '& the app.' },
      body:
        'A physical prototype paired with a companion app — the device handles capture and navigation; the app handles analysis and sharing. Two products, one seamless experience.',
      hero: {
        src: '/hero/teeth.png',
        alt: 'confiDENT prototype — hero shot',
        badge: 'Physical prototype',
        caption: 'Tongue-controlled intraoral camera — 9" wand, 1920 HD, ±45° tilt',
      },
      slides: [
        { src: '/case/blueConfident.png', alt: 'Device form and ergonomics', caption: 'Device form & ergonomics' },
        { src: '/case/confiApp.png', alt: 'App companion interface', caption: 'App companion interface' },
        { src: '/case/coverConfi.png', alt: 'In-context use', caption: 'In-context use' },
      ],
      galleryTitle: 'Companion app',
      galleryDescription:
        'Calm UI designed to reduce anxiety — clear visual feedback, plain-language analysis, and one-tap sharing with your dentist.',
      screens: [
        { src: '/case/appOne.png', alt: 'Home', caption: 'Home' },
        { src: '/case/appTwo.png', alt: 'Live scan', caption: 'Live scan' },
        { src: '/case/appThree.png', alt: 'Image capture', caption: 'Image capture' },
        { src: '/case/appFour.png', alt: 'AI analysis', caption: 'AI analysis' },
        { src: '/case/appFive.png', alt: 'Health history', caption: 'Health history' },
        { src: '/case/appSix.png', alt: 'Share with dentist', caption: 'Share with dentist' },
      ],
    },
  ],

  blink: [
    {
      number: '01',
      label: 'The Problem',
      heading: { lead: 'College students can\'t find', accent: 'someone to talk to.' },
      body:
        'Students ages 18–22 often struggle to find someone available and accepting to talk to — leaving them unable to express themselves and increasingly isolated.',
      stats: [
        {
          value: '29/30',
          description: 'people interviewed had already talked to an inanimate object.',
        },
        {
          value: '3',
          description: 'core needs went unmet — active listening, validation, and a consistent presence.',
        },
        {
          value: '0',
          description: 'existing AI companions let you author the object you already love and trust.',
        },
      ],
    },
    {
      number: '02',
      label: 'Research',
      heading: { lead: 'Authorship is', accent: 'the whole variable.' },
      body:
        'We ran three identical sessions — the only difference was whether the user chose, named, and shaped the object before hearing it speak. That single variable did all the work.',
      quotes: [
        {
          text: '"It is no longer part of my imagination. I want my toy to be something whose soul is given by me."',
          attribution: 'Research participant · self-scanned object session',
        },
        {
          text: '"Compared to a real best friend, the difference is that I can truly say anything to this toy."',
          attribution: 'Research participant · pre-scanned object session',
        },
        {
          text: '"In real life, people often buy toys because they can provide companionship and will never leave."',
          attribution: 'Research participant · general interview',
        },
      ],
      findings: [
        {
          label: 'Self-scanned object',
          text: '"She didn\'t realize it was AI." Full authorship created genuine connection — users brought existing trust to the conversation.',
        },
        {
          label: 'Pre-scanned, no authorship',
          text: '"Why an apple? It\'s cool, but I don\'t see a difference from any other AR companion." Without authorship, novelty wore off fast.',
        },
        {
          label: 'Key insight',
          text: 'What people need is active listening, validation, trust, and presence — not a chatbot. The object already has trust deposited. We give it a way to answer back.',
        },
        {
          label: 'Design principle',
          text: 'A relationship only forms when both sides have something at stake. The object must have needs — hunger, moods, a bond that grows or fades.',
        },
      ],
    },
    {
      number: '03',
      label: 'The Concept',
      heading: { lead: 'A soul for what', accent: 'you already love.' },
      body:
        'Photograph any object you love. It wakes up in AR, anchored in your space — with the exact personality you shaped for it.',
      conceptVideo: '/blockVid/blinkVid.mov',
      tags: [
        'AR object recognition',
        'Personality blend',
        'AI voice conversation',
        'Evolving bond',
        'Illustrated UI',
        'Prompt engineering',
      ],
    },
    {
      number: '04',
      label: 'Features',
      heading: { lead: 'Scan. Shape.', accent: 'Live with it.' },
      specs: [
        {
          label: '01 · Scan',
          value: 'Any object',
          detail: 'Photograph something you already love. It wakes up in AR, anchored in your space.',
        },
        {
          label: '02 · Shape',
          value: '9 personalities',
          detail: 'Blend two traits — shy, sassy, warm, humorous, diplomatic, and more. Name it. Decorate it.',
        },
        {
          label: '03 · Live with it',
          value: 'Grows over time',
          detail: 'Talk to it. Feed it. Watch a relationship form as your bond level deepens.',
        },
      ],
    },
    {
      number: '05',
      label: 'Prompt Design',
      heading: { lead: 'The AI that', accent: 'refuses to serve.' },
      body:
        'The hardest design problem wasn\'t the interface — it was the prompt. Standard AI responses kill connection. We built a framework that makes the object feel real.',
      details: [
        {
          label: 'Act, don\'t serve',
          value: 'Give the LLM a character sheet, not instructions. Never be helpful. Never say "you should."',
        },
        {
          label: 'Feel the body',
          value: 'Hunger becomes a hollow ache. Emotions become physical sensations — not descriptions of feelings.',
        },
        {
          label: 'Make them wait',
          value: 'Scarcity creates anticipation. Cooldown periods make the object feel rare — we miss what\'s gone.',
        },
        {
          label: 'Evolve over time',
          value: 'From guarded stranger to soulmate. Bond level changes the prompt — the relationship genuinely deepens.',
        },
      ],
      findings: [
        {
          label: 'Prompt assembly',
          text: 'Core identity + inner wiring + body state + bond level → behavior. All layers combine at session start.',
        },
        {
          label: 'Session lifecycle',
          text: 'Idle → waking → connecting → listening → speaking → sleeping → cooldown. The object has rhythms, not just responses.',
        },
        {
          label: 'Tech stack',
          text: 'Token fetch → LiveKit → AI agent → voice effect → AR object. Each pipeline layer designed to feel invisible.',
        },
        {
          label: 'Personality spectrum',
          text: 'Introvert: shy · warm · patient. Extrovert: energetic · optimistic · sassy. Rational: articulate · diplomatic · humorous.',
        },
      ],
    },
    {
      number: '06',
      label: 'Process',
      heading: { lead: 'What failed.', accent: 'What we learned.' },
      body:
        'Two major iterations taught us everything. The frog calendar. The talking apple. Both collapsed for the same reason: only one side was investing.',
      iterations: [
        {
          version: 'v1',
          title: 'Mood calendar',
          body: 'The user tracked moods and journaled growth. The object had nothing at stake — it never asked for anything in return. A mirror, not a relationship.',
        },
        {
          version: 'v2',
          title: 'Generic AR object',
          body: 'Objects came alive — and conversations died within minutes. Without authorship, every session felt like a tech demo.',
        },
        {
          version: 'v3',
          title: 'Your object',
          body: 'Users choose the object, name it, and shape its personality before hearing it speak. Authorship transformed a demo into a relationship.',
        },
      ],
    },
    {
      number: '07',
      label: 'Competitive Landscape',
      heading: { lead: 'Why everything else', accent: 'falls short.' },
      findings: [
        {
          label: 'Replika · Character.AI',
          text: 'Human-mimicking AI. The pretense breaks under pressure — and the friendship breaks with it.',
        },
        {
          label: 'Tamagotchi',
          text: 'Needy, but voiceless. You feed it and mourn it — but it can never tell you what it was thinking.',
        },
        {
          label: 'Anki Vector · Cozmo',
          text: 'Embodied and charming — but expensive, narrow, and shipped from a factory. It was never yours before it arrived.',
        },
        {
          label: 'Blink',
          text: 'Your object. Your trust, already deposited. We just give it a way to answer back.',
        },
      ],
    },
    {
      number: '08',
      label: 'Final Design',
      heading: { lead: 'The app.' },
      body:
        'A hand-illustrated, whimsical UI that feels like the world your Blink lives in — warm, layered, and alive. Visual language designed to lower the threshold for talking to an object.',
      hero: {
        src: '/case/gp.png',
        alt: 'Blink — final product in use',
        badge: 'Final product',
        caption: 'Illustrated AR companion — scan any object, shape its soul, watch a bond form',
      },
      slides: [
        { src: '/case/back.png', alt: 'Blink splash screen', caption: 'Splash & world' },
        { src: '/case/pers.png', alt: 'Blink personality selection', caption: 'Personality shape' },
        { src: '/case/liv.png', alt: 'Blink in AR', caption: 'Live AR companion' },
      ],
      galleryTitle: 'App screens',
      galleryDescription:
        'Onboarding, object scan, personality selection, decoration, live AR conversation, and the feeding ritual — each screen hand-illustrated as part of the same living world.',
      screens: [
        { src: '/case/onb.png', alt: 'Onboarding', caption: 'Onboarding' },
        { src: '/case/b1.png', alt: 'Scan object', caption: 'Scan object' },
        { src: '/case/pers.png', alt: 'Shape personality', caption: 'Shape personality' },
        { src: '/case/personality.png', alt: 'Decorate', caption: 'Decorate' },
        { src: '/case/liv.png', alt: 'Live conversation', caption: 'Live conversation' },
        { src: '/case/feed.png', alt: 'Feed your Blink', caption: 'Feed your Blink' },
      ],
    },
  ],

  'rock-on-raccoon': [
    {
      number: '01',
      label: 'The Problem',
      heading: { lead: 'Mobile rhythm games', accent: 'lose their soul.' },
      body:
        'Most mobile rhythm titles trade character and clarity for generic arcade visuals. Players on smaller screens struggle to read timing windows — and the charm that keeps them coming back disappears after the first session.',
      stats: [
        {
          value: '3 min',
          description: 'target session length for casual mobile play — every screen had to earn its place in a short loop.',
        },
        {
          value: 'Smaller screens',
          description: 'timing feedback that reads on a phone, not just a desktop mockup — hit windows and combo states had to survive thumb-scale layouts.',
        },
        {
          value: 'Generic UI',
          description: 'competitor audits showed personality sacrificed for reusable arcade chrome — an opening for character-led rhythm.',
        },
      ],
    },
    {
      number: '02',
      label: 'User Research',
      heading: { lead: 'Playtests before', accent: 'pixels.' },
      body:
        'Gameplay sessions and competitor audits shaped timing clarity and character-led feedback. We mapped failure states to encouraging copy — never punishing — and tuned touch targets for one-handed play.',
      details: [
        { label: 'Method', value: 'Gameplay sessions, competitor audits, and timing-readability tests on mobile' },
        { label: 'Participants', value: '10 casual mobile gamers across two playtest rounds' },
        { label: 'Focus question', value: 'Can players read hit windows and recover from misses without breaking flow?' },
        { label: 'Synthesis', value: 'Failure-state mapping → touch-target sizing → combo feedback hierarchy' },
      ],
      findings: [
        {
          label: 'Finding 01',
          text: 'Players missed beats when feedback was subtle or punishing — they needed immediate, expressive character reactions instead of abstract score drops.',
        },
        {
          label: 'Finding 02',
          text: 'Touch targets sized for desktop mockups failed on real devices. Increasing tap areas by 18% after round one improved completion rates.',
        },
        {
          label: 'Design principle',
          text: 'Timing clarity first. Personality second. Delight holds it together.',
        },
      ],
    },
    {
      number: '03',
      label: 'The Concept',
      heading: { lead: 'Character-led rhythm', accent: 'you can feel.' },
      body:
        'A mobile rhythm game built around expressive raccoon characters, readable hit windows, and tactile visual feedback — designed for quick sessions that still feel memorable.',
      conceptVideo: '/blockVid/rockMovie.mp4',
      tags: ['Mobile rhythm', 'Character reactions', 'Combo states', 'Touch-first UI', 'Timing clarity'],
    },
    {
      number: '04',
      label: 'Process',
      heading: { lead: 'Tuning timing,', accent: 'combo, and charm.' },
      body:
        'Character design, touch-first UI, level rhythm tuning, and feedback animation — built as a component library for hit windows, combo states, and miss recovery.',
      iterations: [
        {
          version: 'V1',
          title: 'Tight windows',
          problem: 'Hit timing felt precise on desktop but unreadable on phones during early playtests.',
          body: 'Initial windows prioritized accuracy over legibility — skilled players liked it; everyone else churned.',
        },
        {
          version: 'V2',
          title: 'Larger targets',
          improvement: 'Touch targets grew 18% and timing cues moved closer to the character.',
          remainingIssue: 'Combo feedback still felt flat — misses were clearer, but streaks lacked personality.',
          body: 'Readability improved, yet the game still felt like a template with a raccoon pasted on top.',
        },
        {
          version: 'V3',
          title: 'Character-led feedback',
          decision: 'Every hit, miss, and combo routes through expressive character animation.',
          result: 'Players understood timing faster and stayed for “one more song” in post-test interviews.',
          body: 'Visual language, combo states, and encouraging copy aligned into a cohesive game identity.',
        },
      ],
    },
    {
      number: '05',
      label: 'Final Design',
      heading: { lead: 'The game.' },
      body:
        'Playful art direction, bold timing cues, and a raccoon-led identity — shipped on the App Store with strong readability and memorable visual charm.',
      hero: {
        src: '/case/rockTitle.png',
        alt: 'Rock On, Raccoon! — title screen',
        badge: 'Shipped game',
        caption: 'Character-led rhythm UI with readable hit windows, combo feedback, and expressive reactions',
      },
      slides: [
        { src: '/case/rockBack.png', alt: 'Gameplay screen', caption: 'Gameplay' },
        { src: '/case/rockIpad.png', alt: 'Tablet layout exploration', caption: 'Tablet layout' },
        { src: '/case/rockSketch.png', alt: 'Early UI sketch', caption: 'Early sketch' },
      ],
      galleryTitle: 'Screens & explorations',
      galleryDescription:
        'Gameplay trail — character reactions, timing feedback, and combo states in motion.',
      screensVideo: '/blockVid/trail.mp4',
      screensVideoCaption: 'In-game UI flow — timing cues, combo feedback, and character reactions',
    },
  ],
};

export const CASE_STUDY_EXTRAS: Record<
  string,
  { reflection?: CaseStudyReflection; nextTeaser?: { direction: string; title: string; tagline: string } }
> = {
  'course-correct': {
    reflection: {
      label: 'What I learned',
      body:
        'Designing for an attention-constrained environment changed how I thought about interface density. Instead of asking how much information the interface could support, I began asking how little information the instructor needed at each moment.',
    },
    nextTeaser: {
      direction: 'Next case study',
      title: 'NEXT — talkIT',
      tagline: 'Turning real-world surroundings into conversational language practice.',
    },
  },
  'rock-on-raccoon': {
    reflection: {
      label: 'What I learned',
      body:
        'Game UI isn\'t just visual polish — it\'s timing communication. The breakthrough came when feedback stopped explaining mistakes and started expressing them through character, making every beat feel readable and rewarding on a phone.',
    },
  },
};

export function getCaseStudy(slug: string): CaseStudySection[] | undefined {
  return CASE_STUDIES[slug];
}

export function getCaseStudyExtras(slug: string) {
  return CASE_STUDY_EXTRAS[slug];
}

export function hasRichCaseStudy(slug: string): boolean {
  return slug in CASE_STUDIES;
}
