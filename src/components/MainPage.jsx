import { useRef, useEffect, useState } from 'react'
import ParticlesBg from './ParticlesBg'
import HeroSection from './HeroSection'
import CardsSection from './CardsSection'
import FinalSurprise from './FinalSurprise'
import './MainPage.css'

export default function MainPage({ onOpenWelcomeVideo }) {
  const [showFinal, setShowFinal] = useState(false)
  const [openedCards, setOpenedCards] = useState(new Set())
  const finalRef = useRef(null)

  const handleCardOpened = (id) => {
    setOpenedCards(prev => new Set([...prev, id]))
  }

  const allOpened = openedCards.size >= 7

  const handleFinalSurprise = () => {
    setShowFinal(true)
    setTimeout(() => {
      finalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="main-page" style={{ animation: 'fadeIn 0.8s ease' }}>
      <ParticlesBg count={50} />

      {/* Ambient background glows */}
      <div className="main-ambient">
        <div className="main-glow mg-1" />
        <div className="main-glow mg-2" />
        <div className="main-glow mg-3" />
      </div>

      <HeroSection onOpenWelcomeVideo={onOpenWelcomeVideo} />
      <CardsSection onCardOpened={handleCardOpened} />

      {/* All cards opened — show surprise button */}
      {allOpened && !showFinal && (
        <div className="surprise-reveal" style={{ animation: 'fadeInUp 0.8s ease' }}>
          <div className="surprise-reveal-inner">
            <p className="surprise-question">خلصتي كل الكروت؟ 👀</p>
            <p className="surprise-sub-q">طب استني... فيه مفاجأة أخيرة.</p>
            <button
              className="surprise-btn"
              onClick={handleFinalSurprise}
              aria-label="افتحي المفاجأة الأخيرة"
            >
              <span>افتحي المفاجأة ✨</span>
              <div className="surprise-btn-glow" />
            </button>
          </div>
        </div>
      )}

      {showFinal && (
        <div ref={finalRef}>
          <FinalSurprise />
        </div>
      )}
    </div>
  )
}
