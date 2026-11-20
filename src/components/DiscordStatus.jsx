import GlassPanel from './GlassPanel'
import Icon from './Icon'
import { useDiscordPresence } from '../hooks/useDiscordPresence'

function statusLabel(status) {
  switch (status) {
    case 'online':
      return 'Online'
    case 'idle':
      return 'Idle'
    case 'dnd':
      return 'Do Not Disturb'
    case 'offline':
      return 'Offline'
    case 'loading':
      return 'Loading presence…'
    case 'unconfigured':
      return 'Presence not configured'
    case 'error':
      return 'Presence unavailable'
    default:
      return 'Status unknown'
  }
}

export default function DiscordStatus() {
  const { status, data, error } = useDiscordPresence()

  // Nothing to show to visitors when presence isn't configured.
  if (status === 'unconfigured') return null

  const user = data?.discord_user
  const spotify = data?.listening_to_spotify ? data.spotify : null
  const activity = data?.activities?.find((a) => a.type !== 4 && a.type !== 2) || null
  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=80`
    : null
  const isLive = ['online', 'idle', 'dnd', 'offline'].includes(status)

  return (
    <GlassPanel className="discord-status" aria-live="polite">
      <div className="discord-status__header">
        <span className="discord-status__title">
          <Icon name="discord" size={16} /> Live presence
        </span>
        <span className={`discord-chip discord-chip--${status}`}>
          <span className={`discord-dot discord-dot--${status}`} aria-hidden="true" />
          {statusLabel(status)}
        </span>
      </div>

      <div className="discord-status__body">
        {isLive && user ? (
          <div className="discord-status__profile">
            <span className={`discord-status__avatar-wrap discord-status__avatar-wrap--${status}`}>
              {avatarUrl ? (
                <img className="discord-status__avatar" src={avatarUrl} alt="" />
              ) : (
                <span className="discord-status__avatar discord-status__avatar--empty" aria-hidden="true" />
              )}
            </span>
            <div>
              <p className="discord-status__user">
                {user.global_name || user.username}
                {user.discriminator && user.discriminator !== '0' ? `#${user.discriminator}` : ''}
              </p>
              {activity ? (
                <p className="discord-status__activity">
                  {activity.name}
                  {activity.details ? ` — ${activity.details}` : ''}
                </p>
              ) : (
                <p className="discord-status__activity discord-status__activity--muted">
                  {statusLabel(status)}
                </p>
              )}
            </div>
          </div>
        ) : null}

        {spotify ? (
          <div className="discord-spotify">
            {spotify.album_art_url ? (
              <img className="discord-spotify__art" src={spotify.album_art_url} alt="" />
            ) : null}
            <div className="discord-spotify__meta">
              <span className="discord-spotify__badge">
                <Icon name="spotify" size={13} /> Listening on Spotify
              </span>
              <span className="discord-spotify__song">{spotify.song}</span>
              <span className="discord-spotify__artist">by {spotify.artist}</span>
            </div>
          </div>
        ) : null}

        {status === 'loading' ? <p className="discord-status__meta">Fetching live status…</p> : null}
        {status === 'error' && error ? <p className="discord-status__meta">{error}</p> : null}
      </div>
    </GlassPanel>
  )
}
