import { Metadata } from 'next'
import PrintGuideButton from '@/components/PrintGuideButton'

export const metadata: Metadata = {
  title: 'Metallographic Sample Preparation Guides | Metallography.org',
  description:
    'Comprehensive step-by-step guides for metallographic sample preparation. Learn grinding, polishing, etching, and more techniques.',
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      {/* Floating print/PDF button — hidden when printing via @media print */}
      <div
        className="hidden md:flex fixed top-24 right-4 z-30"
        data-print="hide"
      >
        <PrintGuideButton />
      </div>

      {/* Print-only attribution header — shown only when printing.
          The @media print CSS in globals.css un-hides .print-only-header. */}
      <header className="print-only-header" aria-hidden="true">
        <strong>Metallography.org</strong> — Free educational guides for metallographic sample preparation.
        <br />
        <span className="source">
          Source: https://metallography.org &nbsp;•&nbsp; Generated for personal/educational use.
        </span>
      </header>

      {children}
    </div>
  )
}
