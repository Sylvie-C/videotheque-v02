"use client"

import { videoType } from "@/app/types/videos-types"

type VideoPlayerProps = { 
  video: videoType | null
  visible: (value:boolean) => void
}


export default function VideoPlayer ( { video , visible }: VideoPlayerProps ) { 

  return (
    <div className="w-full flex flex-col justify-center items-center z-10 pointer-events-auto absolute top-0 left-0 bg-black/50"> 
      {
        video &&
        <div className="flex flex-col items-center rounded-2xl bg-teal-400 dark:bg-teal-950" >

          {/* Bouton fermer modale */}
          <button 
            onClick={ () => { visible(false) } } 
            className="p-1 leading-none text-sm self-end" 
          >
            X
          </button>

          <p>{video.title}</p>   
 
          <video controls key={`video-${video.title}`} className="h-screen" >
            <source src={ `${process.env.NEXT_PUBLIC_GET_VIDEO}/${video.path}/${video.filename}` } type={video.type} />
            Votre navigateur ne supporte pas la vidéo HTML5.
          </video>

        </div>
      }
    </div>
  )
}