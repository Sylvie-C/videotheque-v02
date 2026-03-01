"use client"

import { useState, useCallback } from "react"
import { PDFDocument } from "pdf-lib"


import type { PrintData } from "@/app/types/print-types"
import { generatePdfFromData } from "@/app/lib/test_pdfGenerator"


/* 
export function usePdfPreview(data: PrintData | null) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generatePreview = useCallback(async () => {
    if (!data) return
    setLoading(true)
    setError(null)

    try {
      const pdfBytes = await generatePdfFromData(data)

     
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setPreviewUrl((old) => {
        if (old) URL.revokeObjectURL(old)
        return url
      })


    } catch (e) {
      setError("Impossible de générer le PDF.")
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [data])

  const download = useCallback(() => {
    if (!previewUrl) return
    const a = document.createElement("a")
    a.href = previewUrl
    a.download = "videotheque.pdf"
    a.click()
  }, [previewUrl])

  return { previewUrl, loading, error, generatePreview, download }
}
*/

