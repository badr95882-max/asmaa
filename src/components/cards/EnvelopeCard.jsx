import { useState, useEffect, useRef } from 'react'
import './EnvelopeCard.css'

const MESSAGE = 'أسماء، يمكن الكلام مهما كان حلو مش هيقدر يوصف قد إيه وجودك في حياة اللي حواليكي حاجة جميلة. انتي من الناس اللي وجودهم لوحده بيخلي اليوم أحلى وأدفى كتير. ❤️'

export default function EnvelopeCard({ onClose }) {
  const [phase, setPhase] = useState('sealed') // sealed | breaking | opening | open
  const [typed, setTyped] = useState('')
  const typingRef = useRef(null)

  const handleOpen = () => {
    if (phase !== 'sealed') return
    setPhase('breaking')

    setTimeout(() => {
      setPhase('opening')
    }, 450)

    setTimeout(() => {
      setPhase('open')
      startTypewriter()
    }, 1300)
  }

  const startTypewriter = () => {
    let i = 0
    typingRef.current = setInterval(() => {
      if (i <= MESSAGE.length) {
        setTyped(MESSAGE.slice(0, i))
        i++
      } else {
        clearInterval(typingRef.current)
      }
    }, 38)
  }

  useEffect(() => {
    return () => clearInterval(typingRef.current)
  }, [])

  return (
    <div className="envelope-card-wrapper">
      <div className="ec-decoration">
        {['💌','✉️','🌸','✨','🧡','💖'].map((e, i) => (
          <span key={i} className="ec-deco-el" style={{ '--i': i }}>{e}</span>
        ))}
      </div>

      <h3 className="ec-heading">رسالة صغيرة من القلب 💌</h3>
      <p className="ec-hint">
        {phase === 'sealed' ? 'اضغطي على الختم الشمعي لكسره وفتح الرسالة ✨' : ''}
      </p>

      {/* Interactive Envelope Container */}
      <div
        className={`envelope-box ${phase}`}
        onClick={handleOpen}
        role="button"
        aria-label="افتحي الرسالة والختم الشمعي"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleOpen()}
      >
        {/* Envelope Shell */}
        <div className="env-body">
          <div className="env-fold-left" />
          <div className="env-fold-right" />
          <div className="env-fold-bottom" />
        </div>

        {/* 3D Top Flap */}
        <div className={`env-flap ${phase === 'opening' || phase === 'open' ? 'flap-unfolded' : ''}`}>
          <div className="env-flap-inner" />
        </div>

        {/* Sliding Parchment Letter */}
        <div className={`env-letter ${phase === 'open' ? 'letter-glided' : ''}`}>
          <div className="env-letter-content">
            <div className="letter-flower">🌸</div>
            <div className="letter-watermark">A</div>
          </div>
        </div>

        {/* Wax Seal with breaking effect */}
        {phase !== 'open' && (
          <div className={`wax-seal ${phase === 'breaking' || phase === 'opening' ? 'seal-shatter' : ''}`}>
            <div className="seal-inner">
              <span className="seal-monogram">A</span>
              <span className="seal-heart">❤️</span>
            </div>
            {phase === 'breaking' && (
              <div className="seal-particles">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="seal-particle" style={{ '--angle': `${i * 45}deg` }} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Unfolded Letter Message Box */}
      {phase === 'open' && (
        <div className="ec-message-box">
          <div className="ec-message-inner">
            <p className="ec-message-text">
              {typed}
              <span className="typewriter-cursor" />
            </p>
            <div className="ec-signature">
              <span>لكِ وحدكِ يا أسماء 🌸</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
