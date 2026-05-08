'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'
import { hardnessTable } from '@/lib/hardness-conversion'

// Helper to render a value or em-dash for null
const v = (n: number | null) => (n == null ? '—' : String(n))

export default function HardnessScaleConversionPage() {
  const chartRef = useRef<HTMLDivElement>(null)

  // Build display rows from the canonical ASTM E140 table.
  // HRC range only (the bulk of the chart for hardened steels).
  const hardnessConversions = hardnessTable
    .filter((r) => r.hrc != null)
    .map((r) => ({
      hrc: v(r.hrc),
      hrb: v(r.hrb),
      hb: v(r.hb),
      hv: v(r.hv),
      hk: v(r.hk),
      hra: v(r.hra),
    }))

  // HRB range — for softer materials (no HRC equivalent at the bottom).
  const rockwellBConversions = hardnessTable
    .filter((r) => r.hrb != null && r.hrc == null)
    .map((r) => ({
      hrb: v(r.hrb),
      hrc: v(r.hrc),
      hb: v(r.hb),
      hv: v(r.hv),
      hk: v(r.hk),
      hra: v(r.hra),
    }))

  const downloadPDF = async () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    // Load logo
    let logoDataUrl: string | null = null
    try {
      const logoImg = await fetch('/logo-white.png').then(res => res.blob()).then(blob => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(blob)
        })
      })
      logoDataUrl = logoImg
    } catch (e) {
      // Continue without logo
    }

    const pageWidth = 297
    const pageHeight = 210
    const margin = 15
    const headerHeight = 25
    const footerHeight = 12
    const tableStartY = margin + headerHeight
    const tableEndY = pageHeight - footerHeight - 5

    // Header
    pdf.setFillColor(37, 99, 235)
    pdf.setDrawColor(37, 99, 235)
    pdf.rect(margin, margin, pageWidth - margin * 2, 8, 'F')
    
    if (logoDataUrl) {
      pdf.addImage(logoDataUrl, 'PNG', margin + 2, margin + 1, 6, 6)
    }
    
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(255, 255, 255)
    pdf.text('Hardness Scale Conversion Chart', pageWidth / 2, margin + 5, { align: 'center' })
    
    pdf.setFontSize(12)
    pdf.text('Metallography.org', margin + 5 + (logoDataUrl ? 8 : 0), margin + 5)
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 5, margin + 5, { align: 'right' })

    // Table header
    let yPos = tableStartY
    const colWidths = { hrc: 25, hrb: 25, hb: 30, hv: 30, hk: 30, hra: 30 }
    const totalWidth = Object.values(colWidths).reduce((a, b) => a + b, 0)
    const tableStartX = (pageWidth - totalWidth) / 2

    pdf.setFillColor(50, 50, 50)
    pdf.setDrawColor(200, 200, 200)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(255, 255, 255)

    const headers = [
      { text: 'HRC', width: colWidths.hrc },
      { text: 'HRB', width: colWidths.hrb },
      { text: 'HB', width: colWidths.hb },
      { text: 'HV', width: colWidths.hv },
      { text: 'HK', width: colWidths.hk },
      { text: 'HRA', width: colWidths.hra },
    ]

    let xPos = tableStartX
    headers.forEach((header) => {
      pdf.rect(xPos, yPos - 5, header.width, 6, 'F')
      pdf.text(header.text, xPos + header.width / 2, yPos - 1.5, { align: 'center' })
      xPos += header.width
    })
    yPos += 7

    // Main conversion table (HRC)
    pdf.setFontSize(7)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)

    hardnessConversions.forEach((row, index) => {
      if (yPos + 4 > tableEndY - 20) {
        pdf.addPage()
        yPos = margin + 10
        // Redraw header
        xPos = tableStartX
        pdf.setFillColor(50, 50, 50)
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 255, 255)
        headers.forEach((header) => {
          pdf.rect(xPos, yPos - 5, header.width, 6, 'F')
          pdf.text(header.text, xPos + header.width / 2, yPos - 1.5, { align: 'center' })
          xPos += header.width
        })
        yPos += 7
        pdf.setFontSize(7)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(0, 0, 0)
      }

      if (index % 2 === 0) {
        pdf.setFillColor(248, 250, 252)
        pdf.rect(tableStartX, yPos - 4, totalWidth, 4, 'F')
      }

      pdf.setDrawColor(220, 220, 220)
      xPos = tableStartX
      const rowData = [
        { text: row.hrc, width: colWidths.hrc },
        { text: row.hrb, width: colWidths.hrb },
        { text: row.hb, width: colWidths.hb },
        { text: row.hv, width: colWidths.hv },
        { text: row.hk, width: colWidths.hk },
        { text: row.hra, width: colWidths.hra },
      ]

      rowData.forEach((cell) => {
        pdf.rect(xPos, yPos - 4, cell.width, 4)
        pdf.text(cell.text, xPos + cell.width / 2, yPos - 1, { align: 'center' })
        xPos += cell.width
      })
      yPos += 4
    })

    // Notes section
    if (yPos + 25 < tableEndY) {
      yPos += 3
      pdf.setDrawColor(200, 200, 200)
      pdf.line(tableStartX, yPos, tableStartX + totalWidth, yPos)
      yPos += 5

      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Notes:', tableStartX, yPos)
      yPos += 4

      pdf.setFontSize(7)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(80, 80, 80)
      const notes = [
        '• HRC: Rockwell C scale (diamond cone, 150 kgf)',
        '• HRB: Rockwell B scale (1/16" ball, 100 kgf)',
        '• HB: Brinell Hardness (10mm ball, 3000 kgf)',
        '• HV: Vickers Hardness (diamond pyramid)',
        '• HK: Knoop Hardness (elongated diamond pyramid)',
        '• HRA: Rockwell A scale (diamond cone, 60 kgf)',
        '• Conversions are approximate; actual values may vary',
        '• Always verify with direct measurement when accuracy is critical',
      ]

      notes.forEach((note) => {
        pdf.text(note, tableStartX + 2, yPos)
        yPos += 3.5
      })
    }

    // Footer
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      pdf.setFontSize(7)
      pdf.setTextColor(120, 120, 120)
      pdf.text(`Page ${i} of ${pageCount} | metallography.org`, margin, pageHeight - 5, { align: 'left' })
      pdf.text('Free Educational Resource', pageWidth - margin, pageHeight - 5, { align: 'right' })
    }

    pdf.save('hardness-scale-conversion-chart.pdf')
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <Link 
            href="/resources" 
            className="text-primary-600 hover:text-primary-700 text-sm mb-4 inline-block"
          >
            ← Back to Resources
          </Link>
          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
            <div>
              <h1 className="text-4xl font-bold mb-2">Hardness Scale Conversion Chart</h1>
              <p className="text-gray-600">
                Printable reference chart converting between Rockwell (HRC, HRB, HRA), Brinell (HB),
                Vickers (HV), and Knoop (HK), based on ASTM E140-12b for non-austenitic steels.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/tools/hardness-converter"
                className="btn-secondary flex items-center gap-2"
              >
                Interactive Converter →
              </Link>
              <button
                onClick={downloadPDF}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        <div ref={chartRef} className="bg-white border border-gray-200 rounded-lg p-8 overflow-x-auto">
          <div className="mb-6 print:hidden">
            <h2 className="text-xl font-bold text-primary-600 mb-2">
              Hardness Scale Conversion Chart
            </h2>
            <p className="text-gray-600 text-sm">
              Metallography.org - Free Educational Resources
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary-600 text-white">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HRC</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HRB</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HB</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HV</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HK</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HRA</th>
                </tr>
              </thead>
              <tbody>
                {hardnessConversions.map((row, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="border border-gray-300 px-3 py-2 font-medium">{row.hrc}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hrb}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hb}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hv}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hk}</td>
                    <td className="border border-gray-300 px-3 py-2">{row.hra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rockwell B sub-table for softer materials */}
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-3">Soft-material range (Rockwell B)</h3>
            <p className="text-sm text-gray-600 mb-3">
              Below ~20 HRC the Rockwell C indenter is unreliable. Use HRB or Brinell on annealed steels,
              brass, and aluminum alloys instead.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HRB</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HRC</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HB</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HV</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HK</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">HRA</th>
                  </tr>
                </thead>
                <tbody>
                  {rockwellBConversions.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-300 px-3 py-2 font-medium">{row.hrb}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.hrc}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.hb}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.hv}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.hk}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.hra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold mb-4">Notes</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>HRC:</strong> Rockwell C — diamond cone, 150 kgf. For hardened steels (~20–70 HRC).</li>
              <li>• <strong>HRB:</strong> Rockwell B — 1/16" tungsten carbide ball, 100 kgf. For soft to medium materials.</li>
              <li>• <strong>HB (HBW):</strong> Brinell — 10 mm WC ball, 3000 kgf. Loses accuracy above ~55 HRC; the ball deforms.</li>
              <li>• <strong>HV:</strong> Vickers — square-base diamond pyramid. Universal scale across all hardness ranges.</li>
              <li>• <strong>HK:</strong> Knoop — rhombic diamond pyramid. Best for thin layers, coatings, and case-depth profiles.</li>
              <li>• <strong>HRA:</strong> Rockwell A — diamond cone, 60 kgf. For very hard materials (carbides, cermets).</li>
              <li>• Conversions follow <strong>ASTM E140-12b</strong> for non-austenitic carbon and alloy steels. Austenitic stainless, copper, aluminum, and titanium alloys have different curves — use scale-specific tables.</li>
              <li>• Conversions are <strong>approximate</strong>; published agreement is typically ±1 HRC. Direct measurement on the scale called out in the spec is always preferred.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

