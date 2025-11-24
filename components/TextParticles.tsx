'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  color: string
  speed: number
  opacity: number
  hue: number
}

export default function TextParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      const isMobile = window.innerWidth < 768
      canvas.width = Math.min(2000, window.innerWidth * 0.98)
      canvas.height = isMobile ? 150 : 400
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Particle settings
    const particleSize = 2
    const particleSpacing = 2
    let particles: Particle[] = []
    const texts = ['ECONOMIC HISTORY', 'MACHINE LEARNING']
    let currentTextIndex = 0
    
    // Create particles from text
    const createParticlesFromText = (text: string, isTransition = false) => {
      // Clear before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Set up text style with responsive font size
      const isMobile = window.innerWidth < 768
      const fontSize = isMobile ? 32 : 120
      ctx.font = `bold ${fontSize}px Arial`
      
      // Measure text first without drawing
      const metrics = ctx.measureText(text)
      const actualWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
      // Use font ascent/descent for more reliable height measurement
      const fontAscent = metrics.fontBoundingBoxAscent || metrics.actualBoundingBoxAscent
      const fontDescent = metrics.fontBoundingBoxDescent || metrics.actualBoundingBoxDescent
      const actualHeight = fontAscent + fontDescent
      
      // Calculate position to center text properly
      const textX = canvas.width / 2
      const textY = canvas.height / 2
      
      // Draw text
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#000'
      ctx.fillText(text, textX, textY)
      
      // Sample pixels with higher resolution
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      const newParticles: Particle[] = []

      // Calculate text boundaries with proper centering and extra padding for tall letters
      const startX = Math.floor(textX - actualWidth / 2) - 5
      const startY = Math.floor(textY - actualHeight / 2) - 10  // Extra padding for tall letters like M, L
      const endX = Math.ceil(textX + actualWidth / 2) + 5
      const endY = Math.ceil(textY + actualHeight / 2) + 10

      // Store valid positions for transition
      const validPositions: { x: number; y: number }[] = []

      // Helper function to check if a pixel is part of text
      const isTextPixel = (x: number, y: number) => {
        const idx = (Math.floor(y) * canvas.width + Math.floor(x)) * 4
        const alpha = pixels[idx + 3]
        return alpha > 0
      }

      // Scan for text pixels with higher precision
      for (let y = startY; y < endY; y += particleSpacing) {
        for (let x = startX; x < endX; x += particleSpacing) {
          const hasPixel = (offsetX: number, offsetY: number) => {
            const idx = (Math.floor(y + offsetY) * canvas.width + Math.floor(x + offsetX)) * 4
            const alpha = pixels[idx + 3]
            return alpha > 0
          }

          // Check if this is part of a character's right edge
          const isRightEdge = !isTextPixel(x + 2, y) && isTextPixel(x, y)

          // Comprehensive pixel check
          if (
            hasPixel(-1, -1) || hasPixel(0, -1) || hasPixel(1, -1) ||
            hasPixel(-1, 0)  || hasPixel(0, 0)  || hasPixel(1, 0) ||
            hasPixel(-1, 1)  || hasPixel(0, 1)  || hasPixel(1, 1)
          ) {
            // Add base particle
            validPositions.push({ 
              x: Math.round(x), 
              y: Math.round(y)
            })

            // Add extra particles for right edges (like the G's right side)
            if (isRightEdge) {
              validPositions.push({ 
                x: Math.round(x + 1), 
                y: Math.round(y)
              })
              // Add diagonal particles for better edge coverage
              validPositions.push({ 
                x: Math.round(x + 1), 
                y: Math.round(y + 1)
              })
              validPositions.push({ 
                x: Math.round(x + 1), 
                y: Math.round(y - 1)
              })
            }
          }
        }
      }

      // Create particles
      if (!isTransition) {
        // Initial spawn - spiral formation with staggered entry
        validPositions.forEach((pos, index) => {
          const angle = (index * 0.1) % (Math.PI * 2)
          const distance = 150 + Math.random() * 100
          const baseHue = 220 + (index % 40) * 3
          newParticles.push({
            x: canvas.width / 2 + Math.cos(angle) * distance,
            y: canvas.height / 2 + Math.sin(angle) * distance,
            targetX: pos.x,
            targetY: pos.y,
            size: particleSize,
            color: `hsla(${baseHue}, 75%, 65%, 0.9)`,
            speed: 0.06 + Math.random() * 0.04,
            opacity: 0.9,
            hue: baseHue
          })
        })
      } else {
        // Transition with explosion effect
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        
        // First, scatter existing particles outward briefly
        particles.forEach((particle) => {
          const dx = particle.x - centerX
          const dy = particle.y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const pushDistance = 80
          particle.x += (dx / distance) * pushDistance * 0.3
          particle.y += (dy / distance) * pushDistance * 0.3
        })
        
        // Then assign new targets
        particles.forEach((particle, index) => {
          if (index < validPositions.length) {
            const target = validPositions[index]
            const baseHue = 180 + (index % 40) * 4
            newParticles.push({
              x: particle.x,
              y: particle.y,
              targetX: target.x,
              targetY: target.y,
              size: particleSize,
              color: `hsla(${baseHue}, 70%, 60%, 0.9)`,
              speed: 0.05 + Math.random() * 0.02,
              opacity: 0.9,
              hue: baseHue
            })
          }
        })
        
        // Add new particles if needed with wave entry
        if (validPositions.length > particles.length) {
          for (let i = particles.length; i < validPositions.length; i++) {
            const target = validPositions[i]
            const angle = Math.random() * Math.PI * 2
            const distance = 200
            const baseHue = 180 + (i % 40) * 4
            newParticles.push({
              x: centerX + Math.cos(angle) * distance,
              y: centerY + Math.sin(angle) * distance,
              targetX: target.x,
              targetY: target.y,
              size: particleSize,
              color: `hsla(${baseHue}, 70%, 60%, 0.9)`,
              speed: 0.05 + Math.random() * 0.02,
              opacity: 0.9,
              hue: baseHue
            })
          }
        }
      }

      return newParticles
    }

    // Animation
    let animationFrameId: number
    let lastTime = 0
    const morphInterval = 7000

    const animate = (timestamp: number) => {
      if (!ctx) return

      // Fade out effect for smoother transitions
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        const dx = particle.targetX - particle.x
        const dy = particle.targetY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Smooth easing function
        const ease = 1 - Math.pow(1 - particle.speed, 2)
        particle.x += dx * ease
        particle.y += dy * ease

        // Subtle floating motion when near target
        if (distance < 5) {
          const floatX = Math.sin(timestamp * 0.001 + index * 0.1) * 0.5
          const floatY = Math.cos(timestamp * 0.0015 + index * 0.15) * 0.5
          particle.x += floatX
          particle.y += floatY
        }

        // Dynamic color shift
        const hueShift = Math.sin(timestamp * 0.0005 + index * 0.05) * 10
        const currentHue = particle.hue + hueShift

        // Draw particle with glow effect
        ctx.shadowBlur = 8
        ctx.shadowColor = `hsla(${currentHue}, 70%, 60%, 0.6)`
        
        ctx.fillStyle = `hsla(${currentHue}, 75%, 65%, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(
          Math.round(particle.x),
          Math.round(particle.y),
          particleSize * 1.2,
          0,
          Math.PI * 2
        )
        ctx.fill()
        
        // Reset shadow
        ctx.shadowBlur = 0
      })

      if (timestamp - lastTime > morphInterval) {
        currentTextIndex = (currentTextIndex + 1) % texts.length
        const newParticles = createParticlesFromText(texts[currentTextIndex], true)
        particles = newParticles
        lastTime = timestamp
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    particles = createParticlesFromText(texts[0], false)
    animate(0)

    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="w-full flex justify-center -mt-8 md:mt-0">
      <canvas
        ref={canvasRef}
        style={{ 
          height: 'auto',
          width: '100%',
          maxWidth: '2000px'
        }}
      />
    </div>
  )
} 