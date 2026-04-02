import { useEffect, useRef } from "react"

type Props = {
  className?: string
  dotCount?: number
  darkColor?: string
  lightColor?: string
}

export function DotConstellation({
  className,
  dotCount = 70,
  darkColor = "234,88,12",
  lightColor = "180,60,10",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let dots: Array<{ x: number; y: number; vx: number; vy: number }> = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
    }

    function init() {
      resize()
      dots = Array.from({ length: dotCount }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }))
    }

    function draw() {
      if (!ctx || !canvas) return
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const isDark = document.documentElement.classList.contains("dark")
      const color = isDark ? darkColor : lightColor
      const dotAlpha = isDark ? 0.6 : 0.3
      const lineAlpha = isDark ? 0.15 : 0.08

      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > W) d.vx *= -1
        if (d.y < 0 || d.y > H) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${dotAlpha})`
        ctx.fill()
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(${color},${lineAlpha * (1 - dist / 120)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [dotCount, darkColor, lightColor])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
