import { PROFILE, RESEARCH, PROJECTS, HIGHLIGHTS, SKILLS, Project } from '../data/content'

interface StaticFallbackProps {
  onSelectProject: (project: Project) => void
  onEnable3D: () => void
}

/**
 * StaticFallback
 * Serves devices without WebGL support, users with `prefers-reduced-motion`,
 * or anyone who opts into the lightweight static experience.
 * Delivers 100% of the same verbatim content with zero 3D overhead.
 */
export function StaticFallback({ onSelectProject, onEnable3D }: StaticFallbackProps) {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '5rem 2rem 6rem' }}>
      {/* Notice header */}
      <div
        style={{
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)',
          padding: '1rem 1.5rem',
          marginBottom: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          borderRadius: '2px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          RUNNING IN STATIC MODE // OPTIMIZED FOR LOW LATENCY & REDUCED MOTION
        </span>
        <button
          onClick={onEnable3D}
          style={{
            background: 'none',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            padding: '0.35rem 0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
        >
          SWITCH TO 3D ORBIT SCENE →
        </button>
      </div>

      {/* Hero Section */}
      <section style={{ marginBottom: '6rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            marginBottom: '1rem',
            letterSpacing: '0.1em',
          }}
        >
          01 // ORBITAL PROFILE
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}
        >
          {PROFILE.name}
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.5,
            color: 'var(--text)',
            marginBottom: '1.25rem',
          }}
        >
          {PROFILE.tagline} I build end-to-end systems, from sensors and hardware to models and software, because I think hardware matters as much as software.
        </p>
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            marginBottom: '2rem',
          }}
        >
          {PROFILE.bio}
        </p>
      </section>

      {/* Research Section */}
      <section style={{ marginBottom: '6rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            marginBottom: '1rem',
            letterSpacing: '0.1em',
          }}
        >
          02 // WHAT I'M WORKING ON
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>
          Space Weather & NavIC Research
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {RESEARCH.map((item, idx) => (
            <div
              key={item.id}
              style={{
                borderLeft: '2px solid var(--border)',
                paddingLeft: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  marginBottom: '0.25rem',
                }}
              >
                {`[0${idx + 1}]`}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section style={{ marginBottom: '6rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            marginBottom: '1rem',
            letterSpacing: '0.1em',
          }}
        >
          03 // PROJECTS
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Projects</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                padding: '1.75rem',
                borderRadius: '2px',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {proj.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {proj.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {proj.stack.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      color: 'var(--text-muted)',
                      borderRadius: '2px',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => onSelectProject(proj)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  VIEW SPECIFICATION →
                </button>
                {proj.href && (
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      textDecoration: 'none',
                    }}
                  >
                    REPOSITORY
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section style={{ marginBottom: '6rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            marginBottom: '1rem',
            letterSpacing: '0.1em',
          }}
        >
          04 // HIGHLIGHTS & CAPABILITIES
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Highlights</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                padding: '1.5rem',
                borderRadius: '2px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                {h.label}
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {h.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {h.description}
              </p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Skills</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text)', marginBottom: '0.75rem' }}>Languages</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {SKILLS.languages.map(s => <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '0.2rem 0.5rem' }}>{s}</span>)}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text)', marginBottom: '0.75rem' }}>ML & CV</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {SKILLS.ml.map(s => <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '0.2rem 0.5rem' }}>{s}</span>)}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text)', marginBottom: '0.75rem' }}>Hardware & Cloud</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {SKILLS.hardware.map(s => <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '0.2rem 0.5rem' }}>{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            marginBottom: '1rem',
            letterSpacing: '0.1em',
          }}
        >
          05 // GET IN TOUCH
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Get in touch</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{PROFILE.seeking}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a
            href={`mailto:${PROFILE.email}`}
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>EMAIL</span>
            <span>{PROFILE.email}</span>
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>LINKEDIN</span>
            <span>neeraj-kiran-janakula</span>
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>GITHUB</span>
            <span>Jack26-bit</span>
          </a>
        </div>
      </section>
    </div>
  )
}
