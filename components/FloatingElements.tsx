'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { formulas } from '../data/formulas'
import { quotes } from '../data/quotes'

interface FloatingElementsProps {
  side: 'left' | 'right'
}

/** Tracks a media query, starting as `false` so server and client agree on the first paint. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function FloatingElements({ side }: FloatingElementsProps) {
  const [topIndex, setTopIndex] = useState(0)
  const [bottomIndex, setBottomIndex] = useState(1)
  // What each slot shows right now, readable from inside the timers.
  const shown = useRef<{ top: number; bottom: number }>({ top: 0, bottom: 1 })
  const [shouldShowTop, setShouldShowTop] = useState(true)
  const [shouldShowBottom, setShouldShowBottom] = useState(false)
  
  const sourceArray = side === 'right' ? formulas : quotes

  // The columns are `hidden lg:block`, so below lg this component would render
  // KaTeX and run its timers for something nobody can see. Gate on the same
  // breakpoint, and hold the cycle still for readers who ask for less motion.
  const isWide = useMediaQuery('(min-width: 1024px)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const animate = isWide && !reduceMotion

  useEffect(() => {
    if (!animate) return

    const FADE_DURATION = 2500;  // 2.5 seconds for fade in/out
    const DISPLAY_DURATION = 10000;  // 10 seconds total cycle
    const OFFSET = 2500;  // 2.5 seconds offset between elements

    // Quotes come up in random order; formulas keep their fixed sequence.
    // A random pick never repeats what either slot is currently showing.
    const random = side === 'left'
    const pickNext = (slot: 'top' | 'bottom'): number => {
      const other = slot === 'top' ? shown.current.bottom : shown.current.top
      const n = sourceArray.length
      let next: number
      if (random) {
        const current = shown.current[slot]
        do {
          next = Math.floor(Math.random() * n)
        } while (n > 2 && (next === current || next === other))
      } else {
        next = (shown.current[slot] + 2) % n
      }
      shown.current[slot] = next
      return next
    }

    // Every timer is tracked so unmounting (e.g. navigating to another tab)
    // tears the whole cycle down instead of leaving it running.
    const timeouts = new Set<ReturnType<typeof setTimeout>>()
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timeouts.delete(id)
        fn()
      }, ms)
      timeouts.add(id)
    }

    // Top cycle starts first
    const topCycle = () => {
      setShouldShowTop(false)  // Start fade out
      later(() => {
        setTopIndex(pickNext('top'))
        setShouldShowTop(true)  // Immediately start fade in
      }, FADE_DURATION)
    }

    // Bottom cycle follows the same pattern with offset
    const bottomCycle = () => {
      setShouldShowBottom(false)  // Start fade out
      later(() => {
        setBottomIndex(pickNext('bottom'))
        setShouldShowBottom(true)  // Immediately start fade in
      }, FADE_DURATION)
    }

    // Combined cycle that maintains the sequence
    const fullCycle = () => {
      topCycle()
      later(bottomCycle, OFFSET)
    }

    // Initial setup - staggered fade in, starting from a random pair when random
    if (random) {
      setTopIndex(pickNext('top'))
    }
    setShouldShowTop(true)
    later(() => {
      setBottomIndex(random ? pickNext('bottom') : 1)
      setShouldShowBottom(true)
    }, OFFSET)

    // Start the cycles
    const interval = setInterval(fullCycle, DISPLAY_DURATION)

    return () => {
      clearInterval(interval)
      timeouts.forEach(clearTimeout)
      timeouts.clear()
    }
  }, [animate, side, sourceArray.length])

  // Each column is split into two halves, one per slot, and a slot's content is
  // centred within its half. Fixed offsets (15% / 55%) let a long quote run
  // into the one below it; halves cannot overlap whatever their length.
  const slotStyle = (position: 'top' | 'bottom'): React.CSSProperties => ({
    position: 'absolute',
    top: position === 'top' ? 0 : '50%',
    height: '50%',
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'visible',
  })

  const renderFormula = (formula: string, position: 'top' | 'bottom', shouldShow: boolean) => (
    <motion.div
      key={`${position}-${formula}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldShow ? 1 : 0 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      style={slotStyle(position)}
    >
      <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', padding: '0 4px' }}>
        <div
          className="katex-display"
          style={{ overflow: 'visible', width: 'max-content', transform: 'scale(0.9)', transformOrigin: 'top center', fontSize: '0.95rem' }}
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(formula, {
              throwOnError: false,
              displayMode: true,
              macros: { "\\mathbb": "\\mathbf" },
              output: 'html'
            })
          }}
        />
      </div>
    </motion.div>
  )

  const renderQuote = (quote: { text: string; author: string }, position: 'top' | 'bottom', shouldShow: boolean) => (
    <motion.div
      key={`${position}-${quote.text}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldShow ? 0.8 : 0 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      style={{
        ...slotStyle(position),
        left: '5%',
        right: 'auto',
        maxWidth: '320px',
        // Cormorant Garamond italic, loaded in app/layout.tsx as --font-quote.
        fontFamily: 'var(--font-quote), Georgia, serif',
        fontStyle: 'italic',
      }}
    >
      <div className="text-left text-gray-800 font-medium">
        <p className="mb-1 text-[1.125rem] leading-snug">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="text-base text-gray-500 text-right">
          — {quote.author}
        </p>
      </div>
    </motion.div>
  )

  if (!isWide) return null

  // Without the cycle running, both slots simply stay on screen.
  const showTop = animate ? shouldShowTop : true
  const showBottom = animate ? shouldShowBottom : true

  return (
    <div className="relative w-full h-full" style={{ overflow: 'visible' }}>
      <div className="absolute inset-0" style={{ overflow: 'visible' }}>
        {side === 'right'
          ? renderFormula(sourceArray[topIndex] as string, 'top', showTop)
          : renderQuote(sourceArray[topIndex] as { text: string; author: string }, 'top', showTop)
        }
        {side === 'right'
          ? renderFormula(sourceArray[bottomIndex] as string, 'bottom', showBottom)
          : renderQuote(sourceArray[bottomIndex] as { text: string; author: string }, 'bottom', showBottom)
        }
      </div>
    </div>
  )
} 