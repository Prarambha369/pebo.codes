import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Audio player state machine driven by the <audio> element's own events
 * rather than optimistic setState. This keeps the UI honest about what the
 * browser is actually doing (buffering, blocked autoplay, hard errors).
 *
 * Distinctions that matter:
 *  - A play() promise rejection => "blocked" (recoverable, show "tap to play").
 *  - The media `error` event    => "unavailable" (hard failure, hide controls).
 */
export function useAudioPlayer(audioRef, { defaultVolume = 0.5 } = {}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolumeState] = useState(defaultVolume)
  const [unavailable, setUnavailable] = useState(false)
  const [blocked, setBlocked] = useState(false)
  // Feature-detect volume control: iOS Safari ignores programmatic volume.
  const [volumeSupported, setVolumeSupported] = useState(true)
  const volumeProbed = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    const onPlay = () => {
      setIsPlaying(true)
      setBlocked(false)
    }
    const onPause = () => setIsPlaying(false)
    const onWaiting = () => setIsBuffering(true)
    const onPlaying = () => {
      setIsBuffering(false)
      setBlocked(false)
    }
    const onCanPlay = () => setIsBuffering(false)
    const onVolumeChange = () => {
      setIsMuted(audio.muted)
      setVolumeState(audio.volume)
    }
    const onError = () => setUnavailable(true)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('volumechange', onVolumeChange)
    audio.addEventListener('error', onError)

    // Sync initial element state.
    setIsMuted(audio.muted)
    setVolumeState(audio.volume || defaultVolume)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('volumechange', onVolumeChange)
      audio.removeEventListener('error', onError)
    }
  }, [audioRef, defaultVolume])

  const probeVolumeSupport = useCallback(() => {
    const audio = audioRef.current
    if (!audio || volumeProbed.current) return
    volumeProbed.current = true
    try {
      const prev = audio.volume
      const target = prev > 0.6 ? 0.4 : 0.8 // a value distinct from current
      audio.volume = target
      // If the browser clamps/ignores volume (iOS), it won't stick.
      if (Math.abs(audio.volume - target) > 0.01) {
        setVolumeSupported(false)
      }
      audio.volume = prev // restore the configured volume
    } catch {
      setVolumeSupported(false)
    }
  }, [audioRef])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      probeVolumeSupport()
      await audio.play()
      setBlocked(false)
      return true
    } catch {
      // Autoplay / gesture policy rejection — recoverable.
      setBlocked(true)
      return false
    }
  }, [audioRef, probeVolumeSupport])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (audio) audio.pause()
  }, [audioRef])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) play()
    else pause()
  }, [audioRef, play, pause])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
  }, [audioRef])

  const setVolume = useCallback(
    (value) => {
      const audio = audioRef.current
      if (!audio) return
      const clamped = Math.min(1, Math.max(0, value))
      audio.volume = clamped
      // Raising volume from zero implies an unmute intent.
      if (clamped > 0 && audio.muted) audio.muted = false
    },
    [audioRef],
  )

  return {
    isPlaying,
    isBuffering,
    isMuted,
    volume,
    unavailable,
    blocked,
    volumeSupported,
    play,
    pause,
    toggle,
    toggleMute,
    setVolume,
  }
}
