import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import DiscordStatus from './DiscordStatus'
import { useTypewriter } from '../hooks/useTypewriter'
import { useTilt } from '../hooks/useTilt'

function isExternal(href) {
  return /^https?:\/\//i.test(href)
}

// Client-side view counter: base + this device's visit count (no backend).
function useViewCount(cfg) {
  const [count, setCount] = useState(null)
  useEffect(() => {
    if (!cfg?.enabled) return
    const base = Number(cfg.base) || 0
    let visits = 1
    try {
      const prev = Number(window.localStorage.getItem('pebo_views')) || 0
      visits = prev + 1
      window.localStorage.setItem('pebo_views', String(visits))
    } catch {
      visits = 1
    }
    setCount(base + visits)
  }, [cfg])
  return count
}

export default function ProfileCard({ site }) {
  const { identity, social = [], views, effects = {}, typewriter = [] } = site
  const monogram = (identity.name || '?').trim().charAt(0).toUpperCase()
  const viewCount = useViewCount(views)

  const cardRef = useRef(null)
  useTilt(cardRef, { enabled: effects.tilt })

  const taglinePhrases = typewriter.length ? typewriter : identity.tagline ? [identity.tagline] : []
  const { text: typedTagline, animating } = useTypewriter(taglinePhrases, {
    enabled: effects.typewriter,
  })

  return (
    <section className="profile" aria-label="Profile">
      <div
        ref={cardRef}
        className={`profile-card glass-panel ${effects.glow ? 'profile-card--glow' : ''} ${
          effects.tilt ? 'profile-card--tilt' : ''
        }`}
      >
        <span className="profile-avatar">
          {identity.avatar ? (
            <img src={identity.avatar} alt={identity.name} />
          ) : (
            <span className="profile-monogram">{monogram}</span>
          )}
        </span>

        <h1 className="profile-name">{identity.name}</h1>

        {identity.badges?.length ? (
          <div className="profile-badges" aria-label="Badges">
            {identity.badges.map((b) => (
              <span
                className={`profile-badge ${b.variant === 'exclusive' ? 'profile-badge--exclusive' : ''}`}
                key={b.icon + b.label}
                title={b.label}
              >
                <Icon name={b.icon} size={15} />
              </span>
            ))}
          </div>
        ) : null}

        {taglinePhrases.length ? (
          <p className="profile-tagline">
            <span>{typedTagline}</span>
            {animating ? <span className="profile-caret" aria-hidden="true" /> : null}
          </p>
        ) : null}
        {identity.bio ? <p className="profile-bio">{identity.bio}</p> : null}

        <div className="profile-meta">
          {viewCount != null ? (
            <span className="profile-meta__item">
              <Icon name="eye" size={14} /> {viewCount.toLocaleString()} views
            </span>
          ) : null}
          {identity.location ? (
            <span className="profile-meta__item">
              <span className="profile-meta__dot" aria-hidden="true" />
              {identity.location}
            </span>
          ) : null}
          {identity.joined ? <span className="profile-meta__item">{identity.joined}</span> : null}
        </div>

        {social.length ? (
          <nav className="profile-socials" aria-label="Links">
            {social.map((link) => {
              const external = isExternal(link.href)
              return (
                <a
                  key={link.id}
                  className="profile-social"
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer noopener' : undefined}
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon name={link.icon} size={19} />
                </a>
              )
            })}
          </nav>
        ) : null}

        <DiscordStatus />
      </div>
    </section>
  )
}
