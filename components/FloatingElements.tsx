'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { formulas } from '../data/formulas'
import { quotes } from '../data/quotes'

interface FloatingElementsProps {
  side: 'left' | 'right'
}

export function FloatingElements({ side }: FloatingElementsProps) {
  const [topIndex, setTopIndex] = useState(0)
  const [bottomIndex, setBottomIndex] = useState(1)
  const [shouldShowTop, setShouldShowTop] = useState(true)
  const [shouldShowBottom, setShouldShowBottom] = useState(false)
  
  // For the home page left column, exclude quotes by Sheilagh Ogilvie per request
  const sourceArray = side === 'right'
    ? formulas
    : quotes.filter(q => q.author !== 'Sheilagh Ogilvie')

  useEffect(() => {
    const startCycles = () => {
      const FADE_DURATION = 2500;  // 2.5 seconds for fade in/out
      const DISPLAY_DURATION = 10000;  // 10 seconds total cycle
      const OFFSET = 2500;  // 2.5 seconds offset between elements

      // Top cycle starts first
      const topCycle = () => {
        setShouldShowTop(false)  // Start fade out
        setTimeout(() => {
          setTopIndex(current => (current + 2) % sourceArray.length)
          setShouldShowTop(true)  // Immediately start fade in
        }, FADE_DURATION)
      }

      // Bottom cycle follows the same pattern with offset
      const bottomCycle = () => {
        setShouldShowBottom(false)  // Start fade out
        setTimeout(() => {
          setBottomIndex(current => (current + 2) % sourceArray.length)
          setShouldShowBottom(true)  // Immediately start fade in
        }, FADE_DURATION)
      }

      // Combined cycle that maintains the sequence
      const fullCycle = () => {
        topCycle()
        setTimeout(bottomCycle, OFFSET)
      }

      // Initial setup - staggered fade in
      setShouldShowTop(true)
      setTimeout(() => {
        setBottomIndex(1)
        setShouldShowBottom(true)
      }, OFFSET)

      // Start the cycles
      const interval = setInterval(fullCycle, DISPLAY_DURATION)
      return () => clearInterval(interval)
    }

    startCycles()
  }, [sourceArray.length])

  const renderFormula = (formula: string, position: 'top' | 'bottom', shouldShow: boolean) => (
    <motion.div
      key={`${position}-${formula}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldShow ? 1 : 0 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        top: position === 'top' ? '15%' : '55%',
        left: 0,
        right: 0,
        zIndex: 10,
        overflow: 'visible',
        width: '100%'
      }}
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
        position: 'absolute',
        top: position === 'top' ? '15%' : '55%',
        left: '5%',
        maxWidth: '320px',
        zIndex: 10,
        fontFamily: 'Computer Modern'
      }}
    >
      <div className="text-left">
        <p className="mb-2 text-base leading-relaxed italic" style={{ fontSize: '1rem' }}>
          {quote.text}
        </p>
        <p className="text-sm text-gray-500 text-right italic">
          — {quote.author}
        </p>
      </div>
    </motion.div>
  )

  return (
    <div className="relative w-full h-full" style={{ overflow: 'visible' }}>
      <div className="absolute inset-0" style={{ overflow: 'visible' }}>
        {side === 'right' 
          ? renderFormula(sourceArray[topIndex] as string, 'top', shouldShowTop)
          : renderQuote(sourceArray[topIndex] as { text: string; author: string }, 'top', shouldShowTop)
        }
        {side === 'right'
          ? renderFormula(sourceArray[bottomIndex] as string, 'bottom', shouldShowBottom)
          : renderQuote(sourceArray[bottomIndex] as { text: string; author: string }, 'bottom', shouldShowBottom)
        }
      </div>
    </div>
  )
} 