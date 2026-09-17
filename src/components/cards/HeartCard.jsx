import { useState } from 'react'
import './HeartCard.css'

export default function HeartCard() {
  const [phase, setPhase] = useState('idle') // idle | beating | locket_open
  const [bpm, setBpm] = useState(78)
  const [hearts, setHearts] = useState([])

  const handleClick = () => {
    if (phase !== 'idle') return
    setPhase('beating')
    setBpm(145)

    // Spawn 24 floating mini hearts
    const spawned = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 220,
      y: -(Math.random() * 120 + 50),
      size: Math.random() * 24 + 14,
      delay: Math.random() * 0.4,
      emoji: ['❤️','💖','🌸','🧡','💕','💗','💝'][Math.floor(Math.random() * 7)],
    }))
    setHearts(spawned)

    setTimeout(() => {
      setPhase('locket_open')
    }, 1500)
  }

  return (
    <div className="heart-card-wrapper">
      <div className="hc-header">
        <div className="hc-bpm-badge">
          <span className="bpm-pulse-dot" />
          <span>مؤشر نبضات القلب: {bpm} BPM</span>
        </div>
        <h3 className="hc-title">اضغطي على القلب ❤️</h3>
        {phase === 'idle' && (
          <p className="hc-hint">القلب بينبض ومستني لمستك تخليه يدق أسرع ✨</p>
        )}
      </div>

      <div className="hc-stage">
        {/* Flying Hearts */}
        {hearts.map(h => (
          <span
            key={h.id}
            className="mini-floating-heart"
            style={{
              '--dx': `${h.x}px`,
              '--dy': `${h.y}px`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`,
              '--dr': `${(Math.random() - 0.5) * 180}deg`,
            }}
          >
            {h.emoji}
          </span>
        ))}

        {/* Big Interactive Heart */}
        <div
          className={`big-crystal-heart ${phase}`}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="القلب الكبير"
          onKeyDown={e => e.key === 'Enter' && handleClick()}
        >
          <span className="heart-core-emoji">
            {phase === 'locket_open' ? '💖' : '❤️'}
          </span>
          <div className="heart-inner-shine" />
        </div>

        {/* Pulse Shockwaves */}
        {phase !== 'idle' && (
          <>
            <div className="hc-shockwave wave-1" />
            <div className="hc-shockwave wave-2" />
            <div className="hc-shockwave wave-3" />
          </>
        )}
      </div>

      {/* Message Unveiled */}
      {phase === 'locket_open' && (
        <div className="hc-messages">
          <div className="hc-msg-box">
            <p className="hc-msg-1">
              لو كان فيه مسابقة لأجمل وأحن قلب في الدنيا كلها... كنتي هتكسبيدها من غير أي منافسة.
            </p>
            <div className="hc-divider">❤️ ✨ ❤️</div>
            <p className="hc-msg-2">
              كل سنة وانتي طيبة وبخير يا أسماء، وكل سنة وقلبك الجميل ده أطيب وأسعد قلب في الكون! 🌸
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
