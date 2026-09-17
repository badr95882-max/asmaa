import { useState } from 'react'
import './LanternsRope.css'

const LANTERNS_DATA = [
  {
    id: 1,
    label: 'نورتي يا أسماء ✨',
    color: '#ff9e00',
    glassGlow: 'rgba(255, 170, 0, 0.45)',
    cordLength: 38,
    swayDuration: '4.2s',
    swayDelay: '0s',
    swayDeg: 6,
    scale: 0.95,
  },
  {
    id: 2,
    label: 'فانوس الفرحة 🏮',
    color: '#ff5400',
    glassGlow: 'rgba(255, 84, 0, 0.45)',
    cordLength: 54,
    swayDuration: '3.8s',
    swayDelay: '0.6s',
    swayDeg: -7,
    scale: 1.08,
  },
  {
    id: 3,
    label: 'ضحكتك نور 🌟',
    color: '#ffd166',
    glassGlow: 'rgba(255, 209, 102, 0.5)',
    cordLength: 32,
    swayDuration: '4.6s',
    swayDelay: '1.2s',
    swayDeg: 5,
    scale: 0.9,
  },
  {
    id: 4,
    label: 'أحلى البنات 💖',
    color: '#ff4d6d',
    glassGlow: 'rgba(255, 77, 109, 0.5)',
    cordLength: 60,
    swayDuration: '3.6s',
    swayDelay: '0.3s',
    swayDeg: -8,
    scale: 1.15,
  },
  {
    id: 5,
    label: 'سنة سعيدة عليكي 🎂',
    color: '#ffd166',
    glassGlow: 'rgba(255, 209, 102, 0.5)',
    cordLength: 36,
    swayDuration: '4.4s',
    swayDelay: '1.5s',
    swayDeg: 6,
    scale: 0.92,
  },
  {
    id: 6,
    label: 'فانوس المحبة 🏮',
    color: '#ff7b00',
    glassGlow: 'rgba(255, 123, 0, 0.45)',
    cordLength: 52,
    swayDuration: '3.9s',
    swayDelay: '0.8s',
    swayDeg: -6,
    scale: 1.05,
  },
  {
    id: 7,
    label: 'كل عام وانتي الخير كله 🌸',
    color: '#ff4d6d',
    glassGlow: 'rgba(255, 77, 109, 0.45)',
    cordLength: 40,
    swayDuration: '4.1s',
    swayDelay: '0.4s',
    swayDeg: 5,
    scale: 0.96,
  },
]

