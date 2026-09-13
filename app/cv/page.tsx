// import TextParticles from '../../components/TextParticles' // Uncomment to reactivate animation
import { Metadata } from 'next'
import { pageMetadata } from '../../lib/metadata'
import { Nav } from '../../components/Nav'
import { PageBackground } from '../../components/PageBackground'

export const metadata: Metadata = pageMetadata('CV', '/cv/')

export default function CV() {
  return (
    <main className="min-h-screen relative">
      <PageBackground />

      {/* Content */}
      <div className="relative z-10">
        <Nav />

        {/* CV Content */}
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-12">
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
              I am a fully funded DPhil candidate at the University of Oxford and have been awarded the Advanced Quantitative Methods Award from the Economic and Social Research Council as part of UK Research and Innovation. My supervisors are <a href="https://en.wikipedia.org/wiki/Sheilagh_Ogilvie" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">Sheilagh Ogilvie</a>, <a href="https://en.wikipedia.org/wiki/Stephen_Broadberry" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">Stephen Broadberry</a>, and <a href="https://en.wikipedia.org/wiki/Philip_Torr" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">Philip Torr</a>.
            </p>
          </div>

          {/* Animated Text Particles - DISABLED - Uncomment below to reactivate */}
          {/* <div className="hidden md:block">
            <TextParticles />
          </div> */}
        </div>
      </div>
    </main>
  )
} 