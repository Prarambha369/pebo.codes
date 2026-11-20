import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import EntryGate from './components/EntryGate'
import ProfileCard from './components/ProfileCard'
import JourneySection from './components/JourneySection'
import MediaBackground from './components/MediaBackground'
import MiniPlayer from './components/MiniPlayer'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { useScrollReveal } from './hooks/useScrollReveal'
import { site } from './config/site'

function usePrefersReducedMotion(enabled) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    if (mq.addEventListener) mq.addEventListener('change', update)
    else mq.addListener(update)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update)
      else mq.removeListener(update)
    }
  }, [enabled])

  return enabled ? reduced : false
}

function App() {
  const [entered, setEntered] = useState(false)
  // Gate lifecycle: 'open' -> 'leaving' -> 'closed' (unmounted).
  const [gatePhase, setGatePhase] = useState('open')
  const [mediaActive, setMediaActive] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(true)
  const videoRef = useRef(null)
  const audioRef = useRef(null)

  const prefersReducedMotion = usePrefersReducedMotion(site.media.reducedMotionRespect)
  const player = useAudioPlayer(audioRef, { defaultVolume: site.media.defaultVolume })
  useScrollReveal(entered)

  // Apply config-driven customization (accent + fonts) and SEO title.
  useEffect(() => {
    const root = document.documentElement
    const c = site.customization || {}
    const fallbackDisplay = "ui-sans-serif, system-ui, sans-serif"
    const fallbackBody = "Inter, ui-sans-serif, system-ui, sans-serif"
    if (c.accent) {
      root.style.setProperty('--accent', c.accent)
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c.accent)
      if (m) {
        const [r, g, b] = [m[1], m[2], m[3]].map((h) => parseInt(h, 16))
        root.style.setProperty('--accent-dim', `rgba(${r}, ${g}, ${b}, 0.14)`)
      }
    }
    if (c.fontDisplay) root.style.setProperty('--font-display', `'${c.fontDisplay}', ${fallbackDisplay}`)
    if (c.fontBody) root.style.setProperty('--font-body', `'${c.fontBody}', ${fallbackBody}`)
    if (site.seo?.title) document.title = site.seo.title
  }, [])

  const showMotionVideo = mediaActive && !prefersReducedMotion && !videoError
  const audioConfigured = Boolean(site.media.audioSrc && site.media.audioOptional)

  // Resolve media URLs against Vite's base so they work under /pebo.codes/ on
  // GitHub Pages as well as at the dev root.
  const mediaUrl = (p) => import.meta.env.BASE_URL + String(p || '').replace(/^\//, '')
  const resolvedSources = site.media.sources.map((s) => ({ ...s, src: mediaUrl(s.src) }))
  const resolvedPoster = mediaUrl(site.media.poster)
  const resolvedAudio = mediaUrl(site.media.audioSrc)

  const closeGate = useCallback(() => setGatePhase('closed'), [])

  const handleEnter = useCallback(() => {
    if (entered) return
    setEntered(true)
    setMediaActive(true)
    setVideoError(false)

    // Gate exit: instant under reduced motion, else let the animation run and
    // unmount on animationend (with a timeout fallback below).
    setGatePhase(prefersReducedMotion ? 'closed' : 'leaving')

    // Ambient audio is an enhancement started by this gesture. It is NOT tied
    // to motion preference — a reduced-motion user may still want sound.
    if (audioConfigured) {
      const audio = audioRef.current
      if (audio) {
        audio.volume = site.media.defaultVolume ?? 0.5
        player.play() // ref exists now; failure is handled as "blocked", not fatal
      }
    }
  }, [entered, prefersReducedMotion, audioConfigured, player])

  // The player's play/pause button controls the BACKGROUND VIDEO (audio is
  // controlled only by the mute/volume controls).
  const handleToggleVideo = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }, [])

  // Fallback: if animationend never fires, force the gate closed.
  useEffect(() => {
    if (gatePhase !== 'leaving') return undefined
    const id = window.setTimeout(closeGate, 900)
    return () => window.clearTimeout(id)
  }, [gatePhase, closeGate])

  const mainInert = entered ? undefined : ''

  return (
    <div className={`app-shell ${entered ? 'app-shell--entered' : ''}`}>
      <MediaBackground
        ref={videoRef}
        sources={resolvedSources}
        poster={resolvedPoster}
        reducedMotion={prefersReducedMotion}
        active={showMotionVideo}
        onError={() => setVideoError(true)}
        onPlay={() => setVideoPlaying(true)}
        onPause={() => setVideoPlaying(false)}
      />

      {/* Always mounted so the ref exists at the moment of the enter gesture. */}
      {audioConfigured ? (
        <audio ref={audioRef} src={resolvedAudio} preload="none" loop />
      ) : null}

      {gatePhase !== 'closed' ? (
        <EntryGate
          onEnter={handleEnter}
          leaving={gatePhase === 'leaving'}
          onExited={closeGate}
          site={site}
          audioConfigured={audioConfigured}
        />
      ) : null}

      <main
        className={`site-main ${entered ? 'site-main--visible' : ''}`}
        inert={mainInert}
      >
        <ProfileCard site={site} />
        <JourneySection journey={site.journey} />
        <footer className="site-footer">
          <p>
            © {new Date().getFullYear()} {site.identity.name}. Links and presence update gracefully if
            services are unavailable.
          </p>
        </footer>
      </main>

      {entered && (audioConfigured || showMotionVideo) ? (
        <MiniPlayer
          audioRef={audioRef}
          player={player}
          track={site.media.track}
          audioConfigured={audioConfigured}
          videoControllable={showMotionVideo}
          videoPlaying={videoPlaying}
          onToggleVideo={handleToggleVideo}
        />
      ) : null}
    </div>
  )
}

export default App
