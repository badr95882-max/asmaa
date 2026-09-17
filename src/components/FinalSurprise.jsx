import { useState, useEffect, useRef } from 'react'
import './FinalSurprise.css'

export default function FinalSurprise() {
  const [phase, setPhase] = useState('entering') // entering | full
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef(null)
  const confettiRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setPhase('full'), 500)
    return () => clearTimeout(t)
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (musicPlaying) {
      audioRef.current.pause()
      setMusicPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setMusicPlaying(true)
    }
  }

  // Generate confetti pieces
  const confettiPieces = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 12 + 6,
    color: [
      '#f43f5e', '#ec4899', '#a855f7', '#f9a8d4',
      '#fbbf24', '#34d399', '#60a5fa', '#fff',
    ][Math.floor(Math.random() * 8)],
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 3,
    shape: Math.random() > 0.6 ? 'circle' : Math.random() > 0.5 ? 'rect' : 'heart',
    rotate: Math.random() * 360,
    wobble: (Math.random() - 0.5) * 200,
  }))

  const balloons = [
    { color: '#f43f5e', x: 10, delay: 0 },
    { color: '#a855f7', x: 25, delay: 0.5 },
    { color: '#ec4899', x: 60, delay: 0.2 },
    { color: '#fbbf24', x: 75, delay: 0.8 },
    { color: '#60a5fa', x: 88, delay: 0.3 },
  ]

  return (
    <section className="final-surprise" aria-label="المفاجأة النهائية">
      {/* Background confetti */}
      <div className="fs-confetti-container" aria-hidden="true">
        {confettiPieces.map(p => (
          <div
            key={p.id}
            className="fs-confetti"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: p.shape === 'circle' ? `${p.size}px` : p.shape === 'heart' ? `${p.size}px` : `${p.size * 0.4}px`,
              borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'heart' ? '0' : '2px',
              backgroundColor: p.shape === 'heart' ? 'transparent' : p.color,
              color: p.color,
              fontSize: p.shape === 'heart' ? `${p.size}px` : undefined,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--wobble': `${p.wobble}px`,
              transform: `rotate(${p.rotate}deg)`,
            }}
          >
            {p.shape === 'heart' ? '❤️' : null}
          </div>
        ))}
      </div>

      {/* Balloons */}
      <div className="fs-balloons" aria-hidden="true">
        {balloons.map((b, i) => (
          <div
            key={i}
            className="fs-balloon"
            style={{
              left: `${b.x}%`,
              '--balloon-color': b.color,
              animationDelay: `${b.delay}s`,
            }}
          >
            <div className="balloon-body">
              <div className="balloon-shine" />
              <div className="balloon-knot" />
            </div>
            <div className="balloon-string" />
          </div>
        ))}
      </div>

      {/* Ambient glows */}
      <div className="fs-glow fs-glow-1" aria-hidden="true" />
      <div className="fs-glow fs-glow-2" aria-hidden="true" />
      <div className="fs-glow fs-glow-3" aria-hidden="true" />

      {/* Stars */}
      <div className="fs-stars" aria-hidden="true">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="fs-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 16 + 10}px`,
            }}
          >
            {['⭐','✨','💫','🌟'][Math.floor(Math.random() * 4)]}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className={`fs-content ${phase === 'full' ? 'fs-visible' : ''}`}>
        {/* Cake animation */}
        <div className="fs-cake" aria-hidden="true">
          <div className="fs-cake-candles">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="fs-candle" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="fs-flame" />
                <div className="fs-candle-body" />
              </div>
            ))}
          </div>
          <div className="fs-cake-body">
            <div className="fs-cake-top">
              <div className="fs-cake-frosting-top" />
              <div className="fs-cake-deco">🌸 💕 🌸</div>
            </div>
            <div className="fs-cake-bottom" />
          </div>
          <div className="fs-cake-plate" />
        </div>

        {/* Main birthday text */}
        <div className="fs-title-wrapper">
          <h2 className="fs-main-title">HAPPY BIRTHDAY</h2>
          <div className="fs-name-wrapper">
            <span className="fs-name">ASMAA</span>
            <span className="fs-heart-big">🎂❤️</span>
          </div>
        </div>

        {/* Sub messages */}
        <p className="fs-sub-1">
          23 سنة من كونك إنسانة استثنائية.
        </p>

        <div className="fs-divider">
          <span>✦</span>
          <div className="fs-divider-line" />
          <span>❤️</span>
          <div className="fs-divider-line" />
          <span>✦</span>
        </div>

        <p className="fs-sub-2">
          أتمنى السنة دي تكون بداية لكل حاجة نفسك فيها.
        </p>

        {/* Hearts row */}
        <div className="fs-hearts-row" aria-hidden="true">
          {['❤️','💕','💖','💗','💝','💞','💓'].map((h, i) => (
            <span
              key={i}
              className="fs-floating-heart"
              style={{
                animationDelay: `${i * 0.3}s`,
                fontSize: `${Math.random() * 12 + 20}px`,
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Music button */}
        <button
          className={`fs-music-btn ${musicPlaying ? 'playing' : ''}`}
          onClick={toggleMusic}
          aria-label={musicPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
        >
          <span className="music-icon">{musicPlaying ? '🔊' : '🔇'}</span>
          <span className="music-text">{musicPlaying ? 'إيقاف الموسيقى' : 'تشغيل موسيقى احتفالية'}</span>
        </button>

        {/* Hidden audio element for music (user must interact first) */}
        <audio ref={audioRef} loop preload="none">
          {/* Using a public domain festive melody URL */}
          <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        </audio>
      </div>
    </section>
  )
}
