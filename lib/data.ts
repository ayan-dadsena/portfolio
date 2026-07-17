export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/ayandadsena',
  instagram: 'https://www.instagram.com/ayan_dadsena',
  medium: 'https://medium.com/@ayan.dadsena',
  email: 'ayan.dadsena@gmail.com',
  resume: '/resume.pdf',
}

export const NAV_ITEMS = [
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Experience', href: '/#experience', id: 'experience' },
  { label: 'Projects', href: '/#projects', id: 'projects' },
  { label: 'Writing', href: '/#writing', id: 'writing' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
]

export const HERO = {
  disciplines: ['STRATEGY', 'FINANCE', 'ENTREPRENEURSHIP', 'INNOVATION', 'DESIGN'],
  subhead: "Finance @ UT Austin McCombs '29",
}

export const ABOUT = {
  eyebrow: '01 - GET TO KNOW ME',
  title: "I've always been drawn to building things.",
  paragraphs: [
    'Growing up as an only child with sickle cell disease meant I spent a lot of time alone creating, whether it was through visual art, cardboard inventions, or iMovie trailers. Later in middle school, I learned about the world of investing and entrepreneurship, where my passion for building evolved into an online art & clothing store, a sneaker brand, and a copywriting business. None of them took off, but each taught me that great ideas need strong execution.',
    "Right now that means studying finance at the McCombs School of Business while picking up programming and computation on the side. The more I learn about how markets allocate capital and how thoughtfully designed products can address real-world issues, the more I see business as a tool to create opportunity and improve people's lives — the same way my art helped me connect with others.",
    "My background in art taught me to iterate relentlessly, embrace feedback, and care deeply about the details that make experiences feel human. So whether I'm building financial models, developing products, or thinking through business strategy, I aim to combine analytical thinking with creative perspective.",
  ],
  closer:
    "The tools and industries may change, but what won't is my curiosity to learn, create, and turn ideas into reality.",
}

export interface Role {
  dates: string
  title: string
  description: string[]
  skills: string
  location: string
}

export interface ExperienceEntry {
  slug: string
  name: string
  blurb: string
  site: string
  positions: string[]
  image: string
  imageAlt: string
  logoFit: 'cover' | 'contain'
  roles: Role[]
  gallery: { src: string; alt: string }[]
}

export const EXPERIENCES: ExperienceEntry[] = [
  {
    slug: 'fadmoor',
    name: 'Fadmoor',
    blurb:
      'Fadmoor is a consulting firm that helps organizations improve financial and operational planning through enterprise planning platforms such as Pigment, Anaplan, Cube, and EAConnect.',
    site: 'https://www.fadmoor.com',
    positions: ['Sales And Marketing Intern', 'Pigment Model Builder'],
    image: '/images/fadmoor-logo.jpg',
    imageAlt: 'Fadmoor logo',
    logoFit: 'cover',
    roles: [
      {
        dates: 'MAY 2026 - PRESENT',
        title: 'Sales And Marketing Intern',
        description: [
          "I supported Fadmoor's business development efforts by researching new markets, identifying prospective clients, conducting sales calls to finance and executive leaders, and creating client-facing marketing materials. From building lead generation workflows to supporting sales campaigns on tools such as ZoomInfo and Instantly, I gained firsthand experience with how consulting firms communicate value and develop relationships with enterprise customers.",
        ],
        skills:
          'Prospect research, market segmentation, CRM and outreach strategy, market entry research, copywriting, sales collateral design (one-pagers, call scripts), email campaign strategy, strategic communication, cross-functional collaboration',
        location: 'Remote',
      },
      {
        dates: 'JULY 2024 - MAY 2025',
        title: 'Pigment Model Builder',
        description: [
          'I worked in Pigment, an enterprise business planning platform, to build and automate integrated planning models for real client engagements: modeling FP&A and workforce data for a Mexico-based fintech company by migrating their messy Excel financial data into a single planning environment. I also explored how to forecast supply needs across 1,500+ SKUs using demand planning and ABC/XYZ analysis.',
        ],
        skills:
          'Pigment (ERP software), workforce planning modeling, demand planning, dashboard design, process documentation, data automation, cross-department reporting, supply chain fundamentals, analytical thinking, problem solving',
        location: 'Dallas, TX',
      },
    ],
    gallery: [
      { src: '/images/fadmoor-logo.jpg', alt: 'Fadmoor' },
      { src: '/images/zoominfo.webp', alt: 'ZoomInfo sales workflow' },
      { src: '/images/pigment-planning.webp', alt: 'Workforce planning in Pigment' },
    ],
  },
  {
    slug: 'texas-convergent',
    name: 'Texas Convergent',
    blurb:
      "Texas Convergent is UT Austin's largest interdisciplinary tech organization, where students build products at the intersection of business, technology, and design.",
    site: 'https://txconvergent.org',
    positions: ['Product Chair', 'Co-founder - HomeGrown'],
    image: '/images/convergent-logo.png',
    imageAlt: 'Texas Convergent logo',
    logoFit: 'cover',
    roles: [
      {
        dates: 'JUNE 2026 - PRESENT',
        title: 'Product Chair',
        description: [
          "I work at the organizational level, shaping the curriculum and driving planning on the product side of how the organization operates and grows. I've recently worked on designing a spec-driven development curriculum and multidisciplinary workshops that aim to teach members how to build innovative solutions at the intersection of business, technology, and design.",
        ],
        skills:
          'Curriculum design, product road-mapping, org-level planning, workshop facilitation, stakeholder communication, leadership, organizational thinking, cross-team coordination, prioritization, mentorship, structured problem-solving',
        location: 'Austin, TX',
      },
      {
        dates: 'JAN 2026 - PRESENT',
        title: 'Co-founder - HomeGrown (Incubator Program)',
        description: [
          "As part of Texas Convergent's startup incubator, I co-founded HomeGrown, a hyperlocal marketplace connecting Austin-area farmers with local consumers.",
          'Working closely with my team, I helped define our target customer, refine our value proposition, and validate the opportunity through customer discovery interviews at local farmers markets. We are working on onboarding more than 15 vendors and early users while iterating on our go-to-market strategy and business model.',
          "I prioritized features, mapped user journeys, and designed high-fidelity wireframes in Figma to guide the platform's development. I also contributed to our branding, social media launch strategy, and investor-ready pitch as we prepared for an initial pilot.",
          'Follow @myhomegrown on Instagram!',
        ],
        skills:
          'Product strategy, user research, wireframing, pitch deck design, go-to-market strategy, marketing website design and development, UI/UX design, entrepreneurial thinking, storytelling, founder mindset, end-to-end ownership',
        location: 'Austin, TX',
      },
    ],
    gallery: [
      { src: '/images/convergent-logo.png', alt: 'Texas Convergent' },
      { src: '/images/convergent-1.jpg', alt: 'Texas Convergent build day' },
      { src: '/images/homegrown-pitch.png', alt: 'HomeGrown incubator pitch deck' },
      { src: '/images/convergent-2.jpg', alt: 'Presenting at Texas Convergent' },
    ],
  },
]

export const WRITING = {
  eyebrow: '04 - WRITING',
  diary: 'MY DIARY ON UNDERSTANDING THE WORLD',
  articles: [
    {
      date: 'JUNE 3, 2020',
      title: 'SpaceX will be launching 60 Starlink satellites into orbit',
      href: 'https://medium.com/@ayan.dadsena',
    },
  ],
  press: [
    {
      source: 'COPPELL ISD',
      title: 'Artwork by 2 CHS students chosen for national showcase',
      description:
        'Featured for artwork selected to represent in a national art showcase, recognizing student artists from Coppell High School.',
      href: 'https://www.coppellisd.com/o/chs9/article/2121242',
    },
    {
      source: 'INSTAGRAM',
      title: 'Raising awareness for sickle cell through art',
      description:
        "This Instagram reel discusses my artistic and personal journey dealing with Sickle Cell Anemia, as I hope to raise awareness through t-shirt sales in collaboration with Children's Medical Center.",
      href: 'https://www.instagram.com/reel/DAg56NiyHn2/?igsh=MWw1NHNyb2YxNDdnaw==',
    },
    {
      source: 'THE SIDEKICK - COPPELL STUDENT MEDIA',
      title: 'Dadsena using canvases as a muse of meaning',
      description:
        'Featured in The Sidekick, I shared my artistic journey from childhood scribbles to award-winning pieces showcased in state competitions and museum exhibitions.',
      href: 'https://coppellstudentmedia.com/127504/entertainment/sketching-the-scribbles-to-self-expression/',
    },
  ],
}
