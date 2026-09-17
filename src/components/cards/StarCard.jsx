import { useState } from 'react'
import './StarCard.css'

export default function StarCard() {
  const [phase, setPhase] = useState('idle') // idle | charging | exploded

  const handleClick = () => {
    if (phase !== 'idle') return
    setPhase('charging')
    setTimeout(() => {
      setPhase('exploded')
    }, 1400)
  }

  const miniStars = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    angle: (i / 32) * 360,
    distance: Math.random() * 110 + 60,
    size: Math.random() * 22 + 12,
    color: ['#ff7a18','#ff2a85','#facc15','#fb923c','#ec4899','#fff'][Math.floor(Math.random() * 6)],
    delay: Math.random() * 0.25,
  }))

  return (
    <div className="star-card-wrapper">
      <div className="sc-header">
        <div className="sc-badge">
          <span>✨ سماء النجوم الخاصة بأسماء</span>
        </div>
        <h3 className="sc-title">افتحي النجمة السحرية ⭐</h3>
        {phase === 'idle' && (
          <p className="sc-hint">اضغطي على النجمة لتشحني نورها وتفجري طاقتها ✨</p>
        )}
        {phase === 'charging' && (
          <p className="sc-hint charging-text">جاري تجميع غبار النجوم... 🌟</p>
        )}
      </div>

      <div className="sc-stage">
        {/* Exploding Supernova Mini Stars */}
        {phase === 'exploded' && miniStars.map(s => (
          <div
            key={s.id}
            className="mini-star-burst"
            style={{
              '--ex': `${Math.cos(s.angle * Math.PI / 180) * s.distance}px`,
              '--ey': `${Math.sin(s.angle * Math.PI / 180) * s.distance}px`,
              fontSize: `${s.size}px`,
              color: s.color,
              animationDelay: `${s.delay}s`,
            }}
          >
            ✦
          </div>
        ))}

        {/* Orbit Rings */}
        <div className={`star-orbit-ring ring-orange ${phase}`} />
        <div className={`star-orbit-ring ring-pink ${phase}`} />

        {/* Center Celestial Star */}
        <div
          className={`celestial-star ${phase}`}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="النجمة المضيئة"
          onKeyDown={e => e.key === 'Enter' && handleClick()}
        >
          <span className="star-core-emoji">⭐</span>
          <div className="star-aura" />
        </div>
      </div>

      {/* Revealed Starlight Message */}
      {phase === 'exploded' && (
        <div className="sc-messages">
          <div className="sc-msg-box">
            <p className="sc-msg-1">
              لو الدنيا كلها فيها ملايين النجوم، فأنتي النجمة الوحيدة اللي بتخليها منورة ودافية وحقيقية.
            </p>
            <div className="sc-divider-stars">
              <span>✦</span>
              <span>⭐</span>
              <span>✦</span>
            </div>
            <p className="sc-msg-2">
              متنسيش أبدًا إنك أحسن وأغلى إنسانة في الدنيا بالنسبة لكل اللي بيحبوكي يا أسماء. ❤️
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
