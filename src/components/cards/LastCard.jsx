import { useState, useEffect, useRef } from 'react'
import './LastCard.css'

const MESSAGES = [
  { delay: 800,  text: 'فيه ناس بنقابلهم في حياتنا عابرين...', big: false },
  { delay: 2400, text: 'وفيه ناس وجودهم لوحده بيغير شكل ومعنى الحياة.', big: false },
  { delay: 4200, text: 'وأسماء هي الإنسانة الاستثنائية اللي وجودها في الدنيا ميتعوضش.', big: false },
  { delay: 6000, text: 'كل سنة وانتي أحسن وأجمل إنسانة في الدنيا ❤️', big: true },
  { delay: 7800, text: 'كل سنة وانتي بخير وسعادة، وضحكتك منورة الدنيا، وكل سنة وأيامك أحلى من كل اللي قبلها.', big: false },
  { delay: 9600, text: 'Happy Birthday Asmaa ❤️\n23 looks stunning on you.', big: true, final: true },
]

export default function LastCard() {
  const [phase, setPhase] = useState('idle') // idle | sunset_glow | messages
  const [visibleMsgs, setVisibleMsgs] = useState([])
  const [lightHeart, setLightHeart] = useState(false)
  const timerRefs = useRef([])

  const handleStart = () => {
    if (phase !== 'idle') return
    setPhase('sunset_glow')

    setTimeout(() => {
      setLightHeart(true)
    }, 800)

    setTimeout(() => {
      setPhase('messages')
      MESSAGES.forEach((msg, i) => {
        const t = setTimeout(() => {
          setVisibleMsgs(prev => [...prev, i])
        }, msg.delay)
        timerRefs.current.push(t)
      })
    }, 1800)
  }

  useEffect(() => {
    return () => timerRefs.current.forEach(clearTimeout)
  }, [])

  return (
    <div className={`last-card-wrapper ${phase === 'sunset_glow' ? 'lc-sunset-active' : ''}`}>
      {phase === 'idle' && (
        <div className="lc-idle">
          <div className="lc-idle-icon">💫</div>
          <h3 className="lc-idle-title">آخر حاجة... افتحيها بقلبك ❤️</h3>
          <p className="lc-idle-sub">
            الكارت ده معمول مخصوص ليكون الختام اللي يليق بيكي يا أسماء...
          </p>
          <button className="lc-start-btn" onClick={handleStart}>
            <span>بدء اللحظة الخاصة 💝</span>
            <div className="btn-shine" />
          </button>
        </div>
      )}

      {(phase === 'sunset_glow' || phase === 'messages') && (
        <div className="lc-sunset-stage">
          {/* Glowing Sun Core & Rays */}
          <div className={`lc-sun-core ${lightHeart ? 'core-bloomed' : ''}`}>
            {lightHeart && <span className="lc-heart-emblem">❤️</span>}
          </div>

          {lightHeart && (
            <div className="lc-solar-rays">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="lc-ray" style={{ '--angle': `${i * 30}deg` }} />
              ))}
            </div>
          )}
        </div>
      )}

      {phase === 'messages' && (
        <div className="lc-messages-container">
          {MESSAGES.map((msg, i) => (
            visibleMsgs.includes(i) && (
              <div
                key={i}
                className={`lc-message ${msg.big ? 'lc-msg-big' : 'lc-msg-normal'} ${msg.final ? 'lc-msg-final' : ''}`}
              >
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < msg.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            )
          ))}

          {/* Celebratory Sunset Stars */}
          {visibleMsgs.length >= MESSAGES.length && (
            <div className="lc-final-stars" aria-hidden="true">
              {['⭐','✨','💖','🌸','🧡','🌟','🎉','💝'].map((e, i) => (
                <span
                  key={i}
                  className="lc-final-star"
                  style={{
                    '--i': i,
                    fontSize: `${Math.random() * 18 + 14}px`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  {e}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
