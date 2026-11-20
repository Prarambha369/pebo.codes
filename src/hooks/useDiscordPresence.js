import { useEffect, useState } from 'react'
import { site } from '../config/site'

const initialState = {
  status: 'idle', // idle | loading | online | idle-dnd-offline | offline | unconfigured | error
  data: null,
  error: null,
}

export function useDiscordPresence() {
  const { discord } = site
  const [state, setState] = useState(() => {
    if (!discord.enabled || !discord.userId) {
      return { status: 'unconfigured', data: null, error: null }
    }
    return initialState
  })

  useEffect(() => {
    if (!discord.enabled || !discord.userId) {
      setState({ status: 'unconfigured', data: null, error: null })
      return undefined
    }

    let cancelled = false
    let timerId

    const fetchPresence = async () => {
      setState((prev) => (prev.status === 'idle' ? { ...prev, status: 'loading' } : prev))
      try {
        const res = await fetch(`${discord.lanyardBaseUrl}/${discord.userId}`, {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) {
          throw new Error(`Lanyard request failed (${res.status})`)
        }
        const json = await res.json()
        if (!json.success) {
          throw new Error(json.error?.message || 'Presence unavailable')
        }
        if (cancelled) return
        const data = json.data
        setState({
          status: data?.discord_status || (data?.listening_to_spotify ? 'online' : 'offline'),
          data,
          error: null,
        })
      } catch (err) {
        if (cancelled) return
        setState({ status: 'error', data: null, error: err.message || 'Failed to load presence' })
      }
    }

    fetchPresence()
    if (discord.pollIntervalMs > 0) {
      timerId = window.setInterval(fetchPresence, discord.pollIntervalMs)
    }

    return () => {
      cancelled = true
      if (timerId) window.clearInterval(timerId)
    }
  }, [discord.enabled, discord.userId, discord.lanyardBaseUrl, discord.pollIntervalMs])

  return state
}
