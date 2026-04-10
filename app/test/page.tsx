import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test - Niclas Griesshaber',
  description: 'Test page',
}

export default function Test() {
  return (
    <main className="min-h-screen relative">
      {/* Animated Background Elements - Optimized for performance */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 overflow-hidden">
        {/* Animated gradient orbs with GPU acceleration */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] animate-pulse-slow will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(147,197,253,0.1) 50%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
        <div
          className="absolute top-[20%] right-[-20%] w-[1000px] h-[1000px] animate-pulse-slower will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(165,180,252,0.1) 50%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[30%] w-[900px] h-[900px] animate-float will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(167,139,250,0.1) 50%, transparent 70%)',
            filter: 'blur(70px)',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header/Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-medium tracking-tight">
              <Link href="/">Niclas Griesshaber</Link>
            </h1>
            <div className="space-x-4 md:space-x-8">
              <Link href="/research" className="text-sm font-medium hover:text-gray-600 transition-colors">RESEARCH</Link>
              <Link href="/test" className="text-sm font-medium hover:text-gray-600 transition-colors">TEST</Link>
              <Link href="/cv" className="text-sm font-medium hover:text-gray-600 transition-colors">CV</Link>
            </div>
          </div>
        </nav>

        {/* Test Content */}
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-24">
          <p className="text-gray-800 text-justify leading-relaxed">
            This was a test
          </p>
        </div>
      </div>
    </main>
  )
}
