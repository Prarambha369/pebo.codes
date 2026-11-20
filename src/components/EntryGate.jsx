import Icon from './Icon'

export default function EntryGate({ onEnter, leaving, onExited, site, audioConfigured }) {
  const name = site?.identity?.handle || 'pebo.codes'

  const handleAnimationEnd = (event) => {
    // Only react to the overlay's own leave animation, not inner shimmer loops.
    if (leaving && event.target === event.currentTarget) onExited?.()
  }

  return (
    <button
      type="button"
      className={`entry-gate ${leaving ? 'entry-gate--leaving' : ''}`}
      onClick={onEnter}
      onAnimationEnd={handleAnimationEnd}
      aria-label="Enter site"
    >
      <div className="entry-gate__inner">
        <div className="entry-gate__card glass-panel">
          <p className="entry-gate__eyebrow">{name}</p>
          <h1 className="entry-gate__title">{site?.identity?.name || 'Welcome'}</h1>
          <p className="entry-gate__hint">
            {audioConfigured ? 'Tap to enter, with sound.' : 'Tap to enter.'}
          </p>
          <span className="entry-gate__cta" aria-hidden="true">
            <Icon name="play" size={15} />
            Enter
          </span>
          {audioConfigured ? (
            <p className="entry-gate__sound" aria-hidden="true">
              <Icon name="volume" size={13} /> best with headphones
            </p>
          ) : null}
        </div>
      </div>
    </button>
  )
}
