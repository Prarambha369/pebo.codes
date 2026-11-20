// Inline SVG icon set — no external dependency. Each path inherits currentColor.
const PATHS = {
  studio: (
    <>
      <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
      <path d="M3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
    </>
  ),
  linkedin: (
    <>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
      <path d="M3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.3 4.76 5.3V21h-4v-5.3c0-1.26-.02-2.9-1.9-2.9-1.9 0-2.2 1.37-2.2 2.8V21H9z" />
    </>
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  x: (
    <path d="M17.5 3h3l-7.1 8.1L22 21h-6.4l-4.5-5.9L5.9 21H2.9l7.6-8.7L2.3 3h6.6l4.1 5.4L17.5 3Zm-1.1 16h1.7L7.7 4.8H5.9L16.4 19Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  discord: (
    <path d="M19.5 5.6A17 17 0 0 0 15.3 4.3l-.2.4a12.6 12.6 0 0 1 3.7 1.9 11.8 11.8 0 0 0-10-0 12.6 12.6 0 0 1 3.7-1.9l-.2-.4A17 17 0 0 0 4.5 5.6 17.6 17.6 0 0 0 1.5 17.4a17 17 0 0 0 5.2 2.6l.4-.6a11 11 0 0 1-1.8-.9l.4-.3a12.2 12.2 0 0 0 10.4 0l.4.3c-.57.34-1.17.64-1.8.9l.4.6a17 17 0 0 0 5.2-2.6 17.6 17.6 0 0 0-2.9-11.8ZM8.8 14.9c-1 0-1.9-.95-1.9-2.1s.86-2.1 1.9-2.1 1.93.96 1.9 2.1c0 1.15-.86 2.1-1.9 2.1Zm6.4 0c-1 0-1.9-.95-1.9-2.1s.86-2.1 1.9-2.1 1.93.96 1.9 2.1c0 1.15-.85 2.1-1.9 2.1Z" fill="currentColor" stroke="none" />
  ),
  journey: (
    <>
      <path d="M5 19V5M5 6h9l-1.5 3L14 12H5" />
      <circle cx="5" cy="19" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
    </>
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" fill="currentColor" stroke="none" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </>
  ),
  verified: (
    <>
      <path d="m12 2.6 2.3 1.7 2.85-.15.9 2.7 2.3 1.7-.9 2.75.9 2.75-2.3 1.7-.9 2.7-2.85-.15L12 21.4l-2.3-1.7-2.85.15-.9-2.7-2.3-1.7.9-2.75-.9-2.75 2.3-1.7.9-2.7 2.85.15Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  star: (
    <path d="m12 3 2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.15l5.9-.85L12 3Z" />
  ),
  code: (
    <>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
      <path d="m13.5 4-3 16" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  play: <path d="M7 4.5v15l12-7.5-12-7.5Z" fill="currentColor" stroke="none" />,
  pause: (
    <>
      <rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
    </>
  ),
  mute: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" />
      <path d="m16 9 5 6M21 9l-5 6" />
    </>
  ),
  spotify: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.75.75 0 0 1-1 .25c-2.8-1.7-6.3-2.1-10.4-1.16a.75.75 0 1 1-.33-1.46c4.5-1 8.4-.56 11.5 1.35.36.22.47.69.25 1.02Zm1.2-2.9a.94.94 0 0 1-1.28.3c-3.2-1.96-8.1-2.53-11.9-1.38a.94.94 0 1 1-.54-1.8c4.3-1.3 9.7-.66 13.4 1.6.44.27.58.85.3 1.28Zm.1-3c-3.8-2.26-10.2-2.47-13.8-1.37a1.12 1.12 0 1 1-.66-2.15c4.2-1.26 11.2-1.02 15.6 1.58a1.12 1.12 0 0 1-1.15 1.93Z" fill="currentColor" stroke="none" />
  ),
}

export default function Icon({ name, size = 20, className = '', strokeWidth = 1.7, ...props }) {
  const content = PATHS[name]
  if (!content) return null
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {content}
    </svg>
  )
}
