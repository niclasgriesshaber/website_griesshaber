export type EventType = 'Workshop' | 'Presentation' | 'Lecture' | 'Panel'

export type Event = {
  title: string
  venue?: string
  date: string
  link?: string
  note?: string
  type?: EventType
}

export const upcoming: Event[] = [
  {
    title: 'Application of AI for the Digitalization and Analysis of Historical Data',
    venue: 'Public University of Navarre (UPNA), Spain',
    date: 'September 16–17, 2026',
    type: 'Workshop',
  },
  {
    title: 'AI in the Historical Humanities and Social Sciences',
    venue: 'University of Regensburg, Germany',
    date: 'November 6–8, 2026',
    type: 'Workshop',
  },
  {
    title: 'Digital History Seminar',
    venue: 'Berlin, Germany',
    date: 'November 11, 2026',
    type: 'Presentation',
  },
  {
    title: 'AI, History, and Ethics',
    venue: 'Diocese of Kreuzlingen, Switzerland',
    date: 'November 16, 2026',
    type: 'Presentation',
  },
  {
    title: 'AI for History',
    venue: 'Koç University, Istanbul, Turkey',
    date: 'Date TBA',
    type: 'Workshop',
  },
]

export const past: Event[] = [
  {
    title: 'OxDSS × TVG: AI for Digital Scholarship Workshop',
    venue: 'University of Oxford, UK',
    date: '2026',
    note: '2nd edition',
    type: 'Workshop',
  },
  {
    title: 'AI for Digital Historical Scholarship',
    venue: 'Aarhus University, Denmark',
    date: '2026',
    type: 'Workshop',
    link: 'https://cas.au.dk/en/cedhar/events/show/artikel/ai-assisted-reading-of-historical-archives-with-niclas-griesshaber',
  },
  {
    title: 'Computational History',
    venue: 'Warwick University, UK',
    date: '2026',
    type: 'Presentation',
    link: 'https://warwick.ac.uk/fac/soc/economics/research/centres/cage/events/08-05-26-computational_history_workshop/',
  },
  {
    title: 'OxDSS × TVG: AI for Digital Scholarship Workshop',
    venue: 'University of Oxford, UK',
    date: '2026',
    note: '1st edition',
    type: 'Workshop',
  },
  {
    title: 'Machine Learning and Big Data in Economic History',
    venue: 'University of Hohenheim, Germany',
    date: '2026',
    type: 'Presentation',
  },
  {
    title: 'AI Agents for Research',
    venue: 'Oxford e-Research Centre, UK',
    date: '2026',
    type: 'Presentation',
    link: 'https://www.linkedin.com/posts/dr-badran-m-e-65414b113_aiagents-claudecode-codex-activity-7463695117170720768--UBy',
  },
  {
    title: 'Beyond Automation: Artificial Intelligence and the Interpretive Traditions of the Humanities',
    venue: 'Oxford e-Research Centre, UK',
    date: '2026',
    type: 'Panel',
    link: 'https://www.linkedin.com/posts/activity-7441612197698355201-GOOx',
  },
  {
    title: 'The Oxford, Warwick and LSE Workshop in Economic History',
    venue: 'Nuffield College, UK',
    date: '2025',
    type: 'Presentation',
  },
  {
    title: 'Economic and Social History Graduate Seminar',
    venue: 'Nuffield College, UK',
    date: '2025',
    type: 'Presentation',
  },
  {
    title: 'Economic History Colloquium',
    venue: 'University of Mannheim, Germany',
    date: '2025',
    type: 'Presentation',
  },
  {
    title: 'World Economic History Congress',
    venue: 'Lund University, Sweden',
    date: '2025',
    type: 'Presentation',
    link: 'https://wehc2025.com/WEHC_Conference_Program_2025_v3.pdf',
  },
  {
    title: 'Joan Thirsk Dissertation Prize Lecture',
    venue: 'All Souls College, UK',
    date: '2024',
    type: 'Lecture',
    link: 'https://x.com/OxfordESH/status/1782853296878760116',
  },
]
