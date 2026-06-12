'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

export default function GritSizeChartPage() {
  const chartRef = useRef<HTMLDivElement>(null)

  // Grit size conversion data - organized by category.
  // ANSI and JIS columns give the grit number in that standard whose particle
  // size is closest to the row's FEPA-P size (not naive number matching).
  // Coarse grades (macrogrits, ≤ 220) carry essentially the same numbers in
  // all three standards; the scales diverge increasingly at the fine end
  // (e.g. FEPA P1200 ≈ US/ANSI 600, FEPA P2500 ≈ US/ANSI 1200).
  const gritSizes = [
    { fepa: 'P12', ansi: '12', jis: '12', micron: '1815', mesh: '12', category: 'Very Coarse' },
    { fepa: 'P16', ansi: '16', jis: '16', micron: '1324', mesh: '16', category: 'Very Coarse' },
    { fepa: 'P20', ansi: '20', jis: '20', micron: '1000', mesh: '20', category: 'Very Coarse' },
    { fepa: 'P24', ansi: '24', jis: '24', micron: '764', mesh: '24', category: 'Coarse' },
    { fepa: 'P30', ansi: '30', jis: '30', micron: '642', mesh: '30', category: 'Coarse' },
    { fepa: 'P36', ansi: '36', jis: '36', micron: '538', mesh: '36', category: 'Coarse' },
    { fepa: 'P40', ansi: '40', jis: '40', micron: '425', mesh: '40', category: 'Coarse' },
    { fepa: 'P50', ansi: '50', jis: '50', micron: '336', mesh: '50', category: 'Medium' },
    { fepa: 'P60', ansi: '60', jis: '60', micron: '269', mesh: '60', category: 'Medium' },
    { fepa: 'P80', ansi: '80', jis: '80', micron: '201', mesh: '80', category: 'Medium' },
    { fepa: 'P100', ansi: '100', jis: '100', micron: '162', mesh: '100', category: 'Medium' },
    { fepa: 'P120', ansi: '120', jis: '120', micron: '125', mesh: '120', category: 'Fine' },
    { fepa: 'P150', ansi: '150', jis: '150', micron: '100', mesh: '150', category: 'Fine' },
    { fepa: 'P180', ansi: '180', jis: '180', micron: '82', mesh: '180', category: 'Fine' },
    { fepa: 'P220', ansi: '220', jis: '220', micron: '68', mesh: '220', category: 'Fine' },
    { fepa: 'P240', ansi: '220', jis: '240', micron: '58.5', mesh: '—', category: 'Very Fine' },
    { fepa: 'P280', ansi: '240', jis: '280', micron: '52.2', mesh: '—', category: 'Very Fine' },
    { fepa: 'P320', ansi: '280', jis: '280', micron: '46.2', mesh: '—', category: 'Very Fine' },
    { fepa: 'P360', ansi: '320', jis: '320', micron: '40.5', mesh: '—', category: 'Very Fine' },
    { fepa: 'P400', ansi: '320', jis: '360', micron: '35.0', mesh: '—', category: 'Very Fine' },
    { fepa: 'P500', ansi: '360', jis: '400', micron: '30.2', mesh: '—', category: 'Ultra Fine' },
    { fepa: 'P600', ansi: '400', jis: '500', micron: '25.8', mesh: '—', category: 'Ultra Fine' },
    { fepa: 'P800', ansi: '400', jis: '600', micron: '21.8', mesh: '—', category: 'Ultra Fine' },
    { fepa: 'P1000', ansi: '500', jis: '700', micron: '18.3', mesh: '—', category: 'Ultra Fine' },
    { fepa: 'P1200', ansi: '600', jis: '800', micron: '15.3', mesh: '—', category: 'Ultra Fine' },
    { fepa: 'P1500', ansi: '800', jis: '1000', micron: '12.6', mesh: '—', category: 'Ultra Fine' },
    { fepa: 'P2000', ansi: '1000', jis: '1200', micron: '10.3', mesh: '—', category: 'Ultra Fine' },
    { fepa: 'P2500', ansi: '1200', jis: '1500', micron: '8.4', mesh: '—', category: 'Ultra Fine' },
  ]

  const downloadPDF = async () => {
    // Create PDF in landscape orientation
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    // Load white logo for blue background
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
      // If logo fails to load, continue without it
    }

    // Constants for layout
    const pageWidth = 297 // A4 landscape width
    const pageHeight = 210 // A4 landscape height
    const margin = 15
    const headerHeight = 25
    const footerHeight = 12
    const tableStartY = margin + headerHeight
    const tableEndY = pageHeight - footerHeight - 5
    const availableHeight = tableEndY - tableStartY

    // Column widths (total should be ~267mm to fit with margins)
    const colWidths = {
      fepa: 28,
      ansi: 25,
      jis: 25,
      micron: 35,
      mesh: 25,
      category: 45,
    }
    const totalTableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0)
    const tableStartX = (pageWidth - totalTableWidth) / 2

    // Helper function to add header
    const addHeader = (yPos: number) => {
      pdf.setFillColor(37, 99, 235) // primary-600
      pdf.setDrawColor(37, 99, 235)
      pdf.rect(margin, yPos - 8, pageWidth - margin * 2, 8, 'F')
      
      // Add logo if available
      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, 'PNG', margin + 2, yPos - 7, 6, 6)
      }
      
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(255, 255, 255)
      pdf.text('Grit Size Conversion Chart', pageWidth / 2, yPos - 2, { align: 'center' })
      
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(255, 255, 255)
      const logoOffset = logoDataUrl ? 10 : 0
      pdf.text('Metallography.org', margin + 5 + logoOffset, yPos - 2)
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 5, yPos - 2, { align: 'right' })
    }

    // Helper function to add footer
    const addFooter = (pageNum: number, totalPages: number) => {
      pdf.setFontSize(7)
      pdf.setTextColor(120, 120, 120)
      const footerY = pageHeight - 5
      pdf.text(
        `Page ${pageNum} of ${totalPages} | metallography.org`,
        margin,
        footerY,
        { align: 'left' }
      )
      pdf.text(
        'Free Educational Resource',
        pageWidth - margin,
        footerY,
        { align: 'right' }
      )
    }

    // Helper function to draw table header
    const drawTableHeader = (yPos: number) => {
      const headers = [
        { text: 'FEPA', width: colWidths.fepa },
        { text: 'ANSI', width: colWidths.ansi },
        { text: 'JIS', width: colWidths.jis },
        { text: 'Micron (μm)', width: colWidths.micron },
        { text: 'Mesh', width: colWidths.mesh },
        { text: 'Category', width: colWidths.category },
      ]

      pdf.setFillColor(50, 50, 50)
      pdf.setDrawColor(200, 200, 200)
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(255, 255, 255)

      let xPos = tableStartX
      headers.forEach((header) => {
        pdf.rect(xPos, yPos - 5, header.width, 6, 'F')
        pdf.text(header.text, xPos + header.width / 2, yPos - 1.5, { align: 'center' })
        xPos += header.width
      })
    }

    // Helper function to draw table row
    const drawTableRow = (grit: typeof gritSizes[0], yPos: number, isEven: boolean) => {
      if (isEven) {
        pdf.setFillColor(248, 250, 252)
        pdf.rect(tableStartX, yPos - 5, totalTableWidth, 5, 'F')
      }

      pdf.setDrawColor(220, 220, 220)
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(0, 0, 0)

      let xPos = tableStartX
      const rowData = [
        { text: grit.fepa, width: colWidths.fepa, align: 'center' as const },
        { text: grit.ansi, width: colWidths.ansi, align: 'center' as const },
        { text: grit.jis, width: colWidths.jis, align: 'center' as const },
        { text: grit.micron, width: colWidths.micron, align: 'center' as const },
        { text: grit.mesh, width: colWidths.mesh, align: 'center' as const },
        { text: grit.category, width: colWidths.category, align: 'left' as const },
      ]

      rowData.forEach((cell) => {
        pdf.rect(xPos, yPos - 5, cell.width, 5)
        pdf.text(cell.text, xPos + (cell.align === 'center' ? cell.width / 2 : 2), yPos - 1.5, { align: cell.align })
        xPos += cell.width
      })
    }

    // Add first page header
    addHeader(margin + 8)
    let currentY = tableStartY
    drawTableHeader(currentY)
    currentY += 7

    // Draw all rows
    gritSizes.forEach((grit, index) => {
      // Check if we need a new page
      if (currentY + 5 > tableEndY) {
        // Add footer to current page
        addFooter(pdf.getNumberOfPages(), 0)
        
        // Add new page
        pdf.addPage()
        addHeader(margin + 8)
        currentY = tableStartY
        drawTableHeader(currentY)
        currentY += 7
      }

      drawTableRow(grit, currentY, index % 2 === 0)
      currentY += 5
    })

    // Add notes section on last page
    const lastPage = pdf.getNumberOfPages()
    pdf.setPage(lastPage)
    
    if (currentY + 20 < tableEndY) {
      currentY += 3
      pdf.setDrawColor(200, 200, 200)
      pdf.line(tableStartX, currentY, tableStartX + totalTableWidth, currentY)
      currentY += 5

      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      pdf.text('Notes:', tableStartX, currentY)
      currentY += 4

      pdf.setFontSize(7)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(80, 80, 80)
      const notes = [
        '• FEPA: Federation of European Producers of Abrasives (P-grade standard)',
        '• ANSI: American National Standards Institute (B74.18 / CAMI). Column shows the nearest ANSI grit number by particle size.',
        '• JIS: Japanese Industrial Standards (R6010). Column shows the nearest JIS grit number by particle size.',
        '• Micron (μm): Nominal FEPA-P average particle size in micrometers',
        '• Mesh: US Standard mesh size (screen openings per inch). Applies to macrogrits (~220 and coarser) only; finer grades are graded by sedimentation, not screening.',
        '• The standards diverge at the fine end (e.g. FEPA P1200 ≈ ANSI 600). Do not match grit numbers directly.',
        '• Conversions are approximate; actual values may vary between manufacturers',
      ]

      notes.forEach((note) => {
        if (currentY + 4 > tableEndY) {
          pdf.addPage()
          addHeader(margin + 8)
          currentY = tableStartY
        }
        pdf.text(note, tableStartX + 2, currentY)
        currentY += 4
      })
    }

    // Add footers to all pages
    const totalPages = pdf.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      addFooter(i, totalPages)
    }

    pdf.save('grit-size-conversion-chart.pdf')
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
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Grit Size Conversion Chart</h1>
              <p className="text-gray-600">
                Reference chart for converting between different grit size standards (FEPA, ANSI, JIS, Micron, Mesh)
              </p>
            </div>
            <button
              onClick={downloadPDF}
              className="btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div ref={chartRef} className="bg-white border border-gray-200 rounded-lg p-8 overflow-x-auto">
          {/* Header - Hidden in PDF but shown on page */}
          <div className="mb-6 print:hidden">
            <h2 className="text-xl font-bold text-primary-600 mb-2">
              Grit Size Conversion Chart
            </h2>
            <p className="text-gray-600 text-sm">
              Metallography.org - Free Educational Resources
            </p>
          </div>

          {/* Important: standards diverge at the fine end */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">Important — these standards are NOT a 1:1 conversion</h3>
            <p className="text-sm text-amber-900 mb-2">
              FEPA-P (FEPA-43-GB), ANSI/CAMI B74.18, and JIS R6010 use essentially the same grit numbers at coarse
              sizes (about 220 and coarser) but <strong>diverge increasingly at finer sizes — by the fine end,
              US/CAMI 600 grit ≈ FEPA P1200, and US 1200 ≈ P2500</strong>. The micron column below shows the
              <strong> FEPA-P particle size</strong> for the row's P-grade. The ANSI and JIS numbers in the same row are
              the closest grit-number neighbors, not the equivalent particle size in those standards. For ANSI/CAMI and
              JIS particle sizes at the fine end, use the divergence table below.
            </p>
            <p className="text-xs text-amber-900">
              For most metallographic prep work, identify which scale your paper is sold under and stay in that scale —
              don't substitute "P1200" for "1200 grit" if your supplier ships ANSI/CAMI papers.
            </p>
          </div>

          {/* Chart Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary-600 text-white">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">FEPA-P</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">ANSI <span className="font-normal text-xs">(nearest no.)</span></th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">JIS <span className="font-normal text-xs">(nearest no.)</span></th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">FEPA-P size (μm)</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Mesh</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Category</th>
                </tr>
              </thead>
              <tbody>
                {gritSizes.map((grit, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="border border-gray-300 px-3 py-2 font-medium">{grit.fepa}</td>
                    <td className="border border-gray-300 px-3 py-2">{grit.ansi}</td>
                    <td className="border border-gray-300 px-3 py-2">{grit.jis}</td>
                    <td className="border border-gray-300 px-3 py-2">{grit.micron}</td>
                    <td className="border border-gray-300 px-3 py-2">{grit.mesh}</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">{grit.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Where the standards diverge — the fine-grit truth table */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold mb-2">Where FEPA-P, ANSI/CAMI, and JIS diverge</h3>
            <p className="text-sm text-gray-700 mb-4">
              Beyond roughly 240 grit, the same grit number means very different particle sizes in each standard. If
              your paper is labeled "1200 grit" with no other context, the actual abrasive size depends entirely on
              which standard the manufacturer used. Use this table to translate between them.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Grit number</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">FEPA-P (μm)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">ANSI/CAMI (μm)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold">JIS R6010 (μm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 font-medium">120</td><td className="border border-gray-300 px-3 py-2">125</td><td className="border border-gray-300 px-3 py-2">~125</td><td className="border border-gray-300 px-3 py-2">~125</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2 font-medium">240</td><td className="border border-gray-300 px-3 py-2">58</td><td className="border border-gray-300 px-3 py-2">52</td><td className="border border-gray-300 px-3 py-2">57</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 font-medium">320</td><td className="border border-gray-300 px-3 py-2">46</td><td className="border border-gray-300 px-3 py-2">35</td><td className="border border-gray-300 px-3 py-2">40</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2 font-medium">400</td><td className="border border-gray-300 px-3 py-2">35</td><td className="border border-gray-300 px-3 py-2">22</td><td className="border border-gray-300 px-3 py-2">32</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 font-medium">600</td><td className="border border-gray-300 px-3 py-2">26</td><td className="border border-gray-300 px-3 py-2">15</td><td className="border border-gray-300 px-3 py-2">20</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2 font-medium">800</td><td className="border border-gray-300 px-3 py-2">22</td><td className="border border-gray-300 px-3 py-2">12</td><td className="border border-gray-300 px-3 py-2">14</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 font-medium">1200</td><td className="border border-gray-300 px-3 py-2">15</td><td className="border border-gray-300 px-3 py-2">8</td><td className="border border-gray-300 px-3 py-2">9.2</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2 font-medium">1500</td><td className="border border-gray-300 px-3 py-2">13</td><td className="border border-gray-300 px-3 py-2">6</td><td className="border border-gray-300 px-3 py-2">8</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 font-medium">2000</td><td className="border border-gray-300 px-3 py-2">10</td><td className="border border-gray-300 px-3 py-2">5</td><td className="border border-gray-300 px-3 py-2">6.7</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2 font-medium">2500</td><td className="border border-gray-300 px-3 py-2">8.4</td><td className="border border-gray-300 px-3 py-2">—</td><td className="border border-gray-300 px-3 py-2">—</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              Source: FEPA 43-GB, ANSI B74.18, JIS R6010. Values rounded to typical manufacturer ranges.
              The grinding ladder used in our guides (P120 → P320 → P600 → P800 → P1200 in FEPA-P) corresponds
              roughly to US/CAMI 120 → 280 → 360 → 400 → 600 in actual particle size.
            </p>
          </div>

          {/* Notes Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold mb-4">Notes</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>FEPA-P:</strong> Federation of European Producers of Abrasives, P-grade (FEPA 43-GB). Most European and many international metallographic papers.</li>
              <li>• <strong>ANSI/CAMI:</strong> ANSI B74.18, the standard used by most North American manufacturers (also called CAMI for Coated Abrasive Manufacturers Institute).</li>
              <li>• <strong>JIS:</strong> JIS R6010 — Japanese Industrial Standard.</li>
              <li>• <strong>Mesh:</strong> US Standard mesh size (screen openings per linear inch in the screen used to grade the abrasive). Only macrogrits (~220 and coarser) are screen-graded; finer grades are classified by sedimentation, so no mesh equivalent is listed.</li>
              <li>• Particle-size figures are nominal; manufacturer-specific values can vary by ±10–20%.</li>
              <li>• For acceptance work, verify abrasive standard and particle size on the manufacturer's data sheet.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
