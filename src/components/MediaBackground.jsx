import { forwardRef } from 'react'

const MediaBackground = forwardRef(function MediaBackground(
  { sources = [], poster, reducedMotion, active, onError, onPlay, onPause },
  ref,
) {
  if (reducedMotion || !active) {
    return (
      <div className="media-bg media-bg--static" aria-hidden="true">
        {poster ? <img className="media-bg__poster" src={poster} alt="" /> : <div className="media-bg__fallback" />}
        <div className="media-bg__scrim" />
      </div>
    )
  }

  return (
    <div className="media-bg" aria-hidden="true">
      <video
        ref={ref}
        className="media-bg__video"
        poster={poster}
        preload="metadata"
        playsInline
        muted
        loop
        autoPlay
        onError={onError}
        onPlay={onPlay}
        onPause={onPause}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      <div className="media-bg__scrim" />
    </div>
  )
})

export default MediaBackground
