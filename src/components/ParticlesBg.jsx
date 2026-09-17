import { useEffect, useRef } from 'react'

export default function ParticlesBg({ count = 65 }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    // Palette: Orange, Coral, Peach, Pink, Rose, Warm Gold
    const colors = [
      'rgba(255, 122, 24,', // Vibrant orange
      'rgba(249, 115, 22,', // Sunset orange
      'rgba(255, 42, 133,', // Radiant hot pink
      'rgba(236, 72, 153,', // Vibrant pink
      'rgba(251, 146, 60,', // Peach orange
      'rgba(250, 204, 21,', // Warm gold
    ]

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(Math.random() * 0.5 + 0.25),
      size: Math.random() * 4 + 1.2,
      opacity: Math.random() * 0.65 + 0.15,
      type: ['circle', 'heart', 'star'][Math.floor(Math.random() * 3)],
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.01,
    }))

    function drawHeart(ctx, x, y, size) {
      ctx.beginPath()
      ctx.moveTo(x, y + size * 0.3)
      ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3)
      ctx.bezierCurveTo(x - size * 0.5, y + size * 0.6, x, y + size * 0.8, x, y + size)
      ctx.bezierCurveTo(x, y + size * 0.8, x + size * 0.5, y + size * 0.6, x + size * 0.5, y + size * 0.3)
      ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3)
      ctx.closePath()
    }

    function drawStar(ctx, x, y, size) {
      const spikes = 5
      const outer = size
      const inner = size * 0.4
      let rot = (Math.PI / 2) * 3
      const step = Math.PI / spikes
      ctx.beginPath()
      ctx.moveTo(x, y - outer)
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outer, y + Math.sin(rot) * outer)
        rot += step
        ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner)
        rot += step
      }
      ctx.lineTo(x, y - outer)
      ctx.closePath()
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H)

      particles.forEach(p => {
        p.pulse += p.pulseSpeed
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.fillStyle = p.color + alpha + ')'
        ctx.beginPath()

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size * 2)
        } else if (p.type === 'star') {
          drawStar(ctx, p.x, p.y, p.size * 1.5)
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        }

        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        if (p.y < -15) {
          p.y = H + 15
          p.x = Math.random() * W
        }
        if (p.x < -15) p.x = W + 15
        if (p.x > W + 15) p.x = -15
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.8,
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}