export default function LanternsRope() {
  const [activeLantern, setActiveLantern] = useState(null)
  const [swungLantern, setSwungLantern] = useState(null)

  const handleLanternClick = (id) => {
    setSwungLantern(id)
    setActiveLantern(id === activeLantern ? null : id)
    setTimeout(() => setSwungLantern(null), 1200)
  }

  return (
    <div className="lanterns-rope-container" aria-label="حبل الفوانيس المعلقة بأعلى الموقع">
      {/* Top Rope Line with realistic catenary curves */}
      <svg
        className="rope-svg"
        viewBox="0 0 1400 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c8963e" stopOpacity="0.4" />
            <stop offset="20%" stopColor="#f5ca68" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffe494" stopOpacity="1" />
            <stop offset="80%" stopColor="#f5ca68" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c8963e" stopOpacity="0.4" />
          </linearGradient>
          <filter id="ropeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Rope Shadow */}
        <path
          d="M0,8 Q 100,28 200,8 Q 300,32 400,8 Q 500,30 600,8 Q 700,34 800,8 Q 900,30 1000,8 Q 1100,32 1200,8 Q 1300,28 1400,8"
          fill="none"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="3.5"
          strokeDasharray="4 2"
          transform="translate(0, 2)"
        />

        {/* Main Golden Rope with Braided Segments */}
        <path
          d="M0,8 Q 100,28 200,8 Q 300,32 400,8 Q 500,30 600,8 Q 700,34 800,8 Q 900,30 1000,8 Q 1100,32 1200,8 Q 1300,28 1400,8"
          fill="none"
          stroke="url(#ropeGrad)"
          strokeWidth="3"
          filter="url(#ropeGlow)"
        />

        {/* Small golden beads along the rope */}
        {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400].map(
          (cx, i) => (
            <circle
              key={i}
              cx={cx}
              cy={i % 2 === 1 ? 26 : 8}
              r="3.5"
              fill="#ffe382"
              stroke="#b5791c"
              strokeWidth="1"
            />
          )
        )}
      </svg>

      {/* Hanging Lanterns Items */}
      <div className="lanterns-list">
        {LANTERNS_DATA.map((lantern) => {
          const isInteracting = swungLantern === lantern.id
          return (
            <div
              key={lantern.id}
              className={`lantern-wrapper ${isInteracting ? 'lantern-boosted-sway' : ''}`}
              style={{
                '--sway-duration': lantern.swayDuration,
                '--sway-delay': lantern.swayDelay,
                '--sway-deg': `${lantern.swayDeg}deg`,
                '--cord-len': `${lantern.cordLength}px`,
                '--lantern-scale': lantern.scale,
                '--glass-glow': lantern.glassGlow,
                '--primary-color': lantern.color,
              }}
              onClick={() => handleLanternClick(lantern.id)}
              onMouseEnter={() => setActiveLantern(lantern.id)}
              onMouseLeave={() => setActiveLantern(null)}
              role="button"
              tabIndex={0}
              aria-label={`فانوس: ${lantern.label}`}
            >
              {/* Hanging cord / golden chain */}
              <div className="lantern-cord">
                <div className="cord-line" />
                <div className="cord-ring" />
              </div>

              {/* Lantern Graphic */}
              <div className="lantern-body-box">
                {/* Ambient glow behind lantern */}
                <div className="lantern-ambient-glow" />

                {/* SVG Detailed Lantern */}
                <svg
                  className="fanous-svg"
                  viewBox="0 0 70 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id={`glow-${lantern.id}`} cx="50%" cy="55%" r="50%">
                      <stop offset="0%" stopColor="#fff8db" stopOpacity="1" />
                      <stop offset="35%" stopColor={lantern.color} stopOpacity="0.9" />
                      <stop offset="80%" stopColor="#b45309" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
                    </radialGradient>

                    <linearGradient id={`metal-${lantern.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#92400e" />
                      <stop offset="30%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#fef08a" />
                      <stop offset="70%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>

                    <linearGradient id="glassFacet" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                      <stop offset="30%" stopColor="rgba(255,255,255,0.05)" />
                      <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                    </linearGradient>
                  </defs>

                  {/* 1. Top Hanging Ring */}
                  <circle
                    cx="35"
                    cy="8"
                    r="5.5"
                    stroke={`url(#metal-${lantern.id})`}
                    strokeWidth="2.5"
                    fill="none"
                  />

                  {/* Crescent & Star Top Finial */}
                  <path
                    d="M33,14 C30,14 28,16 28,18 C28,21 31,23 34,23 C32.5,22 31.5,20.5 31.5,18.5 C31.5,16.5 32.5,15 33,14 Z"
                    fill="#fef08a"
                  />
                  <polygon
                    points="37,17 38,19 40,19 38.5,20 39,22 37,21 35.5,22 36,20 34.5,19 36.5,19"
                    fill="#fef08a"
                  />

                  {/* 2. Top Dome Cap */}
                  <path
                    d="M20,28 Q35,20 50,28 L54,34 L16,34 Z"
                    fill={`url(#metal-${lantern.id})`}
                    stroke="#78350f"
                    strokeWidth="0.8"
                  />

                  {/* Decorative arches on cap */}
                  <path
                    d="M22,34 Q28,29 35,29 Q42,29 48,34"
                    stroke="#fffbeb"
                    strokeWidth="0.8"
                    fill="none"
                  />

                  {/* Upper Rim */}
                  <rect
                    x="14"
                    y="34"
                    width="42"
                    height="4"
                    rx="1.5"
                    fill={`url(#metal-${lantern.id})`}
                  />

                  {/* 3. Glass Chamber (Body) with Internal Glow */}
                  <path
                    d="M16,38 L8,75 L22,96 L48,96 L62,75 L54,38 Z"
                    fill={`url(#glow-${lantern.id})`}
                    className="fanous-glass"
                  />

                  {/* Glass Shimmer Reflection */}
                  <path
                    d="M16,38 L8,75 L22,96 L48,96 L62,75 L54,38 Z"
                    fill="url(#glassFacet)"
                  />

                  {/* Flickering Flame / Candle inside */}
                  <g className="fanous-flame-group">
                    <ellipse cx="35" cy="72" rx="4.5" ry="9" fill="#fff" opacity="0.9" />
                    <path
                      d="M35,60 C37,65 39,70 37,76 C35,79 33,78 32,75 C31,71 33,65 35,60 Z"
                      fill="#ffea79"
                      className="fanous-flame"
                    />
                    <circle cx="35" cy="73" r="2.5" fill="#f97316" />
                  </g>

                  {/* Metal Framework Ribs & Pillars */}
                  <path
                    d="M16,38 L8,75 L22,96 M54,38 L62,75 L48,96"
                    stroke={`url(#metal-${lantern.id})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Center Vertical Ribs */}
                  <line
                    x1="28"
                    y1="38"
                    x2="24"
                    y2="75"
                    stroke={`url(#metal-${lantern.id})`}
                    strokeWidth="1.2"
                  />
                  <line
                    x1="24"
                    y1="75"
                    x2="31"
                    y2="96"
                    stroke={`url(#metal-${lantern.id})`}
                    strokeWidth="1.2"
                  />

                  <line
                    x1="42"
                    y1="38"
                    x2="46"
                    y2="75"
                    stroke={`url(#metal-${lantern.id})`}
                    strokeWidth="1.2"
                  />
                  <line
                    x1="46"
                    y1="75"
                    x2="39"
                    y2="96"
                    stroke={`url(#metal-${lantern.id})`}
                    strokeWidth="1.2"
                  />

                  {/* Horizontal Rib Band */}
                  <path
                    d="M8,75 L62,75"
                    stroke={`url(#metal-${lantern.id})`}
                    strokeWidth="1.8"
                  />

                  {/* 4. Lower Pedestal / Base */}
                  <rect
                    x="20"
                    y="96"
                    width="30"
                    height="5"
                    rx="1.5"
                    fill={`url(#metal-${lantern.id})`}
                  />
                  <path
                    d="M22,101 L26,108 L44,108 L48,101 Z"
                    fill={`url(#metal-${lantern.id})`}
                    stroke="#78350f"
                    strokeWidth="0.8"
                  />

                  {/* 5. Dangling Bottom Tassel / Drop Jewel */}
                  <line x1="35" y1="108" x2="35" y2="114" stroke="#d97706" strokeWidth="1.5" />
                  <circle cx="35" cy="115" r="2.5" fill="#fef08a" stroke="#b45309" strokeWidth="0.8" />
                </svg>

                {/* Floating sparkles on active/hover */}
                {activeLantern === lantern.id && (
                  <div className="lantern-sparkles" aria-hidden="true">
                    <span>✨</span>
                    <span>⭐</span>
                    <span>💖</span>
                  </div>
                )}
              </div>

              {/* Tooltip on Hover / Tap */}
              <div className={`lantern-tooltip ${activeLantern === lantern.id ? 'tooltip-open' : ''}`}>
                <span className="tooltip-text">{lantern.label}</span>
                <div className="tooltip-arrow" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
