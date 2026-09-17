import { useState } from 'react'
import './CakeCard.css'

export default function CakeCard() {
  const [phase, setPhase] = useState('unlit') // unlit | lit | blown
  const [showMsg, setShowMsg] = useState(false)
  const [smokeHearts, setSmokeHearts] = useState([])

  const handleCandleClick = () => {
    if (phase === 'unlit') {
      setPhase('lit')
    } else if (phase === 'lit') {
      setPhase('blown')

      // Generate rising smoke hearts
      const hearts = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 60,
        delay: i * 0.12,
        size: Math.random() * 14 + 10,
      }))
      setSmokeHearts(hearts)

      setTimeout(() => {
        setShowMsg(true)
      }, 1000)
    }
  }

  return (
    <div className="cake-wrapper">
      <div className="ck-header">
        <div className="ck-age-badge">
          <span>🎂 عيد الميلاد الـ23</span>
        </div>
        <h3 className="ck-title">كيكة الأمنيات 🎂</h3>
        {phase === 'unlit' && (
          <p className="ck-hint">اضغطي على الشمعة لإشعالها 🔥✨</p>
        )}
        {phase === 'lit' && (
          <p className="ck-hint ck-blow-hint">اتمني أمنية واضغطي على الشمعة لتطفيها! 💨🎂</p>
        )}
        {phase === 'blown' && (
          <p className="ck-hint">أمنيتك في طريقها للتحقيق بإذن الله ✨</p>
        )}
      </div>

      {/* Cake Stage */}
      <div className="cake-stage" onClick={handleCandleClick} role="button" tabIndex={0}>
        {/* Flame */}
        {phase === 'lit' && (
          <div className="candle-flame-wrapper">
            <div className="flame-outer" />
            <div className="flame-inner" />
            <div className="flame-sparkles">
              <span>✦</span>
              <span>✦</span>
            </div>
          </div>
        )}

        {/* Smoke Hearts when blown */}
        {phase === 'blown' && (
          <div className="smoke-container">
            {smokeHearts.map(h => (
              <span
                key={h.id}
                className="smoke-heart"
                style={{
                  '--sx': `${h.x}px`,
                  fontSize: `${h.size}px`,
                  animationDelay: `${h.delay}s`,
                }}
              >
                💨
              </span>
            ))}
          </div>
        )}

        {/* Candle with '23' topper */}
        <div className="candle">
          <span className="candle-number">23</span>
          {phase === 'unlit' && <div className="candle-wick" />}
        </div>

        {/* Cake Tiers (Orange & Pink Frosting) */}
        <div className="cake-body">
          <div className="cake-tier tier-top">
            <div className="cake-frosting-top" />
            <div className="cake-decorations">
              {['🌸','⭐','🍓','💕'].map((e, i) => (
                <span key={i} className="cake-deco" style={{ '--i': i }}>{e}</span>
              ))}
            </div>
          </div>
          <div className="cake-tier tier-bottom">
            <div className="cake-frosting-bottom" />
            <div className="cake-ribbon-orange" />
          </div>
        </div>

        {/* Plate */}
        <div className="cake-plate" />
      </div>

      {/* Revealed Wish Message */}
      {showMsg && (
        <div className="ck-messages-wrapper">
          <div className="ck-wish-box">
            <h4 className="ck-wish-title">يا رب كل أمنياتك تتحقق يا أسماء! 🌸✨</h4>
            <p className="ck-wish-text">
              أتمنى إن سنتك الـ23 تكون سنة الخير والبهجة، وتكون مليانة راحة بال، ونجاح في كل خطوة، وأيام دافية شبه قلبك.
            </p>
            <div className="ck-confetti-emojis">
              {['🎉','🎂','✨','💖','🌸','🧡'].map((e, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.2}s` }} className="ck-emoji-bounce">{e}</span>
              ))}
            </div>
            <p className="ck-final-birthday-tag">Happy 23rd Birthday, Asmaa ❤️</p>
          </div>
        </div>
      )}
    </div>
  )
}
