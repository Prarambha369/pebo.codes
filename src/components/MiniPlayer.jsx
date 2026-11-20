import { useEffect, useState } from 'react'
import Icon from './Icon'

/**
 * Combined media bar:
 *  - Play/pause button controls the BACKGROUND VIDEO.
 *  - Mute + volume control the ambient AUDIO only.
 *  - No audio timeline / seek bar.
 */
export default function MiniPlayer({
  player,
  track,
  audioConfigured,
  videoControllable,
  videoPlaying,
  onToggleVideo,
}) {
  const { isPlaying, isMuted, volume, unavailable, volumeSupported, toggleMute, setVolume } = player

  const audioAvailable = audioConfigured && !unavailable

  // Entrance slide-in on next frame.
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (!videoControllable && !audioAvailable) return null

  const audioLive = audioAvailable && isPlaying && !isMuted
  const subText = !audioAvailable ? 'Audio unavailable' : isMuted ? 'Muted' : 'Now playing'

  return (
    <div
      className={`mini-player glass-panel ${shown ? 'mini-player--visible' : ''} ${
        videoControllable ? '' : 'mini-player--no-video'
      }`}
      role="region"
      aria-label="Media controls"
    >
      {videoControllable ? (
        <button
          type="button"
          className="mini-player__play"
          onClick={onToggleVideo}
          aria-label={videoPlaying ? 'Pause background video' : 'Play background video'}
        >
          <Icon name={videoPlaying ? 'pause' : 'play'} size={18} />
        </button>
      ) : null}

      <div className="mini-player__main">
        <div className="mini-player__top">
          <span className="mini-player__eq" data-playing={audioLive ? 'true' : 'false'} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <div className="mini-player__meta">
            <span className="mini-player__title">{track?.title || 'Ambient audio'}</span>
            <span className="mini-player__sub">
              <span className="mini-player__status">{subText}</span>
              {track?.artist ? (
                <>
                  <span className="mini-player__dot" aria-hidden="true">·</span>
                  <span className="mini-player__artist">{track.artist}</span>
                </>
              ) : null}
            </span>
          </div>
        </div>
      </div>

      {audioAvailable ? (
        <div className="mini-player__controls">
          <button
            type="button"
            className="mini-player__icon-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            aria-pressed={isMuted}
          >
            <Icon name={isMuted ? 'mute' : 'volume'} size={18} />
          </button>
          {volumeSupported ? (
            <input
              className="mini-player__volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{ '--value': `${(isMuted ? 0 : volume) * 100}%` }}
              aria-label="Volume"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
