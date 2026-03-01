import { PDFDocument , StandardFonts } from "pdf-lib"

import { pdfPrintType } from "../types/print-types"


const PAGE_WIDTH = 595
const PAGE_HEIGHT = 842

export const generatePdfFromData = async (data: pdfPrintType) => { 

  const pdfDoc = await PDFDocument.create()

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const fontSize = 12
  let y = PAGE_HEIGHT

  for (const elt of data) {  

    // Vérifie place restante pour titre
    if (y < 70) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])  // plus de place -> nouvelle page

      y = PAGE_HEIGHT - 50      // marge haut nouvelle page
    }

    // Titre catégorie
    y -=30    // marge au-dessus
    page.drawText(elt.title, { x: 50, y, size: 18, font })
    y -= 20   // marge au-dessous

    for (const video of elt.videos) {

      // Vérifie place restante pour nouvelle ligne
      if (y < 48) {
        page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])

        y = PAGE_HEIGHT - 50    // marge haut nouvelle page
      }

      // Lignes liste vidéos
      const line = `• ${video}`
      page.drawText(line, { x: 60, y, size: fontSize, font })
      y -= 18
    }
  }

  const pdfDataUri = await pdfDoc.saveAsBase64( {dataUri: true} )
  return pdfDataUri
}