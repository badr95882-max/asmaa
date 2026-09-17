import { useState, useRef, useEffect, useCallback } from 'react'
import ParticlesBg from './ParticlesBg'
import './LockScreen.css'

// Valid birthday representations for Asmaa (20/09/2004)
const VALID_NORMALIZED = new Set([
  '20092004',
  '2092004',
  '20040920',
  '2004920',
])

function normalizeBirthday(str) {
  if (!str) return ''
  // 1. Convert Arabic-Indic digits (٠-٩) to standard (0-9)
  const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']
  let s = str.trim()
  arabicDigits.forEach((d, i) => {
    s = s.replaceAll(d, String(i))
  })
  // 2. Remove all non-alphanumeric punctuation (slashes, dashes, dots, spaces)
  return s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()
}

export default function LockScreen({ onUnlock, transitioning }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [doorOpen, setDoorOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [doorGlow, setDoorGlow] = useState(false)
  const inputRef = useRef(null)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const cleaned = normalizeBirthday(input)

    if (VALID_NORMALIZED.has(cleaned)) {
      setError(false)
      setErrorMessage('')
      setDoorGlow(true)
      setTimeout(() => {
        setDoorOpen(true)
        setShowSuccess(true)
        setTimeout(() => onUnlock(), 1700)
      }, 700)
    } else {
      // Reject strictly
      setError(true)
      setErrorMessage('كلمة السر غير صحيحة! جربي تاريخ عيد ميلادك المميز يا أسماء 🎂🔒')
      setTimeout(() => setError(false), 1200)
      setInput('')
      inputRef.current?.focus()
    }
  }, [input, onUnlock])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={`lock-screen ${transitioning ? 'fade-out' : ''}`}>
      <ParticlesBg count={55} />

      {/* Radiant Orange & Pink Ambient Glows */}
      <div className="ambient-glow glow-orange" />
      <div className="ambient-glow glow-pink" />
      <div className="ambient-glow glow-peach" />

      {/* Sparkling Stars */}
      <Stars />

      {/* Success Flash Overlay */}
      {showSuccess && <div className="success-flash" />}

      {/* Festive Confetti on Success */}
      {showSuccess && <Confetti />}

      <div className="lock-content">
        {/* Magic Door / Gate */}
        <div className={`door-wrapper ${doorGlow ? 'door-glowing' : ''}`}>
          <div className="door-arch">
            <div className="arch-glow" />
            <span className="door-crown-icon">👑</span>
          </div>

          <div className="door-frame">
            <div className={`door-panel left-panel ${doorOpen ? 'door-open-left' : ''}`}>
              <div className="door-decoration">
                <div className="door-gem" />
                <div className="door-lines">
                  {[...Array(5)].map((_, i) => <div key={i} className="door-line" />)}
                </div>
                <div className="door-knob left-knob" />
              </div>
            </div>
            <div className={`door-panel right-panel ${doorOpen ? 'door-open-right' : ''}`}>
              <div className="door-decoration">
                <div className="door-gem" />
                <div className="door-lines">
                  {[...Array(5)].map((_, i) => <div key={i} className="door-line" />)}
                </div>
                <div className="door-knob right-knob" />
              </div>
            </div>

            {/* Radiant Light Burst when opening */}
            {doorOpen && <div className="door-light-burst" />}
          </div>

          {/* Flying Hearts & Stars on Door Open */}
          {doorOpen && <DoorOpenElements />}
        </div>

        {/* Gate Form & Instructions */}
        {!doorOpen && (
          <div className="lock-text-content">
            <div className="lock-badge">
              <span className="badge-sparkle">✨</span>
              <span>بوابة الدخول السرية</span>
              <span className="badge-sparkle">✨</span>
            </div>

            <h1 className="lock-title">
              فيه مفاجأة مخصوص مستنياكي يا أسماء...{' '}
              <span className="gift-sparkle">🎁</span>
            </h1>

            <p className="lock-subtitle">
              لكن قبل ما تدخلي للرسائل، لازم تكتبي تاريخ يوم ميلادك المميز ❤️
            </p>

            <form className="lock-form" onSubmit={handleSubmit}>
              <div className={`input-wrapper ${error ? 'shake' : ''}`}>
                <input
                  ref={inputRef}
                  type="text"
                  className={`lock-input ${error ? 'input-error' : ''}`}
                  placeholder="✨ أدخلي تاريخ ميلادك (مثال: 20/09/2004)..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  autoComplete="off"
                  maxLength={15}
                  aria-label="كلمة السر - تاريخ الميلاد"
                />
                <div className="input-glow-border" />
              </div>

              {error && (
                <div className="error-box" role="alert">
                  <span className="error-icon">❌</span>
                  <p className="error-msg">{errorMessage}</p>
                </div>
              )}

              <button type="submit" className="unlock-btn">
                <span className="btn-icon">🔓</span>
                <span className="btn-text">ادخلي لعالمك الخاص ❤️</span>
                <div className="btn-shine" />
              </button>
            </form>

            <div className="lock-hint-pill">
              <span>💡 تلميح: تاريخ يوم ولادتك السعيد (يوم / شهر / سنة)</span>
            </div>
          </div>
        )}

        {/* Success Reveal State */}
        {showSuccess && (
          <div className="success-message">
            <div className="success-hearts">
              {['❤️','✨','🎂','💖','🌟','🎉'].map((e, i) => (
                <span key={i} className="success-emoji" style={{ '--i': i }}>{e}</span>
              ))}
            </div>
            <h2 className="success-text">نورتي يا أحلى أسماء! 🌸</h2>
            <p className="success-sub">انفتحت ليكي كل الرسائل والمفاجآت... 🎁</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Stars() {
  const stars = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }))

  return (
    <div className="stars-container" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#ff7a18','#ff2a85','#f97316','#ec4899','#facc15','#fb923c','#fff'][Math.floor(Math.random() * 7)],
    delay: Math.random() * 1.5,
    duration: Math.random() * 2.5 + 2,
    size: Math.random() * 10 + 6,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
    rotate: Math.random() * 360,
  }))

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: p.shape === 'circle' ? `${p.size}px` : `${p.size * 0.4}px`,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  )
}

function DoorOpenElements() {
  const elements = ['❤️','✨','💖','🌸','⭐','🌟','🧡','🎉','🎁','💝']
  return (
    <div className="door-open-elements" aria-hidden="true">
      {elements.map((el, i) => (
        <span
          key={i}
          className="flying-element"
          style={{
            '--dx': `${(Math.random() - 0.5) * 260}px`,
            '--dy': `${-(Math.random() * 180 + 60)}px`,
            '--dr': `${(Math.random() - 0.5) * 360}deg`,
            animationDelay: `${i * 0.08}s`,
            fontSize: `${Math.random() * 22 + 18}px`,
          }}
        >
          {el}
        </span>
      ))}
    </div>
  )
}
