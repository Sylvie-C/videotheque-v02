"use client"

import { ChangeEvent } from "react"

import { videoType } from "../types/videos-types"

type ListModalProps = {
  isVisible: (value: boolean) => void, 
  series: videoType[],
  categorySelectedVideos: videoType[], 
  onSelect: (video: videoType) => void, 
}


const SERIES_DIR = process.env.NEXT_PUBLIC_SERIES_DIR !


export default function ListModal ( { isVisible , series , categorySelectedVideos , onSelect }: ListModalProps ) { 

  // Au montage du composant, créer le JSX selon catégorie de vidéos sélectionnée
  let jsx 
  
  // Si catégorie = "series", afficher les titres des séries avec menu déroulant vidéos
  if ( categorySelectedVideos[0]?.path.includes(SERIES_DIR) ) { 

    jsx = series.map ( (elt:videoType , index:number) =>  
      <div  key={`serie-${index}`} className="mb-2" >

        <label htmlFor={`${elt.title}`} key={`label-${index}`} > {elt.title} </label>

        <select 
          id={`${elt.title}`} 
          key={`select-${index}`} 
          className="cursor-pointer w-10 ml-4 px-2 appearance-none rounded-2xl border-2
           border-teal-950 dark:border-teal-400 hover:border-purple-500"
        
          onChange={ (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement> ) => { 

              // e.target.value = videoIndex, index vidéo en tableau categorySelectedVideos
              onSelect( categorySelectedVideos [ Number(e.target.value)] ) 

              isVisible(false) // Fermeture modale liste
            }

          }
        >

          <option value="" key={`${index}-default-option`} > ⬇️ </option>
          {  
            categorySelectedVideos.map ( (video , videoIndex) => 

              // Options vidéos pour Série en cours uniquement
              ( video.path.includes(elt.filename) ) && 
                <option value= {`${videoIndex}`} key={`option-${videoIndex}`} >
                  { video.filename }
                </option>
            )
          }
        </select>
  
      </div>
    ) 
  }

  // Autres catégories que séries
  else { jsx = 
    <ul> 
      { categorySelectedVideos.map ( (elt,index) => 

          <li key={`video-${index}`}>
            <button 
              onClick={ () => onSelect(elt) } 
              className="btn-linkstyle"
            > 
              {elt.filename} 
            </button>
          </li>
        ) 
      } 
    </ul>
  }
  

  return ( 
    <div className="z-10 pointer-events-auto absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center">
      <div className="min-w-72 h-5/6 overflow-scroll m-4 p-4 rounded-2xl bg-teal-400 text-inherit sm: w-4/6 max-w-150 dark:bg-teal-950">
        
        <div className="flex flex-col">

          {/* Bouton fermer modale */}
          <button 
            onClick={ () => { isVisible(false) } } 
            className="p-1 leading-none text-sm self-end" 
          >
            X
          </button>

          <div className="border-2 rounded-2xl border-teal-950 dark:border-teal-400 my-8 p-2">
            <p className="text-sm md:text-base mb-2" >Sélectionner une vidéo pour lancer sa lecture. </p>
            <p className="text-sm md:text-base" >⚠️ Attention : 
              <br/>Les lecteurs vidéo en navigateur ne supportent que les formats vidéo <strong>.mp4</strong>, <strong>.webm</strong>, et <strong>.ogg</strong>.</p>
          </div>

          {/* Liste des vidéos */}
          { jsx }

        </div>

      </div>
    </div>
  )
}