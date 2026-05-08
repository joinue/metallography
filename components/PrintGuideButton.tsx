'use client'

import { Printer } from 'lucide-react'

/**
 * Floating Print/Save-as-PDF button that uses the browser's native print
 * pipeline plus the @media print rules in globals.css. On modern browsers
 * (Chrome/Edge/Firefox/Safari) the print dialog includes a "Save as PDF"
 * option, so this gives users a portable PDF without any client-side PDF
 * library or extra page rendering.
 */
export default function PrintGuideButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-primary-700 transition-colors"
      data-print="hide"
      aria-label="Print or save this guide as PDF"
      title="Print or save this guide as PDF"
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      <span>Print / PDF</span>
    </button>
  )
}
