"use client"


type formResponseType = { filenameChoice: FormDataEntryValue | null , seriesChoice: FormDataEntryValue | null }

type PrintFormProps = { 
  isVisible: (value:boolean)=> void, 
  onFormSubmit: (formObj: formResponseType) => void
}


export default function PrintForm ( { isVisible , onFormSubmit }: PrintFormProps ) { 

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => { 

    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const formObject = { 
      filenameChoice: formData.get("videos"), 
      seriesChoice: formData.get("series") 
    }

    onFormSubmit(formObject)
    isVisible(false)
  }


  return ( 
    <div className="z-10 pointer-events-auto absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center">
      <div className="flex flex-col min-w-72 h-5/6 overflow-scroll m-4 p-4 rounded-2xl bg-teal-400 text-inherit sm: w-4/6 max-w-150 dark:bg-teal-950">

        {/* Bouton fermer modale */}
        <button
          onClick={ () => { isVisible(false) } }
          className="p-1 leading-none text-sm self-end"
        >
          X
        </button>
  
        <form onSubmit={ handleSubmit } className="flex flex-col" >

          <label>
            <input type="checkbox" name="videos" className="mr-4" />
            Imprimer noms de fichiers avec .extension ?
          </label>

          <label>
            <input type="checkbox" name="series" className="mr-4" />
            Imprimer Liste condensée (titres séries uniquement) ou Liste détaillée (tous les fichiers individuellement) ?
          </label>

          <div className="flex justify-center mt-6" >
            <button type="submit" className="w-fit" >Valider</button>
          </div>
  
        </form>
      </div>
    </div>
  )
}