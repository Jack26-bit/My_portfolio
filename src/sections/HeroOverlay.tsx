import { PROFILE } from '../data/content'

export function HeroOverlay() {
  return (
    <section className="section-station" id="hero" aria-label="Hero station">
      <div className="section-content" style={{ maxWidth: '640px' }}>
        {/* Station indicator */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            color: 'var(--accent)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span>STATION // 01</span>
          <span style={{ color: '#2d323f' }}>—</span>
          <span style={{ color: 'var(--text-muted)' }}>ORBITAL INSERTION</span>
        </div>

        {/* Name / Title */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '1.75rem',
            color: 'var(--text)',
          }}
        >
          {PROFILE.name}
        </h1>

        {/* Lead sentence from README */}
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            lineHeight: 1.5,
            color: 'var(--text)',
            marginBottom: '1.25rem',
            fontWeight: 400,
          }}
        >
          {PROFILE.tagline} I build end-to-end systems, from sensors and hardware to models and software, because I think hardware matters as much as software.
        </p>

        {/* Verbatim background from README */}
        <p
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
          }}
        >
          {PROFILE.bio}
        </p>

        {/* Roles telemetry row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.75rem',
            borderTop: '1px solid var(--border)',
            paddingTop: '1.5rem',
          }}
        >
          {PROFILE.roles.map((role) => (
            <div key={role} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-dim)',
                }}
              >
                ROLE
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                }}
              >
                {role}
              </span>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'var(--text-dim)',
              }}
            >
              LOCATION
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--text)',
              }}
            >
              {PROFILE.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
