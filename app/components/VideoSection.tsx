"use client"

import { useState } from "react"

import { videoType } from "../types/videos-types"

import Menu from "@/app/components/Menu"
import VideoPlayer from "@/app/components/VideoPlayer"


type VideoSectionProps = { 
  videos: videoType[], 
  series: videoType[]
}


export default function VideoSection ( {videos , series }: VideoSectionProps ) { 

  const videosData = { videos , series }

  const [ videoSelected , setVideoSelected ] = useState<videoType | null>(null)
  const [ modal , showModal ] = useState(false) 


  return (
    <section>
      <Menu data={videosData} onVideoSelect={ (video: videoType) => { setVideoSelected(video); showModal(true); } } />
      { modal && <VideoPlayer video={videoSelected} visible={ showModal } />}
    </section>
  )
}