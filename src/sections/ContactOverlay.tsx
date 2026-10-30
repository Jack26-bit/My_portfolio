import { PROFILE } from '../data/content'

export function ContactOverlay() {
  return (
    <section className="section-station" id="contact" aria-label="Contact station">
      <div className="section-content" style={{ maxWidth: '640px', width: '100%' }}>
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
          <span>STATION // 05</span>
          <span style={{ color: '#2d323f' }}>—</span>
          <span style={{ color: 'var(--text-muted)' }}>DOWNLINK & CONTACT</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            color: 'var(--text)',
          }}
        >
          Get in touch
        </h2>

        {/* Looking for statement from README */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderLeft: '2px solid var(--accent)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
            borderRadius: '0 2px 2px 0',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              marginBottom: '0.4rem',
            }}
          >
            CURRENT FOCUS
          </div>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.5,
              color: 'var(--text)',
            }}
          >
            {PROFILE.seeking}
          </p>
        </div>

        {/* Links list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          <a
            href={`mailto:${PROFILE.email}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              borderRadius: '2px',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.background = 'var(--bg-surface-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'var(--bg-surface)'
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>EMAIL</span>
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{PROFILE.email}</span>
            <span style={{ color: 'var(--accent)' }}>→</span>
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              borderRadius: '2px',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.background = 'var(--bg-surface-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'var(--bg-surface)'
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>LINKEDIN</span>
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>neeraj-kiran-janakula</span>
            <span style={{ color: 'var(--accent)' }}>→</span>
          </a>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              borderRadius: '2px',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.background = 'var(--bg-surface-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'var(--bg-surface)'
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>GITHUB</span>
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>Jack26-bit</span>
            <span style={{ color: 'var(--accent)' }}>→</span>
          </a>
        </div>

        {/* Minimal terminal signature footer */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
            borderTop: '1px solid var(--border)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <span>BENGALURU, INDIA // REVA UNIVERSITY</span>
          <span>ORBITAL TELEMETRY SECURED</span>
        </div>
      </div>
    </section>
  )
}
