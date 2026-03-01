"use client"

import { useState } from "react"

import { videoType } from "@/app/types/videos-types"
import ListModal from "@/app/components/ListModal"

type MenuProps = { 
  data: { videos: videoType[] , series: videoType[] }, 
  onVideoSelect: (video: videoType) => void
}

const MOVIES_DIR = process.env.NEXT_PUBLIC_MOVIES_DIR ! 
const SERIES_DIR = process.env.NEXT_PUBLIC_SERIES_DIR !
const SHOWS_DIR = process.env.NEXT_PUBLIC_SHOWS_DIR !
const MISC_DIR = process.env.NEXT_PUBLIC_MISC_DIR !


export default function Menu ( { data , onVideoSelect }: MenuProps ) { 

  const [ menuVisible , showMenu ] = useState(false)
  const [ modalListVisible , showModalList ] = useState(false)
  const [ categoryVideos , setCategoryVideos ] = useState<videoType[]>([])

  if ( !data ) return <div>Loading...</div>

  const videosData = data.videos
  const seriesData = data.series // Pour titres séries en modale liste vidéos

  // Filtre vidéos selon catégorie sélectionnée + save en State
  const handleCategorySelect = ( category: string ) => { 
    let categoryFolder:string

    // Interpréation identifiant catégorie cliqué selon noms de sous-dossiers
    switch(category) { 
      case "movies" : categoryFolder = MOVIES_DIR
      break; 
      case "series" : categoryFolder = SERIES_DIR
      break; 
      case "shows" : categoryFolder = SHOWS_DIR
      break; 
      case "miscellaneous" : categoryFolder = MISC_DIR
      break; 
    }

    // Filtrage
    const categoryData = videosData.flatMap( elt => 
      elt.path.includes(`${categoryFolder}`) ? [ elt ] : [] 
    )
    setCategoryVideos(categoryData)

    showModalList(true)
  } 

  return (
    <div className="pointer-events-none z-10">
       
    {/* Modale liste des vidéos pour catégorie sélectionnée */}
    { modalListVisible && 
      <ListModal 
        isVisible= { showModalList } 
        series= {seriesData}      // pour affichage titres séries en modale
        
        categorySelectedVideos= { categoryVideos } 
        onSelect= { (video:videoType) => { onVideoSelect(video); showModalList(false); } }
      /> 
    }

      {/* Bouton "Liste" */}
      <button  
        onMouseEnter= { () => showMenu(true) }    /* onHover devices */
        onClick= { () => showMenu(true) }         /* onClick devices */
        className="pointer-events-auto"
      >
        Liste
      </button>
  
      {/* Menu de sélection des catégories */}
      <div className={ `w-fit flex my-4 transition-transform transform duration-500 ${ menuVisible ? 'translate-x-0' : '-translate-x-[200%]'}` } >
        {/* Catégories */}
        <ul className="pointer-events-auto flex py-0.5 gap-x-4 rounded-lg md:px-4">
          <li key="shows" onClick={ (e) => handleCategorySelect("shows") } role="button" tabIndex={0} className="underline-animation">
            Spectacles
          </li>
          <li key="movies" onClick={ (e) => handleCategorySelect("movies") } role="button" tabIndex={0} className="underline-animation">
            Films
          </li>
          <li key="series" onClick={ (e) => handleCategorySelect("series") } role="button" tabIndex={0} className="underline-animation">
            Séries
          </li>
          <li key="misc" onClick={ (e) => handleCategorySelect("miscellaneous") } role="button" tabIndex={0} className="underline-animation">
            Divers
          </li>
        </ul>

        {/* Bouton fermer menu */}
        <button 
          onClick={ () => showMenu(false) }
          className="pointer-events-auto p-1 mx-2 leading-none text-sm" 
        >
          X
        </button>
      </div>

    </div>
  )
}