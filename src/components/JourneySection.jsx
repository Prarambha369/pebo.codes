import GlassPanel from './GlassPanel'

export default function JourneySection({ journey }) {
  return (
    <section id={journey.id} className="journey-section">
      <GlassPanel className="journey-panel reveal" data-reveal>
        <span className="journey-kicker">The story</span>
        <h2 className="section-title journey-title">{journey.title}</h2>
        <p className="journey-intro">{journey.intro}</p>
        <ol className="journey-list">
          {journey.milestones.map((item, index) => (
            <li key={`${item.period}-${item.text}`} className="journey-item" style={{ '--i': index }}>
              <span className="journey-marker" aria-hidden="true">
                <span className="journey-node" />
              </span>
              <div className="journey-content">
                <span className="journey-period">{item.period}</span>
                <span className="journey-text">{item.text}</span>
              </div>
            </li>
          ))}
        </ol>
      </GlassPanel>
    </section>
  )
}
