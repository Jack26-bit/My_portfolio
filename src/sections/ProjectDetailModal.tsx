import { useEffect, useRef } from 'react'
import { Project } from '../data/content'

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    // Prevent body scroll behind modal
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        style={{
          backgroundColor: '#101217',
          border: '1px solid #1d2028',
          maxWidth: '560px',
          width: '100%',
          padding: '2.5rem',
          borderRadius: '2px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Telemetry */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--accent)',
              letterSpacing: '0.08em',
            }}
          >
            SYSTEM SPECIFICATION // {project.id.toUpperCase()}
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
            }}
            aria-label="Close project modal"
          >
            [ESC / CLOSE]
          </button>
        </div>

        {/* Title */}
        <h3
          id="modal-project-title"
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: 'var(--text)',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {/* Verbatim Description from README */}
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            marginBottom: '2rem',
          }}
        >
          {project.description}
        </p>

        {/* Stack section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              color: 'var(--text-dim)',
              marginBottom: '0.75rem',
            }}
          >
            TECHNOLOGY STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.stack.map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link (if repository or live link present) */}
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.85rem 1.5rem',
              backgroundColor: 'var(--accent)',
              color: '#090a0d',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              borderRadius: '2px',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <span>OPEN PROJECT SOURCE</span>
            <span>→</span>
          </a>
        ) : (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-dim)',
              textAlign: 'center',
            }}
          >
            INTERNAL PROTOTYPE // ACCESS RESTRICTED
          </div>
        )}
      </div>
    </div>
  )
}
