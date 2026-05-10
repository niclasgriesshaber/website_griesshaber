export type Dataset = {
  name: string
  description?: string
  link: string
  period?: string
}

export const datasets: Dataset[] = [
  {
    name: 'German Patents (1877–1918)',
    description:
      'Structured patent records from the German Empire, built from archival image scans with multimodal large language models.',
    link: 'https://historymind.ai',
    period: '1877–1918',
  },
]
