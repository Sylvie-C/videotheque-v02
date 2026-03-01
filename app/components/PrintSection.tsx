"use client"

import { useState , useEffect } from "react"
import type { JSX } from "react"

import { videoType } from "../types/videos-types"

import PrintForm from "@/app/components/PrintForm"
import PreviewPdf from "@/app/components/PreviewPdf"


type PrintSectionProps = { 
  listWithSeriesnames: videoType[], 
  allVideosList: videoType[]
}

type formResponseType = { 
  filenameChoice: FormDataEntryValue | null , 
  seriesChoice: FormDataEntryValue | null 
}

const MOVIES_DIR = process.env.NEXT_PUBLIC_MOVIES_DIR ! 
const SERIES_DIR = process.env.NEXT_PUBLIC_SERIES_DIR !
const SHOWS_DIR = process.env.NEXT_PUBLIC_SHOWS_DIR !
const MISC_DIR = process.env.NEXT_PUBLIC_MISC_DIR !


export default function PrintSection ( { listWithSeriesnames, allVideosList }: PrintSectionProps ) { 

  const [ modalVisible , showModal ] = useState(false)
  const [ formData , setFormData ] = useState<formResponseType | null>(null)
  const [ previewJsx , setPreviewJsx ] = useState<JSX.Element>(<></>)

  // JSX Preview
  const generateJSXPreview = () => { 

    const moviesJsx = 
    <ul className="ml-4" >
      { 
        allVideosList.map ( (elt,index)=> ( 

          elt.path.includes(MOVIES_DIR) && 

          <li key={`video-${index}`} className="hyphens-auto wrap-break-word" >
            🎞️ { formData?.filenameChoice ? elt.filename : elt.title }
          </li>
        )) 
      }
    </ul>

    const seriesJsx = 
    <ul className="ml-4" >
      { formData?.seriesChoice ?

          // Choix noms séries uniquement (liste condensée)
          listWithSeriesnames.map ( (elt,index)=> ( 
          elt.path.includes(SERIES_DIR) && 
          <li key={`video-${index}`} className="hyphens-auto wrap-break-word" >📺 { formData?.filenameChoice ? elt.filename : elt.title }</li>
        )) 
        
        : 
        
        // Choix liste détaillée
        allVideosList.map( (elt,index)=> (
          elt.path.includes(SERIES_DIR) && 

          <li key={`video-${index}`} className="hyphens-auto wrap-break-word" >📺 { formData?.filenameChoice ? elt.filename : elt.title } </li>
        ))
      }
    </ul>

    const showsJsx = 
    <ul className="ml-4" >
      { 
        allVideosList.map ( (elt,index)=> ( 

          elt.path.includes(SHOWS_DIR) && 

          <li key={`video-${index}`} className="hyphens-auto wrap-break-word" >
            🎭 { formData?.filenameChoice ?elt.filename : elt.title }
          </li>
        )) 
      }
    </ul>

    const miscJsx = 
    <ul className="ml-4" >
      { 
        allVideosList.map ( (elt,index)=> ( 

          elt.path.includes(MISC_DIR) && 

          <li key={`video-${index}`} className="wrap-break-word" >
            📁 { formData?.filenameChoice ? elt.filename : elt.title }
          </li>
        )) 
      }
    </ul>
    
    const jsx = <div>
      <h2>Films</h2>
        { moviesJsx }
      <h2>Séries</h2>
        { seriesJsx }
      <h2>Spectacles</h2>
        { showsJsx }
      <h2>Divers</h2>
        { miscJsx }
    </div>

    return jsx
  }

  // PDF Preview
  const generatePDFPreviewData = ( series:videoType[] , allVideos:videoType[] ) => { 

    const moviePdf = allVideos.flatMap ( elt=> ( 
      elt.path.includes(MOVIES_DIR) ? (formData?.filenameChoice ? elt.filename : elt.title) : []
    )) 

    let seriesPdf
    // Si choix série avec uniquement noms (liste condensée, case à cocher -> === "on", sinon "null")
    if (formData?.seriesChoice) { 
      seriesPdf = series.flatMap ( elt=> 
        elt.path.includes(SERIES_DIR) ? (formData?.filenameChoice ? elt.filename : elt.title) : []
      )
    }
    else { 
      seriesPdf = allVideos.flatMap ( elt=> ( 
        elt.path.includes(SERIES_DIR) ? (formData?.filenameChoice ? elt.filename : elt.title) : []
      ))
    }

    const showsPdf = allVideos.flatMap ( (elt)=> ( 
      elt.path.includes(SHOWS_DIR) ? (formData?.filenameChoice ? elt.filename : elt.title) : []
    )) 

    const miscPdf = allVideos.flatMap ( (elt)=> ( 
      elt.path.includes(MISC_DIR) ? (formData?.filenameChoice ? elt.filename : elt.title) : []
    )) 

    return { movies: moviePdf , series: seriesPdf , shows: showsPdf , misc: miscPdf }
  }

  const previewPdf = generatePDFPreviewData( listWithSeriesnames , allVideosList )


  // On form submits, update JSX preview in state
  useEffect ( ()=> {
    const previewJsx = generateJSXPreview()
    setPreviewJsx(previewJsx)
  }, [formData])


  return (
    <section>
      {/* Bouton "Imprimer liste" */}
      <button  
        onClick= { () => showModal(true) } 
        className="pointer-events-auto p-1 leading-none mt-8"
      >
        Visualiser Liste
      </button>

      {/* Formulaire choix impression */}
      {modalVisible && 
        <PrintForm 
          isVisible= { (value)=> showModal(value) } 
          onFormSubmit= { (formResponse: formResponseType) => setFormData(formResponse) } 
        />
      }

      {formData && <PreviewPdf previewJsx={ previewJsx } pdfPreviewData={ previewPdf } /> }
    </section>
  )
}