import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research - Niclas Griesshaber',
  description: 'Research',
}

export default function Research() {
  return (
    <main className="relative">
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
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-medium tracking-tight">
            <Link href="/">Niclas Griesshaber</Link>
          </h1>
          <div className="space-x-8">
            <Link href="/research" className="text-sm font-medium hover:text-gray-600 transition-colors">RESEARCH</Link>
            <Link href="/cv" className="text-sm font-medium hover:text-gray-600 transition-colors">CV</Link>
          </div>
        </nav>

        {/* Research Content */}
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
          {/* Vision Statement */}
          <div className="mb-12 space-y-6">
            <div className="space-y-4">
              <p className="text-gray-800 text-justify leading-relaxed">
                Multimodal large language models enable us to build large-scale historical datasets from archival image scans at faster speed than ever before.
              </p>

              <p className="text-gray-800 text-justify leading-relaxed">
                With this new abundance of microlevel data, we can increase the resolution of our understanding. Institutions mattered, but how did they interact with technological change and economic growth at the local level?
              </p>

              <p className="text-gray-800 text-justify leading-relaxed">
                In the long term I aim to build AI Historians: agents that read archives, build datasets, and reason across entire corpora. They could process more primary sources in a day than a human could in a lifetime and support their claims linked to the original scans. If they find new patterns, mechanistic interpretability can help us to understand their reasoning.
              </p>
            </div>
          </div>

          {/* Papers */}
          <section>
            <h2 className="text-2xl font-medium mb-3 tracking-tight border-b pb-2">
              Papers
            </h2>
            <div className="space-y-6">
              {/* Sheilagh paper on top */}
              <div className="p-4 -mx-4">
                <h3 className="text-xl font-light mb-2 leading-relaxed">
                  <Link href="https://cepr.org/publications/dp20556" target="_blank" rel="noopener noreferrer">
                    Transplanting Craft Guilds to Colonial Latin America: A Large Language Model Analysis
                  </Link>
                </h3>
                <p className="text-gray-600 text-base">
                  <span className="italic">with </span>
                  <Link href="https://www.sheilaghogilvie.com/" className="text-blue-500 hover:text-blue-600 transition-colors">
                    Sheilagh Ogilvie
                  </Link>
                </p>
              </div>

              {/* ArXiv paper with link */}
              <div className="p-4 -mx-4">
                <h3 className="text-xl font-light mb-2 leading-relaxed">
                  <Link href="https://arxiv.org/abs/2504.00414" target="_blank" rel="noopener noreferrer">
                    Multimodal LLMs for OCR, OCR Post-Correction, and NER in Historical Documents
                  </Link>
                </h3>
                <p className="text-gray-600 text-base">
                  <span className="italic">with </span>
                  Gavin Greif and Robin Greif
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 