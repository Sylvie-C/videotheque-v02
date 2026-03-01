
export type pdfPreviewType = { 
  movies: string[] | [], 
  series: string[] | [], 
  shows: string[] | [],
  misc: string[] | [], 
}

export type pdfPrintType = { 
  title: string, 
  videos: string[] | []
}[]