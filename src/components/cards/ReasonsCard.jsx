import { useState } from 'react'
import './ReasonsCard.css'

const REASONS = [
  'لأن قلبك جميل وطيب ونادر.',
  'لأن ضحكتك مختلفة عن أي ضحكة تانية وبتنوّر المكان.',
  'لأنك بتعرفي تفرحي كل اللي حواليكي بكل بساطة.',
  'لأن طيبتك نادرة وحقيقية في الزمن ده.',
  'لأن وجودك في حياة أي حد له معنى وقيمة كبيرة.',
  'لأنك بتخلي أي مكان تكوني فيه أدفى وأحلى.',
  'لأنك شخصية مميزة ومفيش منك اتنين.',
  'لأنك تستحقي كل حاجة حلوة وجميلة في الدنيا دي.',
  'لأن إحساسك صادق وعميق وبيلمس القلب.',
  'لأنك صادقة حتى لما الصدق بيكون أصعب طريق.',
  'لأن روحك فيها نور طبيعي مبيختفيش.',
  'لأنك مش بس جميلة... انتي ساحرة بتفاصيلك.',
  'لأن كلامك دايمًا بيطمن ويدخل القلب علطول.',
  'لأنك لما بتحبي، بتحبي بصدق وإخلاص كبير.',
  'لأن مجهودك وسعيك في الحياة يستاهل كل احترام.',
  'لأن إصرارك وطموحك حاجة تشرف وتفرح.',
  'لأنك بتعدي على حياة الناس وتسيبي أثر ورد وجمال.',
  'لأن عقلك واعي وناضج وأكبر من سنك بكتير.',
  'لأن مستقبلك مشرق وفيه مفاجآت عظيمة مستنياكي.',
  'لأنك بتستحقي حب حقيقي وصافي ملوش حدود.',
  'لأن كل يوم بتكبري فيه بتبقي أحلى وأحن.',
  'لأن 23 سنة خرجت للعالم إنسانة استثنائية.',
  'لأنك أسماء... وده لوحده أعظم وأجمل سبب في الدنيا! ❤️',
]

export default function ReasonsCard() {
  const [phase, setPhase] = useState('idle') // idle | cascade | manual
  const [shownCount, setShownCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFinal, setShowFinal] = useState(false)

  const startCascade = () => {
    if (phase === 'cascade') return
    setPhase('cascade')
    setShownCount(0)

    REASONS.forEach((_, i) => {
      setTimeout(() => {
        setShownCount(i + 1)
        if (i === REASONS.length - 1) {
          setTimeout(() => {
            setShowFinal(true)
          }, 500)
        }
      }, i * 180)
    })
  }

  const startManual = () => {
    setPhase('manual')
    setCurrentIndex(0)
  }

  return (
    <div className="reasons-wrapper">
      <div className="reasons-header">
        <div className="reasons-number-badge">
          <span className="reasons-number-glow">23</span>
        </div>
        <h3 className="reasons-title">23 سبب بحبك فيه يا أسماء ❤️</h3>
        <p className="reasons-subtitle">لكل سنة من عمرك سبب مخصوص بيخليكي مميزة ✨</p>

        {phase === 'idle' && (
          <div className="reasons-action-btns">
            <button className="reasons-start-btn" onClick={startCascade}>
              <span>✨ عرض شلال الأسباب كلها</span>
              <div className="btn-shine" />
            </button>
            <button className="reasons-manual-btn" onClick={startManual}>
              <span>🃏 تصفح كارت بكارت</span>
            </button>
          </div>
        )}
      </div>

      {/* Mode 1: Cascade Waterfall */}
      {phase === 'cascade' && (
        <>
          <div className="reasons-counter-ticker">
            <span>تم كشف {shownCount} من 23 سبب 💖</span>
          </div>

          <div className="reasons-list">
            {REASONS.slice(0, shownCount).map((reason, idx) => (
              <div
                key={idx}
                className="reason-card-item"
                style={{ animationDelay: '0.05s' }}
              >
                <div className="reason-num-circle">{idx + 1}</div>
                <p className="reason-text">{reason}</p>
                <span className="reason-sparkle">✦</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Mode 2: Manual Card-by-Card Flip */}
      {phase === 'manual' && (
        <div className="reasons-manual-viewer">
          <div className="single-reason-card">
            <div className="single-reason-top">
              <span className="single-reason-badge">سبب رقم #{currentIndex + 1}</span>
              <span className="single-reason-star">⭐</span>
            </div>
            <p className="single-reason-content">{REASONS[currentIndex]}</p>
            <div className="single-reason-indicator">
              {currentIndex + 1} / 23
            </div>
          </div>

          <div className="manual-nav-btns">
            <button
              className="nav-btn"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            >
              ← السابق
            </button>
            <button
              className="nav-btn next-btn"
              onClick={() => {
                if (currentIndex < REASONS.length - 1) {
                  setCurrentIndex(prev => prev + 1)
                } else {
                  setShowFinal(true)
                }
              }}
            >
              {currentIndex === REASONS.length - 1 ? 'المسك الختام ❤️' : 'السبب التالي →'}
            </button>
          </div>
        </div>
      )}

      {/* Final Love Note */}
      {showFinal && (
        <div className="reasons-final">
          <div className="reasons-final-hearts">
            {['❤️','🌸','🧡','💖','✨','🌟'].map((e, i) => (
              <span key={i} className="final-float-emoji" style={{ '--i': i }}>{e}</span>
            ))}
          </div>
          <p className="reasons-final-text">
            والحقيقة؟ الـ23 سبب دول نقطة في بحر جمالك يا أسماء... كل سنة وانتي منورة حياتنا! ❤️
          </p>
        </div>
      )}
    </div>
  )
}
