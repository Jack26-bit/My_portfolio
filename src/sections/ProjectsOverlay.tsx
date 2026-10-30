import { PROJECTS, Project } from '../data/content'

interface ProjectsOverlayProps {
  onSelectProject: (project: Project) => void
}

export function ProjectsOverlay({ onSelectProject }: ProjectsOverlayProps) {
  return (
    <section className="section-station" id="projects" aria-label="Projects station">
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
          <span>STATION // 03</span>
          <span style={{ color: '#2d323f' }}>—</span>
          <span style={{ color: 'var(--text-muted)' }}>SYSTEMS & SOFTWARE</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Projects
          </h2>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-dim)',
            }}
          >
            CLICK 3D PLANE OR CARDS TO INSPECT
          </span>
        </div>

        {/* Project card table / grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {PROJECTS.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => onSelectProject(project)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                padding: '1.5rem',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.2s ease, transform 0.2s ease, background 0.2s ease',
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
              <div>
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
                      fontSize: '0.7rem',
                      color: 'var(--accent)',
                    }}
                  >
                    {`[0${idx + 1}]`}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-dim)',
                    }}
                  >
                    SYSTEM PAYLOAD
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    color: 'var(--text-muted)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {project.description}
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1rem',
                  }}
                >
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-muted)',
                        borderRadius: '2px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>SPECIFICATION</span>
                  <span style={{ color: 'var(--accent)' }}>→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
