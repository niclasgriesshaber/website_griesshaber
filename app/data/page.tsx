import Link from 'next/link'
import { Metadata } from 'next'
import { datasets } from '../../data/datasets'
import { Nav } from '../../components/Nav'
import { PageBackground } from '../../components/PageBackground'

export const metadata: Metadata = {
  title: 'Data - Niclas Griesshaber',
  description: 'Research datasets',
}

const PLATFORM_URL = 'https://historymind.ai'

export default function Data() {
  return (
    <main className="min-h-screen relative">
      <PageBackground />

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
