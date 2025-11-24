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
        // Initial spawn - circular formation
        validPositions.forEach(pos => {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * 100
          newParticles.push({
            x: canvas.width / 2 + Math.cos(angle) * distance,
            y: canvas.height / 2 + Math.sin(angle) * distance,
            targetX: pos.x,
            targetY: pos.y,
            size: particleSize,
            color: `rgba(99, 102, 241, 0.95)`,
            speed: 0.08 + Math.random() * 0.04
          })
        })
      } else {
        // Transition logic - reuse and reassign particles
        // First, reuse existing particles
        particles.forEach((particle, index) => {
          if (index < validPositions.length) {
            const target = validPositions[index]
            newParticles.push({
              x: particle.x,
              y: particle.y,
              targetX: target.x,
              targetY: target.y,
              size: particleSize,
              color: `rgba(99, 102, 241, 0.95)`,
              speed: 0.07 + Math.random() * 0.02
            })
          }
        })
        
        // Add new particles if needed
        if (validPositions.length > particles.length) {
          for (let i = particles.length; i < validPositions.length; i++) {
            const target = validPositions[i]
            // Create new particles from the edges
            const edgeX = target.x < canvas.width / 2 ? -20 : canvas.width + 20
            newParticles.push({
              x: edgeX,
              y: target.y,
              targetX: target.x,
              targetY: target.y,
              size: particleSize,
              color: `rgba(99, 102, 241, 0.95)`,
              speed: 0.07 + Math.random() * 0.02
            })
          }
        }
      }

      return newParticles
    }

    // Animation
    let animationFrameId: number
    let lastTime = 0
    const morphInterval = 8000

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        const dx = particle.targetX - particle.x
        const dy = particle.targetY - particle.y
        
        // Smooth easing for fluid movement
        particle.x += dx * particle.speed
        particle.y += dy * particle.speed

        // Draw particle
        ctx.fillStyle = particle.color
        ctx.fillRect(
          particle.x,
          particle.y,
          particleSize,
          particleSize
        )
      })

      // Morph to next text at interval
      if (timestamp - lastTime > morphInterval) {
        currentTextIndex = (currentTextIndex + 1) % texts.length
        const newParticles = createParticlesFromText(texts[currentTextIndex], true)
        if (newParticles.length > 0) {
          particles = newParticles
        }
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