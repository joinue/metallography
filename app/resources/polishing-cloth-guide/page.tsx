'use client'

import { useRef } from 'react'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import Link from 'next/link'

export default function PolishingClothGuidePage() {
  const guideRef = useRef<HTMLDivElement>(null)

  // Generic pad classes. Harder pads hold flatness and edge retention but
  // leave more fine scratches; softer napped pads scratch less but cause
  // relief between phases of different hardness.
  const coarsePads = [
    { name: 'Metal mesh', desc: 'Metal mesh pad for semi-fixed abrasive coarse to intermediate lapping. Excellent for initial removal of damage from sectioning and hard materials.', use: '9-15 μm diamond' },
    { name: 'Hard woven (silk, woven nylon)', desc: 'Hard woven cloth for rough polishing. Maximum flatness and edge retention; the standard pad class for the 9 μm diamond step on metals and alloys.', use: '6-15 μm diamond' },
    { name: 'Woven polyester', desc: 'Durable synthetic polyester pad ideal for intermediate polishing, especially with 6–15 μm diamond abrasives. A long-life alternative to woven nylon.', use: '6-15 μm diamond' },
    { name: 'Non-woven textile', desc: 'Widely used non-woven intermediate polishing pad, compatible with most diamond suspensions. Effective across a broad range of materials.', use: '3-15 μm diamond' },
    { name: 'Porometric polymer', desc: 'Porometric polymer pad with rubber-like consistency, offering balanced action between low and high nap pads. Ideal for moderate nap intermediate polishing.', use: '3-9 μm diamond' },
    { name: 'Medium-nap synthetic suede', desc: 'Medium napped synthetic suede cloth, the standard pad class for the 3 μm diamond step. Balances scratch removal against relief.', use: '1-6 μm diamond' },
    { name: 'Firm low-nap', desc: 'Low-napped pad ideal for 1–9 μm polishing. Designed for consistent material removal and flatness control during final pre-polishing.', use: '1-9 μm diamond' },
  ]

  const finalPads = [
    { name: 'Foam-backed low-nap woven', desc: 'Woven low-nap final polishing pad with foam backing for enhanced compliance. Ideal for 1–6 μm diamond. Great for critical surface flatness needs.', use: '1-6 μm diamond' },
    { name: 'Soft napped (chemotextile)', desc: 'Soft napped chemotextile cloth, the standard pad class for the 1 μm diamond step and for producing a mirror finish on metals and polymers.', use: '1 μm diamond, final alumina' },
    { name: 'High-nap synthetic', desc: 'High-napped final polishing pad ideal for producing a mirror finish on metals and polymers. Recommended for <1 μm diamond or colloidal silica.', use: '<1 μm diamond, colloidal silica' },
    { name: 'Very high-nap flocked', desc: 'Very high-napped final polishing pad tailored for soft metals and polymers. Provides gentle polishing action to minimize pull-out and relief.', use: '<1 μm diamond, soft materials' },
    { name: 'Porous polyurethane', desc: 'Porous polyurethane pad for chemo-mechanical final polishing with colloidal silica. A standard choice for deformation-free finishes and EBSD preparation.', use: 'Colloidal silica' },
    { name: 'Wool cloth', desc: 'Wool-based final polishing cloth used when edge retention is not critical. Works well with alumina and colloidal silica on metals.', use: 'Colloidal silica, alumina' },
    { name: 'Felt', desc: 'Thick final polishing pad made for large samples or glass. Ideal for use with colloidal silica or alumina slurries where surface uniformity is key.', use: 'Colloidal silica, alumina' },
  ]

  const downloadPDF = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // Load logo once
    let logoDataUrl: string | null = null
    try {
      const logoImg = await fetch('/logo.png').then(res => res.blob()).then(blob => {
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

    // Helper function to add small logo to bottom right of page
    const addFooterLogo = () => {
      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, 'PNG', 190 - 8, 290 - 8, 8, 8)
      }
    }

    // First page - title at top, logo + URL below, then date
    pdf.setFontSize(20)
    pdf.setTextColor(37, 99, 235)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Polishing Cloth Selection Guide', 20, 20)

    // Logo badge and URL below title (smaller) - only on first page
    if (logoDataUrl) {
      pdf.addImage(logoDataUrl, 'PNG', 20, 25, 8, 8)
    }
    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Metallography.org', 30, 30)

    // Generated date with a little spacing
    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 38)

    let yPos = 50
    const lineHeight = 6
    const leftMargin = 20
    const rightMargin = 190

    const checkPageBreak = (requiredSpace: number) => {
      if (yPos + requiredSpace > 275) {
        pdf.addPage()
        yPos = 20
        return true
      }
      return false
    }

    // Introduction
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Introduction', leftMargin, yPos)
    yPos += lineHeight

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const introText = 'The choice of polishing pad significantly affects polishing results. Different pad types provide varying levels of hardness, nap, and cutting action. Select the appropriate pad for each polishing stage.'
    const introLines = pdf.splitTextToSize(introText, rightMargin - leftMargin)
    pdf.text(introLines, leftMargin, yPos)
    yPos += introLines.length * lineHeight + 5

    // Coarse/Intermediate Pads
    checkPageBreak(30)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Coarse / Intermediate Polishing Pads', leftMargin, yPos)
    yPos += lineHeight + 2

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    coarsePads.forEach(pad => {
      checkPageBreak(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text(pad.name, leftMargin, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode mu character with regular text for better PDF rendering
      const descText = pad.desc.replace(/μ/g, 'u').replace(/μm/g, 'um')
      const descLines = pdf.splitTextToSize(descText, rightMargin - leftMargin - 10)
      pdf.text(descLines, leftMargin + 5, yPos)
      yPos += descLines.length * lineHeight
      pdf.setFont('helvetica', 'italic')
      // Replace Unicode mu character with regular text for better PDF rendering
      const recText = `Recommended: ${pad.use.replace(/μ/g, 'u').replace(/μm/g, 'um')}`
      const recLines = pdf.splitTextToSize(recText, rightMargin - leftMargin - 10)
      pdf.text(recLines, leftMargin + 5, yPos)
      yPos += recLines.length * lineHeight + 2
    })

    // Final Polishing Pads
    checkPageBreak(30)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Final Polishing Pads', leftMargin, yPos)
    yPos += lineHeight + 2

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    finalPads.forEach(pad => {
      checkPageBreak(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text(pad.name, leftMargin, yPos)
      yPos += lineHeight
      pdf.setFont('helvetica', 'normal')
      // Replace Unicode mu character with regular text for better PDF rendering
      const descText = pad.desc.replace(/μ/g, 'u').replace(/μm/g, 'um')
      const descLines = pdf.splitTextToSize(descText, rightMargin - leftMargin - 10)
      pdf.text(descLines, leftMargin + 5, yPos)
      yPos += descLines.length * lineHeight
      pdf.setFont('helvetica', 'italic')
      // Replace Unicode mu character with regular text for better PDF rendering
      const recText = `Recommended: ${pad.use.replace(/μ/g, 'u').replace(/μm/g, 'um')}`
      const recLines = pdf.splitTextToSize(recText, rightMargin - leftMargin - 10)
      pdf.text(recLines, leftMargin + 5, yPos)
      yPos += recLines.length * lineHeight + 2
    })

    // Selection Guidelines
    checkPageBreak(30)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Selection Guidelines', leftMargin, yPos)
    yPos += lineHeight + 2

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    const guidelines = [
      'Hard materials: Use harder pads (metal mesh, hard woven, non-woven textile) for initial steps',
      'Soft materials: Use softer napped pads to reduce scratching, accepting some relief',
      'Intermediate steps: Use medium-hard pads (porometric polymer, firm low-nap)',
      'Final polishing: Use soft napped or high-nap pads for mirror finish; porous polyurethane or chemotextile with colloidal silica',
      'Multi-phase materials: Use harder, lower-nap pads to keep phases co-planar and minimize relief',
      'Trade-off: harder pads give flatter surfaces and better edge retention but more fine scratches; softer pads scratch less but cause relief',
    ]
    guidelines.forEach(guideline => {
      checkPageBreak(8)
      pdf.text(`• ${guideline}`, leftMargin + 5, yPos)
      yPos += lineHeight
    })

    // Shop Link Section
    checkPageBreak(25)
    yPos += 5
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235)
    pdf.text('Shop Polishing Pads', leftMargin, yPos)
    yPos += lineHeight + 2
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
    const shopText = 'Polishing pads in all of these classes are available from metallographic consumable suppliers in a range of sizes and backing options.'
    const shopLines = pdf.splitTextToSize(shopText, rightMargin - leftMargin)
    pdf.text(shopLines, leftMargin, yPos)
    yPos += shopLines.length * lineHeight + 2
    
    pdf.setFontSize(9)
    pdf.setTextColor(37, 99, 235)
    pdf.text('https://shop.metallographic.com/collections/polishing-pads', leftMargin, yPos)

    // Footer with logo
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      addFooterLogo()
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`Page ${i} of ${pageCount} | metallography.org`, 105, 290, { align: 'center' })
    }

    pdf.save('Polishing-Cloth-Selection-Guide.pdf')
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / Polishing Cloth Selection Guide
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Polishing Cloth Selection Guide</h1>
            <p className="text-xl text-gray-600">
              Guide to selecting the right polishing cloth class for each polishing stage, based on pad hardness, nap, and the flatness-vs-relief trade-off.
            </p>
          </div>

          {/* Download Button */}
          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Download PDF Guide</h2>
                <p className="text-gray-600 text-sm">
                  Get a printable guide with polishing pad descriptions, applications, and selection guidelines.
                </p>
              </div>
              <button
                onClick={downloadPDF}
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div ref={guideRef} className="card">
            <h2 className="text-2xl font-semibold mb-4">Preview</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Coarse / Intermediate Polishing Pads</h3>
                <div className="space-y-4">
                  {coarsePads.map((pad, idx) => (
                    <div key={idx} className="border-l-4 border-primary-500 pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{pad.name}</h4>
                      </div>
                      <p className="text-sm text-gray-700">{pad.desc}</p>
                      <p className="text-sm text-gray-600 italic mt-1">Recommended: {pad.use}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Final Polishing Pads</h3>
                <div className="space-y-4">
                  {finalPads.map((pad, idx) => (
                    <div key={idx} className="border-l-4 border-primary-500 pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{pad.name}</h4>
                      </div>
                      <p className="text-sm text-gray-700">{pad.desc}</p>
                      <p className="text-sm text-gray-600 italic mt-1">Recommended: {pad.use}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary-600">Selection Guidelines</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Hard materials: Use harder pads (metal mesh, hard woven, non-woven textile) for initial steps</li>
                  <li>Soft materials: Use softer napped pads to reduce scratching, accepting some relief</li>
                  <li>Multi-phase materials: Use harder, lower-nap pads to keep phases co-planar and minimize relief</li>
                  <li>Final polishing: Use soft napped or high-nap pads for mirror finish; porous polyurethane or chemotextile with colloidal silica</li>
                </ul>
              </section>
            </div>
          </div>

          {/* Shop Link */}
          <div className="mt-8 bg-primary-600 text-white rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-white">Shop Polishing Pads</h3>
            <p className="text-white/90 mb-4">
              Polishing pads in these classes are available in multiple sizes and backing options.
            </p>
            <a
              href="https://shop.metallographic.com/collections/polishing-pads"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Polishing Pads →
            </a>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Use our Polishing Time Calculator or check out our comprehensive polishing methods guide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/tools/polishing-time-calculator" className="text-primary-600 font-semibold hover:underline">
                Polishing Time Calculator →
              </Link>
              <Link href="/guides/polishing-methods" className="text-primary-600 font-semibold hover:underline">
                Polishing Methods Guide →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

