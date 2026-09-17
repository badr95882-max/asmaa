import { useState, useEffect, useRef, useCallback } from 'react'
import './WelcomeVideo.css'

// Duration of the video presentation in seconds
const TOTAL_DURATION = 24

export default function WelcomeVideo({ onClose, onContinue }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const playerRef = useRef(null)
  const audioCtxRef = useRef(null)
  const isPlayingRef = useRef(isPlaying)
  const isMutedRef = useRef(isMuted)
  const timerRef = useRef(null)
  const hideControlsTimer = useRef(null)

  // Keep refs in sync
  isPlayingRef.current = isPlaying
  isMutedRef.current = isMuted

  // --------------------------------------------------------------------------
  // Ambient Music Synthesizer (Web Audio API - Celesta / Music Box / Harp)
  // --------------------------------------------------------------------------
  const playNote = useCallback((freq, duration = 0.8, gainVal = 0.12) => {
    if (isMutedRef.current) return
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        audioCtxRef.current = new AudioContext()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      // Warm low-pass bell tone
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1400, ctx.currentTime)

      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch {
      // Audio context might be restricted before interaction
    }
  }, [])

  // Birthday & Joyful Melodic Sequence
  const triggerMelodyStep = useCallback((timeSec) => {
    // Frequencies: C4, D4, E4, F4, G4, A4, B4, C5, D5, E5
    const NOTES = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0,
      A4: 440.0, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25,
      G5: 783.99,
    }
    const beat = Math.floor(timeSec * 2) % 16
    const pattern = [
      NOTES.C4, NOTES.E4, NOTES.G4, NOTES.C5,
      NOTES.E4, NOTES.G4, NOTES.C5, NOTES.E5,
      NOTES.F4, NOTES.A4, NOTES.C5, NOTES.D5,
      NOTES.G4, NOTES.B4, NOTES.D5, NOTES.G5,
    ]
    const freq = pattern[beat]
    if (freq) {
      playNote(freq, 0.9, 0.09)
      // Harmony note on downbeats
      if (beat % 4 === 0) {
        playNote(freq / 2, 1.4, 0.07)
      }
    }
  }, [playNote])

  // Playback loop
  useEffect(() => {
    let lastStamp = performance.now()

    const step = (now) => {
      if (isPlayingRef.current) {
        const delta = (now - lastStamp) / 1000
        setCurrentTime((prev) => {
          const next = prev + delta
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false)
            return TOTAL_DURATION
          }
          // trigger sound note every 0.5s interval
          if (Math.floor(next * 2) !== Math.floor(prev * 2)) {
            triggerMelodyStep(next)
          }
          return next
        })
      }
      lastStamp = now
      timerRef.current = requestAnimationFrame(step)
    }

    timerRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(timerRef.current)
  }, [triggerMelodyStep])

  // Toggle Play / Pause
  const togglePlay = () => {
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0)
    }
    setIsPlaying(p => !p)
    // Resume audio context if user clicked
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume()
    }
  }

  // Seek bar
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
  }

  // Toggle Mute
  const toggleMute = () => {
    setIsMuted(m => !m)
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume()
    }
  }

  // Replay
  const handleReplay = () => {
    setCurrentTime(0)
    setIsPlaying(true)
  }

  // Fullscreen
  const toggleFullscreen = () => {
    if (!playerRef.current) return
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen?.().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.().catch(() => {})
      setIsFullscreen(false)
    }
  }

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(hideControlsTimer.current)
    hideControlsTimer.current = setTimeout(() => {
      if (isPlayingRef.current) setShowControls(false)
    }, 2800)
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  // Progress percentage
  const progressPercent = (currentTime / TOTAL_DURATION) * 100

  // --------------------------------------------------------------------------
  // Determine current active scene
  // Scene 1: 0 - 5.5s  -> Intro welcome
  // Scene 2: 5.5 - 13.5s -> Childhood photo reveal with Ken Burns effect
  // Scene 3: 13.5 - 19.5s -> 23rd Year Tribute
  // Scene 4: 19.5 - 24s -> Celebration finale & invitation
  // --------------------------------------------------------------------------
  const scene =
    currentTime < 5.5
      ? 1
      : currentTime < 13.5
      ? 2
      : currentTime < 19.5
      ? 3
      : 4

  return (
    <div
      className="welcome-video-modal"
      role="dialog"
      aria-modal="true"
      aria-label="الفيديو الترحيبي الخاص بأسماء"
    >
      {/* Dark backdrop with ambient color wash */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* Main Video Theatre Player */}
      <div
        ref={playerRef}
        className={`video-theatre ${isFullscreen ? 'theatre-fullscreen' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Top Floating Action Bar */}
        <div className={`theatre-top-bar ${showControls ? 'visible' : ''}`}>
          <div className="theatre-brand">
            <span className="theatre-dot" />
            <span className="theatre-title">فيديو ترحيبي خاص · أسماء 🎂❤️</span>
          </div>

          <button
            className="theatre-skip-btn"
            onClick={onContinue || onClose}
            aria-label="تخطي والدخول للموقع"
          >
            <span>الدخول إلى الموقع 🎁</span>
            <span className="skip-arrow">←</span>
          </button>
        </div>

        {/* Cinematic Stage Area */}
        <div className="cinema-screen" onClick={togglePlay}>
          {/* Film Grain & Vignette */}
          <div className="cinema-vignette" />
          <div className="cinema-light-leak" />

          {/* Floating magical sparkles */}
          <div className="cinema-sparkles" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="cinema-sparkle"
                style={{
                  left: `${(i * 19) % 100}%`,
                  top: `${(i * 29) % 100}%`,
                  animationDelay: `${(i * 0.4) % 3}s`,
                  fontSize: `${(i % 3) * 6 + 12}px`,
                }}
              >
                {['✨', '⭐', '💫', '💖'][i % 4]}
              </span>
            ))}
          </div>

          {/* ================================================================
              SCENE 1: Golden Intro (0s - 5.5s)
             ================================================================ */}
          {scene === 1 && (
            <div className="scene scene-1 animate-fade-in">
              <div className="scene-1-badge">
                <span className="badge-sparkle">✨</span>
                <span>إهداء خاص جداً</span>
                <span className="badge-sparkle">✨</span>
              </div>
              <h1 className="scene-1-title">
                نورتي دنيتنا يا أحلى <span className="highlight-name">أسماء</span> 🌸
              </h1>
              <p className="scene-1-subtitle">
                20 سبتمبر 2004 · اليوم اللي أشرقت فيه أجمل ضحكة وأطيب قلب
              </p>
              <div className="scene-1-hearts">
                {['❤️', '💖', '🎂', '🌟', '✨'].map((e, idx) => (
                  <span key={idx} className="intro-heart" style={{ '--i': idx }}>
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              SCENE 2: Childhood Photo Reveal (5.5s - 13.5s)
             ================================================================ */}
          {scene === 2 && (
            <div className="scene scene-2 animate-fade-in">
              {/* Luxury Vintage Photo Frame with Ken Burns Zoom */}
              <div className="photo-card-frame">
                <div className="frame-glow-ring" />
                <div className="frame-inner">
                  {/* The Cropped Childhood Picture of Asmaa */}
                  <img
                    src="/asmaa-childhood.jpg"
                    alt="صورة الطفولة لأسماء"
                    className="childhood-img ken-burns-active"
                  />
                  <div className="photo-shimmer-sweep" />
                  <div className="photo-vintage-vignette" />
                </div>
                {/* Ornate corner flowers & stars */}
                <span className="frame-corner corner-tl">🌸</span>
                <span className="frame-corner corner-tr">🌸</span>
                <span className="frame-corner corner-bl">✨</span>
                <span className="frame-corner corner-br">✨</span>
              </div>

              {/* Caption Overlay */}
              <div className="scene-2-caption">
                <div className="caption-tag">
                  <span>ذكريات الطفولة البريئة 🌸</span>
                </div>
                <h2 className="caption-heading">
                  من صغرك وانتي قمر وضحكتك بتنور الدنيا كلها ✨
                </h2>
                <p className="caption-text">
                  نفس الملامح الهادية، وعيون مليانة براءة وطيبة بتخطف القلوب من أول نظرة ❤️
                </p>
              </div>
            </div>
          )}

          {/* ================================================================
              SCENE 3: 23 Years Tribute (13.5s - 19.5s)
             ================================================================ */}
          {scene === 3 && (
            <div className="scene scene-3 animate-fade-in">
              <div className="scene-3-content">
                {/* Floating Mini Photo alongside */}
                <div className="mini-photo-polaroid">
                  <img src="/asmaa-childhood.jpg" alt="أسماء" className="polaroid-img" />
                  <div className="polaroid-pin">📌</div>
                  <span className="polaroid-label">أحلى بنوتة 💖</span>
                </div>

                <div className="scene-3-text-box">
                  <div className="scene-3-badge">
                    <span>👑 الملكة أسماء</span>
                  </div>
                  <h2 className="scene-3-title">
                    23 سنة من الجمال والرقة
                  </h2>
                  <p className="scene-3-paragraph">
                    السنين بتمر وانتي بتزيدي حلاوة وطيبة... وجودك في حياة أي حد نعمة كبيرة،
                    وضحكتك كفاية تخلي أي يوم صعب يبقى جميل ومبهج.
                  </p>
                  <div className="scene-3-signature">
                    <span>كل سنة وانتي سالمة يا أغلى الناس 💐</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              SCENE 4: Celebration Finale (19.5s - 24s)
             ================================================================ */}
          {scene === 4 && (
            <div className="scene scene-4 animate-fade-in">
              <div className="celebration-burst">
                <span className="big-cake-icon">🎂</span>
              </div>
              <h2 className="scene-4-title">HAPPY BIRTHDAY ASMAA!</h2>
              <p className="scene-4-wishes">
                جاهزة تكتشفي رسايلك وهداياكي؟ عالم كامل معمول مخصوص عشان يفرحك! 🎁❤️
              </p>
              <button
                className="scene-4-enter-btn"
                onClick={onContinue || onClose}
                aria-label="افتحي الهدايا والمفاجآت"
              >
                <span>ادخلي لعالم المفاجآت الآن ✨</span>
                <div className="btn-glow-pulse" />
              </button>
            </div>
          )}

          {/* Big Center Play Icon when paused */}
          {!isPlaying && (
            <div className="big-play-overlay">
              <div className="big-play-btn" aria-label="تشغيل">
                <span>▶</span>
              </div>
            </div>
          )}
        </div>

        {/* Video Control Bar */}
        <div className={`theatre-controls ${showControls ? 'visible' : ''}`}>
          {/* Progress Slider */}
          <div className="progress-bar-wrapper">
            <input
              type="range"
              min={0}
              max={TOTAL_DURATION}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="theatre-seek-slider"
              aria-label="شريط تقدم الفيديو"
            />
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Scene Markers */}
            <div className="marker marker-1" style={{ left: '0%' }} title="المقدمة" />
            <div className="marker marker-2" style={{ left: '23%' }} title="صورة الطفولة" />
            <div className="marker marker-3" style={{ left: '56%' }} title="23 سنة" />
            <div className="marker marker-4" style={{ left: '81%' }} title="الاحتفال" />
          </div>

          <div className="controls-row">
            {/* Left Controls */}
            <div className="controls-left">
              {/* Play / Pause */}
              <button
                className="ctrl-btn play-ctrl"
                onClick={togglePlay}
                aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              {/* Replay */}
              <button
                className="ctrl-btn replay-ctrl"
                onClick={handleReplay}
                aria-label="إعادة التشغيل من البداية"
                title="إعادة التشغيل"
              >
                ↺
              </button>

              {/* Time Display */}
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span className="time-separator">/</span>
                <span>{formatTime(TOTAL_DURATION)}</span>
              </div>

              {/* Mute / Unmute */}
              <button
                className={`ctrl-btn sound-ctrl ${isMuted ? 'muted' : ''}`}
                onClick={toggleMute}
                aria-label={isMuted ? 'تشغيل الموسيقى' : 'كتم الموسيقى'}
                title={isMuted ? 'تشغيل الموسيقى' : 'كتم الموسيقى'}
              >
                {isMuted ? '🔇' : '🔊'}
                {!isMuted && isPlaying && <span className="sound-wave-anim" />}
              </button>
            </div>

            {/* Right Controls */}
            <div className="controls-right">
              {/* Fullscreen */}
              <button
                className="ctrl-btn fullscreen-ctrl"
                onClick={toggleFullscreen}
                aria-label="ملء الشاشة"
                title="ملء الشاشة"
              >
                {isFullscreen ? '⤓' : '⛶'}
              </button>

              {/* Final Continue Button */}
              <button
                className="finish-watch-btn"
                onClick={onContinue || onClose}
              >
                <span>المتابعة للموقع 🌸</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
