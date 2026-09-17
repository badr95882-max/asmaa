import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

export default function HeroSection({ onOpenWelcomeVideo }) {
  const [visible, setVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const scrollToCards = () => {
    document.getElementById('cards-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-section" ref={heroRef} aria-label="قسم الترحيب">
      {/* Floating hearts */}
      <FloatingHearts />

      {/* Ribbon decoration */}
      <div className="hero-ribbon" aria-hidden="true">
        <div className="ribbon-glow" />
      </div>

      <div className={`hero-content ${visible ? 'hero-visible' : ''}`}>
        {/* Birthday badge */}
        <div className="birthday-badge" style={{ animationDelay: '0.2s' }}>
          <span className="badge-emoji">🎂</span>
          <span className="badge-text">عيد ميلاد سعيد</span>
          <span className="badge-emoji">🎉</span>
        </div>

        {/* Main title */}
        <h1 className="hero-title">
          <span className="hero-title-line-1">كل سنة وانتي</span>
          <span className="hero-title-name">أجمل أسماء</span>
          <span className="hero-heart">❤️</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          23 سنة من الجمال، والطيبة، والضحكة اللي بتخلي الدنيا أحلى.
        </p>

        {/* Date display */}
        <div className="hero-date">
          <span className="date-label">20 سبتمبر 2004</span>
          <span className="date-separator">·</span>
          <span className="date-label">20 سبتمبر 2027</span>
        </div>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button
            className="hero-cta"
            onClick={scrollToCards}
            aria-label="افتحي هديتك"
          >
            <span className="cta-icon">🎁</span>
            <span className="cta-text">افتحي هديتك</span>
            <div className="cta-shine" />
          </button>

          {onOpenWelcomeVideo && (
            <button
              className="hero-video-btn"
              onClick={onOpenWelcomeVideo}
              aria-label="مشاهدة الفيديو الترحيبي"
            >
              <span className="video-btn-icon">🎬</span>
              <span className="video-btn-text">الفيديو الترحيبي الخاص</span>
              <div className="video-btn-glow" />
            </button>
          )}
        </div>

        {/* Decorative stars */}
        <div className="hero-stars" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="deco-star" style={{ '--i': i }}>⭐</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-dot" />
        <div className="scroll-line" />
      </div>
    </section>
  )
}

function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 24 + 12,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 5,
    emoji: ['❤️','💕','💖','💗','💝','🌸','✨'][Math.floor(Math.random() * 7)],
  }))

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map(h => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}
