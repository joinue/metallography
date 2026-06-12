import Link from 'next/link'
import Image from 'next/image'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import FAQAccordion from '@/components/FAQAccordion'
import { ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Materials Prep: A Metallography ELN for Sample Preparation Labs',
  description:
    'Materials Prep is a metallography ELN, a digital lab notebook for sample preparation. Capture batches and samples, build a recipe library, annotate micrographs in an Atlas, and ask M.AI for prep guidance in context.',
  keywords: [
    'metallography ELN',
    'electronic lab notebook metallography',
    'sample preparation software',
    'metallographic recipe library',
    'micrograph atlas',
    'failure analysis lab software',
    'metallography lab notebook',
    'prep batch records',
  ],
  openGraph: {
    title: 'Materials Prep: A Metallography ELN for Sample Preparation Labs',
    description:
      'A digital lab notebook for metallographic sample preparation. Recipes, batches, micrographs, and an in-context AI prep assistant, all in one place.',
    url: 'https://metallography.org/materials-prep',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/images/materialsprep/logo.png',
        width: 1200,
        height: 630,
        alt: 'Materials Prep, a metallography ELN',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Materials Prep: A Metallography ELN',
    description:
      'A digital lab notebook for metallographic sample preparation: recipes, batches, micrographs, and an AI prep assistant.',
    images: ['/images/materialsprep/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org/materials-prep',
  },
}

const PRODUCT_URL = 'https://materialsprep.com'

export default function MaterialsPrepPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Materials Prep',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Electronic Lab Notebook',
    operatingSystem: 'Web',
    description:
      'A metallography ELN. Materials Prep is a digital lab notebook for metallographic sample preparation, with batch and sample records, a recipe library, an annotated micrograph Atlas, and M.AI, an in-context AI prep assistant.',
    url: PRODUCT_URL,
    image: 'https://metallography.org/images/materialsprep/logo.png',
    publisher: {
      '@type': 'Organization',
      name: 'PACE Technologies Corporation',
      url: 'https://metallographic.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1. HERO */}
      <section className="py-12 sm:py-20 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
            <AnimateOnScroll animation="fadeInUp" duration={700} threshold={0}>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/images/materialsprep/logo.png"
                  alt="Materials Prep logo"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Materials Prep
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
                A metallography ELN for the recipes, micrographs, and batches your lab actually runs.
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
                Materials Prep, from PACE Technologies, is a digital lab notebook for sample
                preparation. It captures every prep, makes what worked last time searchable, and
                keeps a lab's knowledge intact when staff turn over.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5">
                <a
                  href={PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Visit materialsprep.com
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link href="#what-it-is" className="btn-secondary">
                  See what's inside
                </Link>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
                Materials Prep is a paid PACE Technologies product. Metallography.org is PACE's
                free educational resource, run with editorial separation. This page covers the
                product because it addresses a problem the rest of this site only covers in
                writing: keeping a lab's prep knowledge intact across batches, operators, and
                time.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" duration={700} className="hidden lg:block">
              <figure className="w-full mx-auto" style={{ maxWidth: '1129px' }}>
                <Image
                  src="/images/materialsprep/screens/in-app-homepage.png"
                  alt="Materials Prep dashboard showing recent samples, work in flight, and Atlas activity for a failure analysis lab"
                  width={1129}
                  height={750}
                  className="rounded-lg border border-gray-300 shadow-lg w-full h-auto"
                  sizes="(min-width: 1024px) 50vw, 0px"
                  priority
                />
                <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
                  The lab's home view: recent samples, work in flight, and Atlas activity across the team.
                </figcaption>
              </figure>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 2. THE KNOWLEDGE PROBLEM */}
      <section className="py-12 sm:py-20">
        <div className="container-custom max-w-3xl">
          <AnimateOnScroll animation="fadeInUp" duration={700}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              The recipes that actually work usually live in someone's head.
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Most prep labs run on tribal knowledge. The recipe that gets a clean edge on
              case-hardened steel is on a clipboard above one machine. The note that says "do not
              skip the H₂O₂ step on titanium" is in a senior tech's head. The micrograph that
              showed last quarter's casting porosity lives on a desktop in a folder no one else
              opens.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When the senior tech retires, half of that knowledge leaves with them. When a new
              hire asks "how did we prep this last time," the answer is usually a guess. Materials
              Prep is built for labs that want the answer to be a record.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 3. WHAT MATERIALS PREP IS */}
      <section id="what-it-is" className="py-12 sm:py-20 bg-gray-50 border-y border-gray-200">
        <div className="container-custom max-w-3xl">
          <AnimateOnScroll animation="fadeInUp" duration={700}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              What Materials Prep is
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Materials Prep is a metallography ELN: an electronic lab notebook purpose-built for
              metallographic sample preparation. It captures the prep itself, not just the
              outcome. Every batch is a structured record of who prepped what, on which equipment,
              with which consumables, in how many steps, and what the result looked like.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Four pieces sit together inside it: an AI prep assistant called M.AI, batch and
              sample records, a recipe library, and an annotated micrograph Atlas. Each is useful
              on its own. The combination is what makes the lab's knowledge searchable, repeatable,
              and survivable across staff turnover.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 4. VALUE LEG 1: M.AI */}
      <section className="py-12 sm:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
            <AnimateOnScroll animation="fadeInUp" duration={700}>
              <div className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
                M.AI
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                A prep assistant that reads your lab's own history.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                M.AI is trained on metallography prep. It suggests recipes, troubleshoots
                artifacts, and answers prep questions in the context of the sample being worked
                on. It refers to itself as Mai.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Ask Mai why a 6061 sample is showing comet tails and she will explain the
                mechanism, propose a fix, and cite the last three batches in the lab where the
                same sample type came out clean. Ask which etchant to use on a 17-4 PH and she
                will point to the lab's own working recipe before reaching for the textbook
                answer.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mai is grounded in the lab's data. She does not replace the metallographer. She
                makes the metallographer's prior work searchable in the moment they need it.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={100} duration={700}>
              <figure className="w-full mx-auto" style={{ maxWidth: '619px' }}>
                <Image
                  src="/images/materialsprep/screens/mai-chat-screenshot.png"
                  alt="M.AI prep assistant building a 6061-T6 recipe drawn from the lab's existing aluminum procedure, with a step-by-step preparation table"
                  width={619}
                  height={538}
                  className="rounded-lg border border-gray-300 shadow-lg w-full h-auto"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Mai building a recipe for a 6061-T6 teaching sample, drawn from the lab's existing aluminum procedure.
                </figcaption>
              </figure>
              <figure className="w-full mx-auto mt-8" style={{ maxWidth: '1123px' }}>
                <Image
                  src="/images/materialsprep/screens/etchants-filters-applied.png"
                  alt="Materials Prep etchants browser with filters applied, showing the PACE etchant catalog Mai pulls from"
                  width={1123}
                  height={808}
                  className="rounded-lg border border-gray-300 shadow-lg w-full h-auto"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
                  The PACE etchant catalog Mai consults when proposing reagents. Browseable directly when an operator wants to compare options before adopting one into a recipe.
                </figcaption>
              </figure>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 5. VALUE LEG 2: BATCHES & SAMPLES */}
      <section className="py-12 sm:py-20 bg-gray-50 border-y border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
            <AnimateOnScroll animation="fadeInUp" duration={700} className="lg:order-2">
              <div className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
                Batches & samples
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                Every prep, recorded the way the lab actually works.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A batch is a structured record of one prep run: the samples in it, the operator,
                the equipment used, the consumables consumed, the recipe followed, and the
                resulting micrograph. Each sample inside the batch carries its own metadata,
                images, and notes.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The point is not paperwork. It is search. Six months later, when a similar casting
                comes through the door, the lab can find the last three batches that prepped it,
                see what worked, and repeat the recipe instead of re-discovering it.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Filter by material, by operator, by equipment, by etchant, by date. Attach
                micrographs and SEM images. Mark a batch as a reference for future work.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={100} duration={700} className="lg:order-1">
              <figure className="w-full mx-auto" style={{ maxWidth: '1039px' }}>
                <Image
                  src="/images/materialsprep/screens/sample-detail.png"
                  alt="Materials Prep sample detail for SAMP-263 showing the linked recipe, in-flight study, and a prep journal capturing each step with operator, method, and consumables"
                  width={1039}
                  height={766}
                  className="rounded-lg border border-gray-300 shadow-lg w-full h-auto"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
                  A sample record with the linked recipe, in-flight study, and prep journal capturing each step (operator, method, consumables, notes).
                </figcaption>
              </figure>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 6. VALUE LEG 3: RECIPE LIBRARY */}
      <section className="py-12 sm:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
            <AnimateOnScroll animation="fadeInUp" duration={700}>
              <div className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
                Recipe library
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                Your lab's recipe book, plus a cross-org library when you want one.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Every lab has a recipe book, even if today it lives in a binder, a OneNote, or one
                person's memory. Materials Prep gives the recipe book a structured home: each
                recipe lists its grit ladder, polishing pads, suspensions, etchant, times, and
                pressures, and links to the batches where it has been used.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Recipes are private to each lab by default. If a lab chooses to publish one, it
                goes to the MP Library, a cross-org surface where labs can share recipes that
                work. Search by material, etchant, or technique. Adopt one as-is, or fork it into
                the lab's own recipe book and tune it for the equipment on hand.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nothing leaves a lab unless the lab publishes it.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={100} duration={700}>
              <figure className="w-full mx-auto" style={{ maxWidth: '1138px' }}>
                <Image
                  src="/images/materialsprep/screens/recipes-list.png"
                  alt="Materials Prep recipes index showing the lab's recipe book with validation status, plus a doorway to the cross-org MP Recipe Library"
                  width={1138}
                  height={485}
                  className="rounded-lg border border-gray-300 shadow-lg w-full h-auto"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
                  The lab's recipe book with validation status, plus a doorway to the cross-org MP Recipe Library.
                </figcaption>
              </figure>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 7. VALUE LEG 4: ATLAS */}
      <section className="py-12 sm:py-20 bg-gray-50 border-y border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
            <AnimateOnScroll animation="fadeInUp" duration={700} className="lg:order-2">
              <div className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
                Atlas
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                Annotated micrographs that carry their prep history.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Atlas is a micrograph library. Each entry is an image plus the prep that produced
                it: the recipe, the etchant, the magnification, the equipment, and the operator
                notes. Annotate features directly on the image. Build the lab's own reference set
                of "this is what good looks like" and "this is what we reject."
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Lab-private by default. Individual entries can be opted in to a global Atlas,
                where the prep details travel with the image. Other labs can see not just what a
                structure looks like, but how it was actually revealed.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Most micrograph collections show the result without the recipe. Atlas keeps the
                two together.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={100} duration={700} className="lg:order-1">
              <figure className="w-full mx-auto" style={{ maxWidth: '1136px' }}>
                <Image
                  src="/images/materialsprep/screens/atlas.png"
                  alt="Materials Prep Atlas browse view: a row of micrograph thumbnails labeled with alloy, condition, etchant, and the recipe used to reveal each structure"
                  width={1136}
                  height={409}
                  className="rounded-lg border border-gray-300 shadow-lg w-full h-auto"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Atlas browse view: each thumbnail carries the alloy, condition, etchant, and the recipe used to reveal it.
                </figcaption>
              </figure>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 8. WHO IT'S FOR */}
      <section className="py-12 sm:py-20">
        <div className="container-custom max-w-4xl">
          <AnimateOnScroll animation="fadeInUp" duration={700} className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Who it's for</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              If anyone in the lab currently writes prep details on a clipboard or in a OneNote
              no one else opens, this is the kind of tool it's built for.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AnimateOnScroll animation="fadeInUp" delay={50} duration={500}>
              <div className="card h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prep technicians</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Stop re-deriving recipes that already exist in the lab. Find what worked last
                  time and repeat it.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeInUp" delay={100} duration={500}>
              <div className="card h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Metallographers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Build a searchable Atlas of the lab's own micrographs with the prep that
                  produced each one. Cite past batches in reports.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeInUp" delay={150} duration={500}>
              <div className="card h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lab managers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  See throughput, consumables use, and recipe consistency across operators. Hand
                  a new hire a working recipe book on day one.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeInUp" delay={200} duration={500}>
              <div className="card h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Failure analysis engineers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Trace every micrograph in a report back to the exact prep run, equipment, and
                  operator. Defensible records for QA and customer reviews.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 9. HOW IT FITS */}
      <section className="py-12 sm:py-20 bg-gray-50 border-y border-gray-200">
        <div className="container-custom max-w-3xl">
          <AnimateOnScroll animation="fadeInUp" duration={700}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              It sits next to the equipment a lab already runs.
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Materials Prep is software, not a press, a polisher, or a consumable. It runs in a
              browser. The lab's sectioning saw, mounting press, grinder/polisher, and microscope
              stay exactly where they are. The ELN records what they did.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Labs bring their own consumables, etchants, and SOPs. The product is built to
              capture how a lab works, not to dictate it.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-12 sm:py-20">
        <div className="container-custom max-w-3xl">
          <AnimateOnScroll animation="fadeInUp" duration={700} className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Common questions
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeInUp" delay={100} duration={600}>
            <FAQAccordion
              items={[
                {
                  question: 'Who owns the data we put into Materials Prep?',
                  answer:
                    "Recipes, batches, samples, and Atlas entries are private to each lab by default. Nothing is published to the cross-org MP Library or global Atlas unless the lab explicitly opts in, entry by entry. Labs own their data and can export it.",
                },
                {
                  question: 'What equipment does it work with?',
                  answer:
                    'Materials Prep is equipment-agnostic. It records the equipment, consumables, and steps actually used, regardless of vendor. There is no hardware lock-in. A lab running a grinder/polisher, mounting press, and microscope from three different vendors captures all of them in the same batch record.',
                },
                {
                  question: 'How does M.AI use our lab data?',
                  answer:
                    "Mai uses each lab's batches, recipes, and Atlas as grounding when answering a question, so suggestions reflect what has actually worked in that environment. A lab's data is not used to train models for other labs.",
                },
                {
                  question: 'What is the difference between the recipe book and the MP Library?',
                  answer:
                    "The recipe book is the private collection of recipes inside one lab. The MP Library is the platform-wide surface of recipes other labs have chosen to publish. A lab can adopt an MP Library recipe into its own recipe book and tune it from there. Nothing in a lab's recipe book is visible to other labs unless that lab publishes it.",
                },
                {
                  question: 'Who makes Materials Prep, and how is it related to Metallography.org?',
                  answer:
                    "Materials Prep is built and operated by PACE Technologies, a metallography equipment and consumables company. Metallography.org is also a PACE property, the free educational sibling, kept editorially separate from the product. This page exists because Materials Prep solves a working-lab problem the rest of this site only covers in writing.",
                },
                {
                  question: 'How do we get started?',
                  answer:
                    "Visit materialsprep.com for current onboarding and pricing. Most labs start by importing one or two existing recipes, running a few real prep batches against them, and growing the recipe book and Atlas from there.",
                },
              ]}
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 11. CLOSING CTA */}
      <section className="py-12 sm:py-20">
        <div className="container-custom">
          <AnimateOnScroll animation="fadeInUp" duration={700} className="max-w-4xl mx-auto">
            <div className="card text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                See Materials Prep
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Pricing, onboarding, and the full product walkthrough live on the product site.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href={PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Visit materialsprep.com
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link href="/guides" className="btn-secondary">
                  Keep browsing guides
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
