import Link from 'next/link'
import { Metadata } from 'next'
import { Nav } from '../../components/Nav'
import { PageBackground } from '../../components/PageBackground'

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
  /** srcSet of CDN-resized variants; empty when the CDN is unavailable. */
  imageSrcSet: string
  readTime: number
}

const FEED_URL = 'https://aieconhistory.substack.com/feed'
const SUBSTACK_URL = 'https://substack.com/@niclasgriesshaber'
// Substack 403s requests from GitHub Actions runner IPs (Cloudflare bot
// detection), so we proxy through rss2json. Their free tier serves up to
// 10k requests/day; we use ~1/build, with a daily cron rebuild.
// rss2json's first cold fetch of a feed often fails and the error can be
// served from its cache, so later attempts add a cache-busting param to
// the feed URL to force a fresh fetch.
function proxyUrl(attempt: number): string {
  const feed = attempt <= 1 ? FEED_URL : `${FEED_URL}?cb=${attempt}`
  return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`
}
const EXCERPT_CHARS = 240
const WORDS_PER_MINUTE = 200

type ProxyItem = {
  title?: string
  link?: string
  pubDate?: string
  description?: string
  content?: string
  thumbnail?: string
  enclosure?: { link?: string; type?: string }
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

// Substack's RSS links the untouched S3 original (often >300kB, ~1200px wide)
// for a thumbnail we render at 192px. Substack's own image CDN re-serves any
// URL at a given width, which is ~14x smaller. We verify it at build time and
// fall back to the original if it ever stops answering, so the static HTML
// never points at a URL we haven't checked.
const THUMB_WIDTHS = [400, 800]

function cdnUrl(src: string, width: number): string {
  const opts = `w_${width},c_limit,f_auto,q_auto:good,fl_progressive:steep`
  return `https://substackcdn.com/image/fetch/${opts}/${encodeURIComponent(src)}`
}

async function cdnSrcSet(src: string): Promise<string> {
  if (!/^https?:\/\//.test(src)) return ''
  try {
    const res = await fetch(cdnUrl(src, THUMB_WIDTHS[0]), { method: 'HEAD' })
    if (!res.ok) {
      console.error(`[blog] image CDN returned ${res.status} for ${src}`)
      return ''
    }
  } catch (err) {
    console.error(`[blog] image CDN check threw for ${src}:`, err)
    return ''
  }
  return THUMB_WIDTHS.map((w) => `${cdnUrl(src, w)} ${w}w`).join(', ')
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
  const MAX_ATTEMPTS = 5

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(proxyUrl(attempt), { headers, next: { revalidate: 3600 } })
      if (!res.ok) {
        console.error(`[blog] proxy attempt ${attempt} returned status ${res.status}`)
      } else {
        const data = (await res.json()) as { status?: string; items?: ProxyItem[] }
        if (data.status !== 'ok') {
          console.error(`[blog] proxy attempt ${attempt} returned status field "${data.status}"`)
        } else if (!data.items || data.items.length === 0) {
          console.error(`[blog] proxy attempt ${attempt} returned 0 items`)
        } else {
          return await Promise.all(
            data.items.slice(0, 10).map(async (item) => {
              const content = item.content ?? ''
              const image = item.enclosure?.link || item.thumbnail || firstBodyImage(content)
              return {
                title: item.title ?? '',
                link: item.link ?? '',
                date: item.pubDate ?? '',
                excerpt: buildExcerpt(content, item.description ?? ''),
                image,
                imageSrcSet: image ? await cdnSrcSet(image) : '',
                readTime: readTimeMin(content),
              }
            })
          )
        }
      }
    } catch (err) {
      console.error(`[blog] proxy attempt ${attempt} threw:`, err)
    }
    if (attempt < MAX_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, 1500 * attempt))
    }
  }

  console.error('[blog] all proxy attempts failed; rendering empty state')
  return []
}

export default async function Blog() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen relative">
      <PageBackground />

      <div className="relative z-10">
        <Nav />

        <div className="max-w-4xl mx-auto px-6 pt-8 pb-24">
          <section>
            <h2 className="text-xl font-medium tracking-tight mb-5">Blog</h2>

            {posts.length === 0 ? (
              <p className="text-gray-700">
                Latest posts available at{' '}
                <Link
                  href={SUBSTACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  substack.com/@niclasgriesshaber
                </Link>
                .
              </p>
            ) : (
              <ul className="space-y-8">
                {posts.map((post, i) => (
                  <li key={post.link} className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {post.image && (
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 block overflow-hidden rounded-md md:w-48 bg-gray-100"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.imageSrcSet ? cdnUrl(post.image, THUMB_WIDTHS[0]) : post.image}
                          srcSet={post.imageSrcSet || undefined}
                          sizes="(min-width: 768px) 12rem, 100vw"
                          alt=""
                          width={400}
                          height={300}
                          className="w-full md:w-48 aspect-[4/3] object-cover transition-transform duration-300 hover:scale-[1.02]"
                          /* The first two thumbnails are above the fold on both
                             mobile and desktop; lazy-loading them only delays them. */
                          loading={i < 2 ? 'eager' : 'lazy'}
                          fetchPriority={i < 2 ? 'high' : 'auto'}
                          decoding="async"
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
