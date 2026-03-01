import { Suspense } from "react"

import { getAllFiles , getSeriesNames , getFilesWithSeriesnames } from "@/app/actions/videosActions"

import VideoSection from "@/app/components/VideoSection"
import PrintSection from "@/app/components/PrintSection"


export default async function Home() { 

  const videosData = await getAllFiles()
  const seriesData = await getSeriesNames()
  const videosWithSeriesnames = await getFilesWithSeriesnames()


  return (
    <main className="p-2 flex flex-col">
      <h1 className="my-8 text-center text-4xl leading-tight">Vidéothèque</h1>

      <Suspense fallback={ <p>Chargement des données : un instant svp... </p> } >
        <VideoSection videos={videosData} series={seriesData} />
      </Suspense>

      <PrintSection listWithSeriesnames={videosWithSeriesnames} allVideosList={videosData} />

    </main>
  )
}
