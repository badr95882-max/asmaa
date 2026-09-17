import { useState, useRef } from 'react'
import './CardsSection.css'
import EnvelopeCard from './cards/EnvelopeCard'
import ReasonsCard from './cards/ReasonsCard'
import StarCard from './cards/StarCard'
import FutureCard from './cards/FutureCard'
import HeartCard from './cards/HeartCard'
import CakeCard from './cards/CakeCard'
import LastCard from './cards/LastCard'

const CARDS = [
  { id: 1, type: 'envelope', component: EnvelopeCard, title: 'رسالة صغيرة', icon: '💌', color: 'card-orange-pink' },
  { id: 2, type: 'reasons', component: ReasonsCard, title: '23 سبب', icon: '✨', color: 'card-sunset' },
  { id: 3, type: 'star', component: StarCard, title: 'افتحي النجمة', icon: '⭐', color: 'card-gold-orange' },
  { id: 4, type: 'future', component: FutureCard, title: 'رسالة من المستقبل', icon: '🔮', color: 'card-coral' },
  { id: 5, type: 'heart', component: HeartCard, title: 'اضغطي على القلب', icon: '❤️', color: 'card-hot-pink' },
  { id: 6, type: 'cake', component: CakeCard, title: 'الأمنية', icon: '🎂', color: 'card-peach' },
  { id: 7, type: 'last', component: LastCard, title: 'آخر حاجة...', icon: '💫', color: 'card-special-sunset' },
]

export default function CardsSection({ onCardOpened }) {
  const [activeCard, setActiveCard] = useState(null)
  const [openedSet, setOpenedSet] = useState(new Set())
  const sectionRef = useRef(null)

  const handleOpen = (id) => {
    setActiveCard(id)
    if (!openedSet.has(id)) {
      const next = new Set([...openedSet, id])
      setOpenedSet(next)
      onCardOpened(id)
    }
  }

  const handleClose = () => {
    setActiveCard(null)
  }

  const activeCardObj = CARDS.find(c => c.id === activeCard)
  const ActiveComponent = activeCardObj?.component

  return (
    <section id="cards-section" className="cards-section" ref={sectionRef}>
      {/* Section header */}
      <div className="cards-header">
        <div className="cards-header-badge">🎁</div>
        <h2 className="cards-title">عندي ليكي كام حاجة صغيرة... ❤️</h2>
        <p className="cards-subtitle">
          افتحي كل كارت لوحده، وكل كارت جواه مفاجأة وتأثير مميز معمول مخصوص ليكي.
        </p>

        <div className="cards-progress">
          <div className="progress-dots">
            {CARDS.map(c => (
              <div
                key={c.id}
                className={`progress-dot ${openedSet.has(c.id) ? 'dot-opened' : ''}`}
                title={c.title}
              />
            ))}
          </div>
          <p className="progress-text">
            {openedSet.size} من {CARDS.length} كروت تم فتحها
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="cards-grid">
        {CARDS.map((card, idx) => (
          <CardThumbnail
            key={card.id}
            card={card}
            index={idx}
            isOpened={openedSet.has(card.id)}
            onClick={() => handleOpen(card.id)}
          />
        ))}
      </div>

      {/* Overlay / Modal for active card with unique entrance */}
      {activeCard && ActiveComponent && (
        <CardOverlay onClose={handleClose} cardType={activeCardObj.type}>
          <ActiveComponent onClose={handleClose} />
        </CardOverlay>
      )}
    </section>
  )
}

function CardThumbnail({ card, index, isOpened, onClick }) {
  return (
    <button
      className={`card-thumb ${card.color} ${isOpened ? 'card-opened' : ''}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
      aria-label={`افتحي كارت: ${card.title}`}
    >
      <div className="card-thumb-inner">
        {isOpened && <div className="card-opened-badge">✓</div>}
        <div className="card-icon">{card.icon}</div>
        <div className="card-label">{card.title}</div>
        <div className="card-hint">{isOpened ? 'شوفيه تاني ❤️' : 'اضغطي لتكتشفيه ✨'}</div>

        {/* Glow effect */}
        <div className="card-thumb-glow" />
        {/* Sparkles */}
        {!isOpened && (
          <div className="card-sparkles" aria-hidden="true">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="card-sparkle" style={{ '--i': i }}>✦</span>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}

function CardOverlay({ children, onClose, cardType }) {
  return (
    <div
      className={`card-overlay card-overlay-${cardType}`}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className={`card-overlay-content modal-entrance-${cardType}`}>
        <button
          className="overlay-close"
          onClick={onClose}
          aria-label="إغلاق"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
