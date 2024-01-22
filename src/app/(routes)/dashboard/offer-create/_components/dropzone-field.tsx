"use client"

import { Dispatch, useEffect } from "react"
import { DndContext } from "@dnd-kit/core"
import {
   arrayMove,
   rectSwappingStrategy,
   SortableContext,
} from "@dnd-kit/sortable"

import { FileWithPath, useDropzone } from "react-dropzone"

import SortableItem from "./sortable-item"

interface DropzoneFieldProps {
   setImageFile: Dispatch<SetStateAction<File[]>>
   imageFile: File[]

}

function DropzoneField({ setImageFile, imageFile }: DropzoneFieldProps) {
   const typeValidator = (file: FileWithPath) => {
      if (file.type.startsWith("image/")) {
         if (file.size > 10 * 1024 * 1024) {
            return {
               code: "size-too-large",
               message: "Image file is larger than 3MB",
            }
         }
      }
      return null
   }
   const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
      useDropzone({
         maxFiles: 8,
         validator: typeValidator,
         accept: {
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/webp": [".webp"],
         },
      })

   useEffect(() => {
      // Update file previews when acceptedFiles change
      setImageFile((prev) => [...prev, ...acceptedFiles])
   }, [acceptedFiles])

   const handleDragEnd = (event: { active: any; over: any }) => {
      const { active, over } = event

      if (active.id !== over.id) {
         setFilePreviews((items) => {
            const oldIndex = items.indexOf(active.id)
            const newIndex = items.indexOf(over.id)

            return arrayMove(items, oldIndex, newIndex)
         })
      }

   }

   return (
      <>
         {imageFile.length > 0 && (
            <div>
               <p>Dodane zdjęcia:</p>
               <DndContext onDragEnd={handleDragEnd}>
                  <SortableContext
                     items={filePreviews}
                     strategy={rectSwappingStrategy}
                  >
                     <div className="flex w-full flex-wrap justify-center">
                        {filePreviews.map((path, index) => (
                           <SortableItem
                              key={path}
                              path={path}
                              index={index}
                              setFilePreviews={setFilePreviews}
                           />
                        ))}
                     </div>
                  </SortableContext>
               </DndContext>
            </div>
         )}
         <div
            {...getRootProps()}
            className={`flex h-28 items-center justify-center rounded-md border-2 border-dashed p-4 ${
               isDragActive ? "bg-gray-100" : ""
            }`}
         >
            <input {...getInputProps({ multiple: true, required: true })} />
            <p>
               Przeciągnij i upuść niektóre pliki tutaj lub kliknij, aby wybrać
               pliki
            </p>
         </div>
      </>
   )
}
export default DropzoneField
