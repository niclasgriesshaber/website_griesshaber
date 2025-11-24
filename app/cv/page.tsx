import Link from 'next/link'
import TextParticles from '../../components/TextParticles'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CV - Niclas Griesshaber',
  description: 'Download CV as PDF',
}

export default function CV() {
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
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-xl font-medium tracking-tight">
            <Link href="/">Niclas Griesshaber</Link>
          </h1>
          <div className="space-x-8">
            <Link href="/research" className="text-sm font-medium hover:text-gray-600 transition-colors">RESEARCH</Link>
            <Link href="/cv" className="text-sm font-medium hover:text-gray-600 transition-colors">CV</Link>
          </div>
        </nav>

        {/* CV Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Download Button */}
          <div className="mb-12 text-center">
            <a 
              href="/cv_griesshaber.pdf" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download my CV
            </a>
          </div>

          {/* CV Text */}
          <div className="space-y-6 mb-12">
            <p className="text-gray-800 text-justify leading-relaxed">
              I am a fully funded DPhil candidate at the University of Oxford and have been awarded the Advanced Quantitative Methods Award from the Economic and Social Research Council as part of UK Research and Innovation.
            </p>
            <p className="text-gray-800 text-justify leading-relaxed">
              I graduated at the top of my class in the MSc Economic and Social History at the University of Oxford and completed the MSc Computational Statistics and Machine Learning with Distinction at University College London (UCL). I completed two separate bachelor&apos;s degrees at the University of Tübingen, where I ranked third in my cohort in the BSc Economics and graduated among the Top 10% in the BSc Cognitive Science. I am also very grateful for the opportunity to have studied at National University of Singapore, Asia&apos;s best university.
            </p>
          </div>

          {/* Animated Text Particles - Hidden on mobile */}
          <div className="hidden md:block">
            <TextParticles />
          </div>
        </div>
      </div>
    </main>
  )
} 