export const site = {
  identity: {
    name: 'Pebo', // TODO: replace with full name / display handle
    handle: 'pebo.codes',
    tagline: 'Builder, designer & creative developer', // short bio line under the name
    bio: '', // optional second line; leave '' to hide
    avatar: '', // TODO: add avatar image path (e.g. '/media/avatar.jpg'); falls back to monogram
    location: 'Available worldwide · Remote', // TODO: verify/replace (set '' to hide)
    joined: '', // TODO: set e.g. 'Here since 2024' (placeholder claim — left blank)
    // Small role badges shown under the name (guns.lol style). Decorative,
    // not verification. `variant: 'exclusive'` gives the highlighted accent badge.
    badges: [
      { icon: 'bolt', label: 'Exclusive', variant: 'exclusive' },
      { icon: 'code', label: 'Developer' },
      { icon: 'star', label: 'Creator' },
    ],
  },

  // ---- Customization (guns.lol: Basic + Advanced Customization, Custom Fonts) ----
  // Change the whole look from here. Applied as CSS variables at runtime.
  customization: {
    accent: '#a7c2e2', // single accent hue (sampled from the hero footage)
    fontDisplay: 'Sora', // headings/name — one of: Sora, Space Grotesk, Instrument Serif, Inter
    fontBody: 'Inter', // body text — Inter or Space Grotesk
  },

  // ---- Profile effects (guns.lol: Typewriter, Special Profile Effects) ----
  // All respect prefers-reduced-motion (disabled when the visitor asks for less).
  effects: {
    typewriter: true, // animate the tagline line
    tilt: true, // subtle 3D tilt of the card on pointer move (desktop)
    glow: true, // soft accent glow around the card
  },
  // Phrases cycled by the typewriter (first is also the no-JS/reduced-motion fallback).
  typewriter: [
    'Builder, designer & creative developer',
    'Crafting immersive web experiences',
    'Open to impactful collaborations',
  ],

  // ---- Metadata & SEO ----
  // Runtime sets <title>; full crawler SEO also lives in index.html (keep in sync).
  seo: {
    title: 'Pebo — pebo.codes',
  },
  // View counter. Disabled by default: with no backend it can only count this
  // device's visits (base + local count), which is not a real global figure.
  // TODO: set enabled:true only with a real counter endpoint, or accept the
  // seeded number as decorative.
  views: {
    enabled: false,
    base: 0,
  },
  // Icon-only social row (guns.lol style). Order = display order.
  // `icon` maps to an entry in Icon.jsx.
  social: [
    {
      id: 'prarambha',
      label: 'Prarambha',
      icon: 'globe',
      href: 'https://prarambha.xyz',
    },
    {
      id: 'parom',
      label: 'parom.studio',
      icon: 'studio',
      href: 'https://parom.studio',
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: 'github',
      href: 'https://github.com/your-handle', // TODO: replace
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: 'linkedin',
      href: 'https://www.linkedin.com/in/your-handle', // TODO: replace
    },
    {
      id: 'x',
      label: 'X',
      icon: 'x',
      href: 'https://x.com/your-handle', // TODO: replace
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: 'instagram',
      href: 'https://www.instagram.com/your-handle', // TODO: replace
    },
    {
      id: 'discord',
      label: 'Discord',
      icon: 'discord',
      href: 'https://discord.gg/your-invite', // TODO: replace with profile/invite
    },
  ],
  journey: {
    id: 'journey',
    title: 'Journey',
    intro:
      'A snapshot of where I have been and where I am headed. Replace this placeholder copy with your real milestones.',
    milestones: [
      { period: 'Now', text: 'Building and shipping focused digital experiences.' },
      { period: 'Recent', text: 'Exploring immersive web, product design, and creative engineering.' },
      { period: 'Next', text: 'Open to impactful collaborations and opportunities.' },
    ],
  },
  discord: {
    userId: '', // TODO: add Discord user ID for Lanyard presence
    lanyardBaseUrl: 'https://api.lanyard.rest/v1/users',
    enabled: true,
    pollIntervalMs: 30000,
  },
  media: {
    sources: [
      // Full-length (~3 min) H.264 1080p — universally supported, ~36MB.
      { src: '/media/hero.mp4', type: 'video/mp4' },
    ],
    poster: '/media/hero-poster.jpg',
    audioSrc: '/media/ambient-8d.mp3',
    audioOptional: true,
    reducedMotionRespect: true,
    track: {
      title: 'Ambient 8D',
      artist: 'pebo.codes',
      note: 'Best with headphones',
    },
    defaultVolume: 0.45,
  },
}
