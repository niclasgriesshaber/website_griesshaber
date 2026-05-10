import Link from 'next/link'
import { Metadata } from 'next'
import { Nav } from '../../components/Nav'

export const metadata: Metadata = {
  title: 'Blog - Niclas Griesshaber',
  description: 'Latest posts from my Substack',
}

type Post = {
  title: string
  link: string
  date: string
  excerpt: string
  image: string
  readTime: number
}

const FEED_URL = 'https://aieconhistory.substack.com/feed'
const SUBSTACK_URL = 'https://aieconhistory.substack.com'
// Substack 403s requests from GitHub Actions runner IPs (Cloudflare bot
// detection), so we proxy through rss2json. Their free tier serves up to
// 10k requests/day; we use ~1/build, with a daily cron rebuild.
const PROXY_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`
const EXCERPT_CHARS = 240
const WORDS_PER_MINUTE = 200

type ProxyItem = {
  title?: string
  link?: string
  pubDate?: string
  description?: string
  content?: string
  thumbnail?: string
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function plainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function buildExcerpt(content: string, fallback: string): string {
  const text = plainText(content)
  if (!text) return fallback
  if (text.length <= EXCERPT_CHARS) return text
  const cut = text.slice(0, EXCERPT_CHARS)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…'
}

function firstBodyImage(content: string): string {
  const m = content.match(/<img[^>]+src="([^"]+)"/)
  return m ? decodeEntities(m[1]) : ''
}

function readTimeMin(content: string): number {
  const words = plainText(content).split(/\s+/).filter(Boolean).length
  return words ? Math.max(1, Math.round(words / WORDS_PER_MINUTE)) : 0
}

function fmtDate(s: string): string {
  if (!s) return ''
  const d = new Date(s)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

async function getPosts(): Promise<Post[]> {
  const headers = {
    'User-Agent': 'NiclasBlog/1.0 (+https://niclasgriesshaber.com)',
    'Accept': 'application/json',
  }
  const MAX_ATTEMPTS = 3

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(PROXY_URL, { headers, next: { revalidate: 3600 } })
      if (!res.ok) {
        console.error(`[blog] proxy attempt ${attempt} returned status ${res.status}`)
      } else {
        const data = (await res.json()) as { status?: string; items?: ProxyItem[] }
        if (data.status !== 'ok') {
          console.error(`[blog] proxy attempt ${attempt} returned status field "${data.status}"`)
        } else if (!data.items || data.items.length === 0) {
          console.error(`[blog] proxy attempt ${attempt} returned 0 items`)
        } else {
          return data.items.slice(0, 10).map((item) => {
            const content = item.content ?? ''
            return {
              title: item.title ?? '',
              link: item.link ?? '',
              date: item.pubDate ?? '',
              excerpt: buildExcerpt(content, item.description ?? ''),
              image: item.thumbnail || firstBodyImage(content),
              readTime: readTimeMin(content),
            }
          })
        }
      }
    } catch (err) {
      console.error(`[blog] proxy attempt ${attempt} threw:`, err)
    }
    if (attempt < MAX_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, 1000 * attempt))
    }
  }

  console.error('[blog] all proxy attempts failed; rendering empty state')
  return []
}

export default async function Blog() {
  const posts = await getPosts()

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
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-xl font-medium tracking-tight">Blog</h2>
              <Link
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                Subscribe on Substack &rarr;
              </Link>
            </div>

            {posts.length === 0 ? (
              <p className="text-gray-700">
                Latest posts available at{' '}
                <Link
                  href={SUBSTACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  aieconhistory.substack.com
                </Link>
                .
              </p>
            ) : (
              <ul className="space-y-8">
                {posts.map((post) => (
                  <li key={post.link} className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {post.image && (
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 block overflow-hidden rounded-md md:w-48"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.image}
                          alt=""
                          className="w-full md:w-48 aspect-[4/3] object-cover transition-transform duration-300 hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </Link>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {fmtDate(post.date)}
                        {post.readTime > 0 && (
                          <span> &middot; {post.readTime} min read</span>
                        )}
                      </p>
                      <h3 className="text-base md:text-lg font-medium leading-snug mb-1">
                        <Link
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">
                          {post.excerpt}
                        </p>
                      )}
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        Read on Substack &rarr;
                      </Link>
                    </div>
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
