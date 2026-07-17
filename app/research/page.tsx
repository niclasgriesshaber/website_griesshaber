import Link from 'next/link'
import { Metadata } from 'next'
import { Nav } from '../../components/Nav'

export const metadata: Metadata = {
  title: 'Research - Niclas Griesshaber',
  description: 'Research',
}

export default function Research() {
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
        <Nav />

        {/* Research Content */}
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-24">
          {/* Vision Statement */}
          <div className="mb-10 space-y-4">
            <p className="text-gray-800 text-justify leading-relaxed">
              I build large-scale historical datasets from archival image scans using multimodal large language models to study how individuals, firms, and cities interacted with the German patent system and responded to technological change during the Second Industrial Revolution.
            </p>

            <p className="text-gray-800 text-justify leading-relaxed">
              Alongside this work, I develop{' '}
              <Link
                href="https://ai-historian.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                AI Co-Historians
              </Link>
              {' '}in AI for History (AI4History) to support historical research workflows and help historians analyse millions of previously unread primary sources. My goal is to accelerate historical research while giving historians more agency and leverage in understanding our past.
            </p>
          </div>

          {/* Papers */}
          <section>
            <div className="mb-5">
              <h2 className="text-xl font-medium tracking-tight">Papers</h2>
            </div>
            <div className="space-y-6">
              {/* Pretraining Language Models on Historical Text */}
              <div>
                <h3 className="text-base font-medium leading-snug">
                  <Link
                    href="https://arxiv.org/abs/2606.02991"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    Pretraining Language Models on Historical Text
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  <span className="italic">with </span>
                  Xiaoxi Luo,{' '}
                  <Link
                    href="https://zlshinnick.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Zachary Shinnick
                  </Link>
                  , Yixuan Wang, Junchi Yu,{' '}
                  <Link
                    href="https://cs.uwaterloo.ca/~fhs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Freda Shi
                  </Link>
                  ,{' '}
                  <Link
                    href="https://ai2050.schmidtsciences.org/fellow/philip-torr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Philip Torr
                  </Link>
                  , and{' '}
                  <Link
                    href="https://yaolu.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Yao Lu
                  </Link>
                </p>
              </div>

              {/* Chronos: The AI Co-Historian */}
              <div>
                <h3 className="text-base font-medium leading-snug">
                  <Link
                    href="https://arxiv.org/abs/2604.03553"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    Chronos: The AI Co-Historian
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  <span className="italic">with </span>
                  <Link
                    href="https://hufe.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Lorenz Hufe
                  </Link>
                  , Gavin Greif, Sebastian Oliver Eck, and{' '}
                  <Link
                    href="https://ai2050.schmidtsciences.org/fellow/philip-torr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Philip Torr
                  </Link>
                </p>
              </div>

              {/* German Patents paper */}
              <div>
                <h3 className="text-base font-medium leading-snug">
                  <Link
                    href="https://arxiv.org/abs/2512.19675"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    Multimodal LLMs for Historical Dataset Construction from Archival Image Scans: German Patents (1877-1918)
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  <span className="italic">with </span>
                  <Link
                    href="https://www.vwl.uni-mannheim.de/streb/team/prof-dr-streb"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Jochen Streb
                  </Link>
                </p>
              </div>

              {/* ArXiv paper with link */}
              <div>
                <h3 className="text-base font-medium leading-snug">
                  <Link
                    href="https://arxiv.org/abs/2504.00414"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    Multimodal LLMs for OCR, OCR Post-Correction, and NER in Historical Documents
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  <span className="italic">with </span>
                  Gavin Greif and Robin Greif
                </p>
              </div>

              {/* Sheilagh paper */}
              <div>
                <h3 className="text-base font-medium leading-snug">
                  <Link
                    href="https://cepr.org/publications/dp20556"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    Transplanting Craft Guilds to Colonial Latin America: A Large Language Model Analysis
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  <span className="italic">with </span>
                  <Link
                    href="https://www.sheilaghogilvie.com/"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Sheilagh Ogilvie
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 