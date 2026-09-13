import type { Metadata } from 'next'

export const SITE_NAME = 'Niclas Griesshaber'

const OG_IMAGE = {
  url: '/og-ai4history.jpg',
  width: 1200,
  height: 630,
  alt: 'AI for History',
}

/**
 * Metadata for a section page.
 *
 * Share cards carry one line and nothing else — `Research - Niclas Griesshaber`.
 * `description: null` clears the one inherited from the root layout, which
 * platforms would otherwise fall back to for the grey subtitle. Only the home
 * page keeps a description ("AI for History"); see app/layout.tsx.
 */
export function pageMetadata(section: string, path: string): Metadata {
  const title = `${section} - ${SITE_NAME}`
  return {
    title,
    description: null,
    openGraph: {
      title,
      url: path,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      images: [OG_IMAGE.url],
    },
  }
}

export { OG_IMAGE }
