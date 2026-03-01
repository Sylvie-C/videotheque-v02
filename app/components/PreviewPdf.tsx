"use client"

import { useMemo } from "react"
import type { JSX } from "react"

import { pdfPreviewType } from "../types/print-types"
import { generatePdfFromData } from "@/app/lib/pdfGenerator"


type PreviewPdfProps = { 
  previewJsx: JSX.Element, 
  pdfPreviewData: pdfPreviewType
}


export default function PreviewPdf({ previewJsx , pdfPreviewData }: PreviewPdfProps) { 

  // Mémorise preview pour éviter re-renders inutiles
  const memoPreview = useMemo(() => previewJsx, [previewJsx])

  const handleDownload = async () => { 

    try { 
      const moviesArray = pdfPreviewData?.movies.map(elt => elt)
      const seriesArray = pdfPreviewData?.series.map(elt=>elt)
      const showsArray = pdfPreviewData?.shows.map(elt=>elt)
      const miscArray = pdfPreviewData?.misc.map(elt=>elt)

      const pdfPrintData = [ 
        { title: "Films" , videos: moviesArray}, 
        { title: "Séries" , videos: seriesArray }, 
        { title: "Spectacles" , videos: showsArray }, 
        { title: "Divers" , videos: miscArray }
      ] 

      const pdfElement = await generatePdfFromData(pdfPrintData)

      window.open(pdfElement)
    }
    catch (error) { 
      console.error (`Problème serveur : ${error}`)
    }
  }

  return ( 

    <div>
      <div className="rounded p-2 m-2 md:m-8 border-2 border-teal-950 dark:border-teal-400">

        <div className="flex items-center justify-between mb-4">
          <p className="">Votre fichier PDF suivra le format suivant :</p>
    
          <button className="mx-2" onClick= { handleDownload } >
            Générer le PDF
          </button>
        </div>
  
        {memoPreview}
      </div>
    </div>

  )
}
