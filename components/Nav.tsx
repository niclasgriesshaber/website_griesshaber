'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/research', label: 'RESEARCH' },
  { href: '/data', label: 'DATA' },
  { href: '/blog', label: 'BLOG' },
  { href: '/events', label: 'EVENTS' },
  { href: '/cv', label: 'CV' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const pathname = usePathname()

  const normalize = (p: string) => p.replace(/\/+$/, '') || '/'
  const isActive = (href: string) => normalize(pathname ?? '') === normalize(href)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-medium tracking-tight">
            <Link href="/" onClick={close}>Niclas Griesshaber</Link>
          </h1>

          {/* Desktop links */}
          <div className="hidden md:flex md:space-x-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(l.href) ? 'text-blue-600' : 'hover:text-gray-600'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile burger toggle */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden -mr-2 p-2.5 text-gray-700 hover:text-black transition-colors"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown — animated */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={close}
                    className={`text-sm font-medium py-4 transition-colors ${
                      isActive(l.href) ? 'text-blue-600' : 'hover:text-gray-600'
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Tap-outside-to-close backdrop (mobile only) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden fixed inset-0 z-40 bg-transparent"
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}
