import Link from 'next/link'
import { Metadata } from 'next'
import { upcoming, past, type Event } from '../../data/events'
import { Nav } from '../../components/Nav'

export const metadata: Metadata = {
  title: 'Events - Niclas Griesshaber',
  description: 'Upcoming and past talks, workshops, and events',
}

function stripYear(date: string): string {
  return date.replace(/,\s*\d{4}$/, '')
}

function groupByYear(events: Event[]): { year: string; items: Event[] }[] {
  const groups = new Map<string, Event[]>()
  for (const e of events) {
    const m = e.date.match(/\b(\d{4})\b/)
    const y = m ? m[1] : 'Other'
    if (!groups.has(y)) groups.set(y, [])
    groups.get(y)!.push(e)
  }
  return [...groups.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, items]) => ({ year, items }))
}

export default function Events() {
  const upcomingByYear = groupByYear(upcoming).sort((a, b) => {
    const na = Number(a.year)
    const nb = Number(b.year)
    if (Number.isNaN(na)) return 1
    if (Number.isNaN(nb)) return -1
    return na - nb
  })
  const pastByYear = groupByYear(past)

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
          {upcoming.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-medium tracking-tight mb-4">Upcoming</h2>
              <div className="space-y-5">
                {upcomingByYear.map(({ year, items }) => (
                  <div key={year}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">
                      {year === 'Other' ? 'Date TBA' : year}
                    </h3>
                    <ul className="divide-y divide-gray-200/70">
                      {items.map((e, i) => (
                        <li
                          key={i}
                          className="py-3 flex flex-col md:flex-row md:gap-4 md:items-baseline text-sm"
                        >
                          {year !== 'Other' && (
                            <span className="md:w-36 flex-shrink-0 text-xs uppercase tracking-wider text-gray-500 font-medium">
                              {stripYear(e.date)}
                            </span>
                          )}
                          <span className="md:w-28 flex-shrink-0 text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-0.5 md:mt-0">
                            {e.type}
                          </span>
                          <div className="flex-1 min-w-0 leading-snug mt-0.5 md:mt-0">
                            <p>
                              <span className="font-medium text-gray-900">{e.title}</span>
                              {e.note && (
                                <span className="text-gray-400 italic"> &middot; {e.note}</span>
                              )}
                            </p>
                            {e.venue && (
                              <p className="text-gray-600">{e.venue}</p>
                            )}
                            {e.link && (
                              <p className="mt-0.5">
                                <Link
                                  href={e.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:text-blue-600 transition-colors"
                                >
                                  Register &rarr;
                                </Link>
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {pastByYear.length > 0 && (
            <section>
              <h2 className="text-xl font-medium tracking-tight mb-4">Past</h2>
              <div className="space-y-5">
                {pastByYear.map(({ year, items }) => (
                  <div key={year}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">
                      {year}
                    </h3>
                    <ul className="divide-y divide-gray-200/70">
                      {items.map((e, i) => (
                        <li
                          key={i}
                          className="py-2.5 flex flex-col md:flex-row md:gap-4 md:items-baseline text-sm"
                        >
                          <span className="md:w-28 flex-shrink-0 text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-0.5 md:mt-0">
                            {e.type}
                          </span>
                          <div className="flex-1 min-w-0 leading-snug mt-0.5 md:mt-0">
                            <p>
                              {e.link ? (
                                <Link
                                  href={e.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                  {e.title}
                                </Link>
                              ) : (
                                <span className="font-medium text-gray-900">
                                  {e.title}
                                </span>
                              )}
                              {e.note && (
                                <span className="text-gray-400 italic"> &middot; {e.note}</span>
                              )}
                            </p>
                            {e.venue && (
                              <p className="text-gray-600">{e.venue}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
