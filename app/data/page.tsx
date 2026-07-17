import Link from 'next/link'
import { Metadata } from 'next'
import { datasets } from '../../data/datasets'
import { Nav } from '../../components/Nav'

export const metadata: Metadata = {
  title: 'Data - Niclas Griesshaber',
  description: 'Research datasets',
}

const PLATFORM_URL = 'https://historymind.ai'

export default function Data() {
  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 overflow-hidden">
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

      <div className="relative z-10">
        <Nav />

        <div className="max-w-4xl mx-auto px-6 pt-8 pb-24">
          <section>
            <h2 className="text-xl font-medium tracking-tight mb-5">Data</h2>

            {datasets.length === 0 ? (
              <p className="text-gray-700">
                Datasets coming soon at{' '}
                <Link
                  href={PLATFORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  historymind.ai
                </Link>
                .
              </p>
            ) : (
              <ul className="space-y-6">
                {datasets.map((d) => (
                  <li key={d.link}>
                    <h3 className="text-base md:text-lg font-medium leading-snug">
                      <Link
                        href={d.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {d.name}
                      </Link>
                    </h3>
                    {d.description && (
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                        {d.description}
                      </p>
                    )}
                    <p className="mt-1.5">
                      <Link
                        href={d.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        Download on historymind.ai &rarr;
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
