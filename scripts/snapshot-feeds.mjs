// Saves a copy of each Substack feed to data/feeds/, the fallback the Blog
// page builds from when neither Substack nor the rss2json proxy answers
// (see app/blog/page.tsx). Run from a normal connection, where Substack
// answers directly: `npm run snapshot-feeds`, then commit data/feeds/.
// Keep this list in sync with FEEDS in app/blog/page.tsx.
import { writeFile } from 'node:fs/promises'

const FEEDS = [
  { url: 'https://aieconhistory.substack.com/feed', snapshot: 'aieconhistory.xml' },
  { url: 'https://ai4history.substack.com/feed', snapshot: 'ai4history.xml' },
]

let failed = false
for (const { url, snapshot } of FEEDS) {
  const res = await fetch(url, { headers: { 'User-Agent': 'NiclasBlog/1.0 (+https://niclasgriesshaber.com)' } })
  const xml = await res.text()
  const items = (xml.match(/<item>/g) ?? []).length
  // Never overwrite a good snapshot with an error page or an empty feed.
  if (!res.ok || !xml.includes('<rss') || items === 0) {
    console.error(`${url}: status ${res.status}, ${items} items — snapshot left unchanged`)
    failed = true
    continue
  }
  await writeFile(new URL(`../data/feeds/${snapshot}`, import.meta.url), xml)
  console.log(`${url}: ${items} items → data/feeds/${snapshot}`)
}
process.exit(failed ? 1 : 0)
