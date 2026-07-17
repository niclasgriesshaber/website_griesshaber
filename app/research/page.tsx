import Link from 'next/link'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import { Nav } from '../../components/Nav'

export const metadata: Metadata = {
  title: 'Research - Niclas Griesshaber',
  description: 'Research',
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-600 transition-colors"
    >
      {children}
    </Link>
  )
}

type Paper = {
  title: string
  link: string
  authors: ReactNode
  venue?: string
  abstract?: string
  action?: { label: string; href: string }
}

const papers: Paper[] = [
  {
    title: 'Pretraining Language Models on Historical Text',
    link: 'https://arxiv.org/abs/2606.02991',
    authors: (
      <>
        Xiaoxi Luo, <A href="https://zlshinnick.github.io">Zachary Shinnick</A>,{' '}
        Niclas Griesshaber, Yixuan Wang, <A href="https://samyu0304.github.io">Junchi Yu</A>,{' '}
        <A href="https://cs.uwaterloo.ca/~fhs/">Freda Shi</A>,{' '}
        <A href="https://ai2050.schmidtsciences.org/fellow/philip-torr/">Philip Torr</A>, and{' '}
        <A href="https://yaolu.github.io">Yao Lu</A>
      </>
    ),
    action: { label: 'Try the History LLM', href: 'https://typewriter.chat' },
    abstract:
      'We introduce TypewriterLM, a 7.24B History language model (LM) trained exclusively on English text predating 1913. Developing History LMs requires addressing challenges in data quality and availability, preventing temporal leakage, designing temporally consistent post-training pipelines, and constructing reliable evaluations. To address these issues, we construct TypewriterCorpus, a 54B-token historical corpus collected from diverse archival and linguistically annotated sources with extensive data cleaning and leakage mitigation procedures. Furthermore, we introduce lexically grounded instructing tuning, a post-training framework that constraints responses to remain directly grounded in historical source documents. Using this framework we construct two historical instruction tuning datasets: History-LIMA and History-SelfInstruct. To evaluate capability and temporal consistency, we introduce History-Event, a benchmark suite for evaluating competence, temporal grounding and data leakage. We release TypewriterLM and all associated resources to support future research on historical language models.',
  },
  {
    title: 'Chronos: The AI Co-Historian',
    link: 'https://arxiv.org/abs/2604.03553',
    authors: (
      <>
        <A href="https://hufe.info">Lorenz Hufe</A>, Niclas Griesshaber*, Gavin Greif*, Sebastian Oliver Eck, and{' '}
        <A href="https://ai2050.schmidtsciences.org/fellow/philip-torr/">Philip Torr</A>
      </>
    ),
    action: { label: 'Download Chronos', href: 'https://github.com/ai-historian/chronos' },
    abstract:
      'AI is increasingly supporting, accelerating, and automating scientific discovery across subjects. Yet, the adoption of AI in historical research remains limited due to the lack of specialised solutions for historians. To change this, we introduce Chronos, an AI Co-Historian designed to support historians. It allows researchers to create and customize research workflows through natural-language interaction and share these as Chronos-Extensions with others. Chronos specifically addresses the need of historians for a tool that is specialised, non-technical, highly customizable, and facilitates extensive task evaluation. As a first extension, we introduce Chronos-Extract, which enables researchers to automate the targeted extraction of information from image scans of historical sources. We benchmark Chronos-Extract on three historical source corpora and find that it achieves high task-accuracy across primary sources spanning three centuries and diverse languages, layouts, and typefaces. Chronos is openly available and ready for historians to use on their own primary and secondary sources.',
  },
  {
    title:
      'Multimodal LLMs for Historical Dataset Construction from Archival Image Scans: German Patents (1877-1918)',
    link: 'https://arxiv.org/abs/2512.19675',
    authors: (
      <>
        Niclas Griesshaber and <A href="https://www.vwl.uni-mannheim.de/streb/team/prof-dr-streb">Jochen Streb</A>
      </>
    ),
    venue: 'Forthcoming in Vierteljahrschrift für Sozial- und Wirtschaftsgeschichte',
    abstract:
      'We leverage multimodal large language models (LLMs) to construct a dataset of 306,070 German patents (1877–1918) from 9,562 archival image scans. Our benchmarking exercise provides tentative evidence that multimodal LLMs can create higher quality datasets than our research assistants, while also being more than 795 times faster and 205 times cheaper in constructing the structured dataset from our image corpus. About 20 to 50 patent entries are embedded on each page, arranged in a double-column format and printed in Gothic and Roman fonts. The font and layout complexity of our primary source material suggests to us that multimodal LLMs are a paradigm shift in how datasets are constructed in economic history.',
  },
  {
    title: 'Multimodal LLMs for OCR, OCR Post-Correction, and NER in Historical Documents',
    link: 'https://arxiv.org/abs/2504.00414',
    authors: (
      <>
        Gavin Greif, Niclas Griesshaber, and Robin Greif
      </>
    ),
    venue: 'Forthcoming in Economic History Yearbook',
    abstract:
      'We explore how multimodal Large Language Models (mLLMs) can help researchers transcribe historical documents, extract relevant historical information, and construct datasets from historical sources. Specifically, we investigate the capabilities of mLLMs in performing (1) Optical Character Recognition (OCR), (2) OCR Post-Correction, and (3) Named Entity Recognition (NER) tasks on a set of city directories published in German between 1754 and 1870. First, we benchmark the off-the-shelf transcription accuracy of both mLLMs and conventional OCR models. We find that the best performing mLLM model significantly outperforms conventional state-of-the-art OCR models and other frontier mLLMs, achieving CERs well below 1 percent. Second, we test multimodal post-correction of OCR output using mLLMs. We find that this approach leads to significant improvements in transcription accuracy, yet it no longer consistently or substantially outperforms mLLM-only transcriptions. Third, we demonstrate that mLLMs can efficiently recognize entities in historical documents and parse them into structured dataset formats. We conclude that mLLMs can serve as integrated end-to-end solutions for historical information extraction without document pre- or post-processing. Our findings provide evidence for the long-term potential of mLLMs to introduce a paradigm shift in the approaches to historical data collection and document transcription.',
  },
  {
    title: 'Transplanting Craft Guilds to Colonial Latin America: A Large Language Model Analysis',
    link: 'https://cepr.org/publications/dp20556',
    authors: (
      <>
        Niclas Griesshaber and <A href="https://www.sheilaghogilvie.com/">Sheilagh Ogilvie</A>
      </>
    ),
    venue: 'CEPR Discussion Paper',
    abstract:
      'What can we learn about institutional transplantation by analyzing craft guilds in colonial Latin America? We use large language models (LLMs) to investigate colonial guild ordinances, addressing two major bottlenecks in assessing institutions: digitizing qualitative sources efficiently and analyzing them quantitatively. Our newly designed methodology reveals both long-term continuities and striking differences between craft guilds in colonial Mexico and Peru, particularly with regard to human capital and product quality. The LLM-based approach identifies patterns that were previously not discernible using standard methods in economic history, its results are reproducible, and it can easily be extended to other historical settings.',
  },
]

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
              <p className="text-sm text-gray-500 italic mt-1">*Equal contribution.</p>
            </div>
            <div className="space-y-6">
              {papers.map((p) => (
                <div key={p.link}>
                  <h3 className="text-base font-medium leading-snug">
                    <Link
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{p.authors}</p>
                  {p.venue && (
                    <p className="text-gray-500 text-sm italic mt-0.5">{p.venue}</p>
                  )}
                  {p.abstract && (
                    <details className="group mt-1.5">
                      <summary className="flex items-baseline gap-2 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                          <svg
                            className="w-3 h-3 flex-shrink-0 transition-transform duration-200 group-open:rotate-90"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M5 3 L11.5 8 L5 13 Z" />
                          </svg>
                          Abstract
                        </span>
                        {p.action && (
                          <>
                            <span className="text-gray-400 text-sm">&middot;</span>
                            <Link
                              href={p.action.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:text-blue-600 transition-colors whitespace-nowrap"
                            >
                              {p.action.label}
                            </Link>
                          </>
                        )}
                      </summary>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed text-justify">
                        {p.abstract}
                      </p>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
