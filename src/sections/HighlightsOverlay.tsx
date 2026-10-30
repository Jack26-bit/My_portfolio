import { HIGHLIGHTS, SKILLS } from '../data/content'

export function HighlightsOverlay() {
  return (
    <section className="section-station" id="highlights" aria-label="Highlights station">
      <div className="section-content" style={{ maxWidth: '840px', width: '100%' }}>
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
          <span>STATION // 04</span>
          <span style={{ color: '#2d323f' }}>—</span>
          <span style={{ color: 'var(--text-muted)' }}>MISSION HIGHLIGHTS & CAPABILITIES</span>
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
          Highlights
        </h2>

        {/* Highlights List */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem',
          }}
        >
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                padding: '1.5rem',
                borderRadius: '2px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-dim)',
                  }}
                >
                  VERIFIED
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  marginBottom: '0.5rem',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  color: 'var(--text-muted)',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Capabilities Matrix from README */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '2.5rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--text-dim)',
              marginBottom: '1.5rem',
            }}
          >
            TECHNICAL CAPABILITIES
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.75rem',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text)',
                  marginBottom: '0.65rem',
                }}
              >
                Languages
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {SKILLS.languages.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '2px',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text)',
                  marginBottom: '0.65rem',
                }}
              >
                ML & Computer Vision
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {SKILLS.ml.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '2px',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text)',
                  marginBottom: '0.65rem',
                }}
              >
                Hardware & Cloud
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {SKILLS.hardware.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '2px',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text)',
                  marginBottom: '0.65rem',
                }}
              >
                Domains
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {SKILLS.domains.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '2px',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
