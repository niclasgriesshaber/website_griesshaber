import Link from 'next/link'
import Image from 'next/image'
import { FloatingElements } from '../components/FloatingElements'

export default function Home() {
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
              <Link href="/cv" className="text-sm font-medium hover:text-gray-600 transition-colors">CV</Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <div className="flex flex-col items-center">
            {/* Title above image */}
            <h2 className="text-xl md:text-4xl font-light mb-4 md:mb-8 tracking-tight text-center">
              I am a researcher in<br className="md:hidden" /> Economic History and AI.
            </h2>

            {/* Main content with animations - grid to avoid overlap */}
            <div className="relative w-full grid grid-cols-1 lg:[grid-template-columns:minmax(0,320px)_minmax(0,1fr)_minmax(0,320px)] items-center gap-10 mb-4 md:mb-8">
              {/* Left side - Economic History Quotes - Hidden on mobile */}
              <div className="hidden lg:block px-4">
                <div className="relative h-[500px] pointer-events-none">
                  {/* Remove Sheilagh quotes from left column by filtering */}
                  <FloatingElements side="left" />
                </div>
              </div>

              {/* Image Container - responsive size and constrained to center track */}
              <div className="relative justify-self-center w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] z-20">
                <Image
                  src="/griesshaber.jpg"
                  alt="Niclas Griesshaber"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  className="rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100"></div>
              </div>

              {/* Right side - ML Formulas - Hidden on mobile */}
              <div className="hidden lg:block px-4">
                <div className="relative h-[500px] pointer-events-none">
                  <FloatingElements side="right" />
                </div>
              </div>
            </div>
            
            {/* Contact Section */}
            <div className="mb-8 md:mb-16">
              <p className="text-base md:text-xl text-gray-700 font-light text-center px-4">
                Feel free to reach out at{' '}
                <a 
                  href="mailto:niclasgriesshaber@outlook.com"
                  className="text-black hover:text-gray-600 transition-colors border-b border-black/20 hover:border-gray-600"
                >
                  niclasgriesshaber@outlook.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
