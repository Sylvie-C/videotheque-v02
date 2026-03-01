"use server"

import fs from "fs"
import path from "path"


/* 
const VIDEOS_DIR = path.join(process.cwd(), "public", "videos")
const BASE_URL = "/videos"
const SERIES_DIR = path.join(VIDEOS_DIR, "series")
*/
const VIDEOS_DIR = process.env.VIDEOS_DIR!
const BASE_URL = process.env.BASE_URL !
const SERIES_DIR = process.env.SERIES_DIR !


const VIDEO_EXTENSIONS = [
  ".3gp", ".ari", ".asf", ".avi", ".dng", ".flv", ".m2ts", ".mkv", ".mov",
  ".mp4", ".mpeg", ".mpg", ".mts", ".mxf", ".ogg", ".ogv", ".r3d", ".ts",
  ".vob", ".webm"
]


const scanDirectory = (dir: string, baseUrl = BASE_URL) => { 

  const entries = fs.readdirSync(dir, { withFileTypes: true }) 

  let results: Array<{ title: string, filename: string, type: string, path: string }> = []

  for (const entry of entries) { 

    const fullPath = path.join(dir, entry.name)
    const relativePath = path.join(baseUrl, entry.name)

    // Si dossier, scanner à l'intérieur
    if (entry.isDirectory()) { 
      results = results.concat( scanDirectory(fullPath, relativePath) )
    } 
    
    else {
      const ext = path.extname(entry.name).toLowerCase()

      // Filtrer formats non vidéo
      if (VIDEO_EXTENSIONS.includes(ext)) { 

        // Ajouter données vidéo au tableau [{title: , filename: , type: , path: }, ...]
        results.push({
          title: path.basename(entry.name, ext),
          filename: entry.name,
          type: `video/${ext.replace(".", "")}`,
          path: baseUrl
        })
      }
    }
  }

  console.log ("results scanDirectory : " , results)

  return results
}


const scanSeriesRoot = (baseUrl= BASE_URL) => {
  if (!fs.existsSync(SERIES_DIR)) return []

  const entries = fs.readdirSync(SERIES_DIR, { withFileTypes: true })

  // On ne garde que les dossiers
  const folders = entries.filter(e => e.isDirectory())

  return folders.map(folder => ({
    title: folder.name,
    filename: folder.name,
    type: "series_folder" ,
    path: `${baseUrl}/${SERIES_DIR}`
  }))
}


const scanAllButSeries = (dir: string, baseUrl = BASE_URL) => { 

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  let results: Array<{ title: string, filename: string, type: string, path: string }> = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.join(baseUrl, entry.name)
 
    if (entry.isDirectory()) { 

      if (fullPath === SERIES_DIR) continue // exclue séries du scan
      results = results.concat(scanDirectory(fullPath, relativePath))
    }
    else {
      const ext = path.extname(entry.name).toLowerCase()

      // Filtrer formats non vidéo
      if (VIDEO_EXTENSIONS.includes(ext)) {
        results.push({
          title: path.basename(entry.name, ext),
          filename: entry.name,
          type: `video/${ext.replace(".", "")}`,
          path: baseUrl
        })
      }
    }
  }

  return results
}


export const getAllFiles = async () => { 


  const videos = scanDirectory(VIDEOS_DIR)
  return videos
}

export const getSeriesNames = async () => { 
  const results = scanSeriesRoot()
  return results
}

export const getFilesWithSeriesnames = async () => { 
  const videosButSeries = scanAllButSeries(VIDEOS_DIR)
  const seriesNames = scanSeriesRoot()

  return [...videosButSeries, ...seriesNames]
}

