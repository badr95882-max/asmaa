import { useState } from 'react'
import './FutureCard.css'

export default function FutureCard() {
  const [phase, setPhase] = useState('idle') // idle | warping | holographic
  const [typed, setTyped] = useState('')

  const MSG = 'من أسماء المستقبل لأسماء النهاردة:\nخليكي دايمًا فخورة بنفسك وبقلبك الطيب. متخليش أي حاجة في الدنيا تطفئ نورك أو تغير نقاء روحك، وافتكري دايمًا إنك تستحقي أيام عظيمة ومفاجآت أجمل بكتير من كل اللي فات.'

  const handleOpen = () => {
    if (phase !== 'idle') return
    setPhase('warping')

    setTimeout(() => {
      setPhase('holographic')
      let i = 0
      const timer = setInterval(() => {
        if (i <= MSG.length) {
          setTyped(MSG.slice(0, i))
          i++
        } else {
          clearInterval(timer)
        }
      }, 35)
    }, 1600)
  }

  return (
    <div className="future-wrapper">
      <div className="fc-header">
        <div className="fc-orb-icon">🔮</div>
        <h3 className="fc-title">رسالة عبر الزمن من المستقبل 🔮</h3>
        {phase === 'idle' && (
          <p className="fc-hint">اضغطي لتشغيل البوابة الزمنية واستقبال الرسالة ✨</p>
        )}
      </div>

      {phase === 'idle' && (
        <button className="fc-open-btn" onClick={handleOpen}>
          <span className="fc-btn-icon">⚡</span>
          <span>تشغيل البوابة الزمنية ⌛</span>
          <div className="btn-shine" />
        </button>
      )}

      {/* Warping Temporal Rings */}
      {phase === 'warping' && (
        <div className="fc-warp-stage">
          <div className="warp-ring ring-1" />
          <div className="warp-ring ring-2" />
          <div className="warp-ring ring-3" />
          <div className="warp-core">
            <span className="warp-emoji">🌀</span>
          </div>
          <p className="warp-status-text">جاري فك تشفير رسالة من المستقبل... 📡</p>
        </div>
      )}

      {/* Holographic Projection Message */}
      {phase === 'holographic' && (
        <div className="fc-hologram-stage">
          <div className="holo-projector-base">
            <div className="holo-beam" />
          </div>

          <div className="fc-hologram-card">
            <div className="fc-holo-header">
              <span className="fc-holo-tag">🚀 إرسال مستقبلي مشفر</span>
              <span className="fc-holo-date">تاريخ الإرسال: المستقبل السعيد ✨</span>
            </div>

            <div className="fc-holo-body">
              <p className="fc-holo-text">
                {typed.split('\n').map((line, i) => (
                  <span key={i} className="fc-line">
                    {i === 0 ? <strong className="fc-lead">{line}</strong> : line}
                    {i < typed.split('\n').length - 1 && <br />}
                  </span>
                ))}
                <span className="typewriter-cursor" />
              </p>
            </div>

            <div className="fc-holo-footer">
              <span>بكل الحب — أسماء المستقبلية ❤️✨</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
