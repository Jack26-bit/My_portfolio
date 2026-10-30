import { RESEARCH } from '../data/content'

export function ResearchOverlay() {
  return (
    <section className="section-station" id="research" aria-label="Research station">
      <div className="section-content" style={{ maxWidth: '720px' }}>
        {/* Station indicator */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            color: 'var(--accent)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span>STATION // 02</span>
          <span style={{ color: '#2d323f' }}>—</span>
          <span style={{ color: 'var(--text-muted)' }}>PAYLOAD & RESEARCH</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '2.5rem',
            color: 'var(--text)',
          }}
        >
          What I'm working on
        </h2>

        {/* Research items grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {RESEARCH.map((item, idx) => (
            <div
              key={item.id}
              style={{
                borderLeft: '2px solid var(--border)',
                paddingLeft: '1.5rem',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent)',
                  marginBottom: '0.35rem',
                  letterSpacing: '0.05em',
                }}
              >
                {`[0${idx + 1}]`}
              </div>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  marginBottom: '0.75rem',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
