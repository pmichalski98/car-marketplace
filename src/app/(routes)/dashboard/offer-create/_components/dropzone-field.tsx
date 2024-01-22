"use client"

import { Dispatch, SetStateAction, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { FileWithPath, useDropzone } from "react-dropzone"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

   const handlePreviewImageRemove = (fileName: string) => {
      setImageFile((prev) => prev.filter((item) => fileName !== item.name))
   }

   return (
      <>
         {imageFile.length > 0 && (
            <div>
               <p>Dodane zdjęcia:</p>
               <ul className="flex flex-wrap gap-5">
                  {imageFile.map((file, index) => (
                     <li key={file.size} className="relative">
                        <Image
                           src={URL.createObjectURL(file)}
                           alt="added image"
                           height={200}
                           width={0}
                           style={{ width: "auto" }}
                        />
                        <Button
                           variant={"destructive"}
                           size={"sm"}
                           className="absolute right-3 top-3 size-7 p-1"
                           onClick={() => handlePreviewImageRemove(file.name)}
                        >
                           <X />
                        </Button>
                        {index === 0 && (
                           <Badge
                              className="absolute left-2 top-2"
                              variant={"destructive"}
                           >
                              Zdjęcie główne
                           </Badge>
                        )}
                        <Badge
                           className="absolute bottom-2 left-2"
                           variant={"secondary"}
                        >
                           Zdjęcie będzie pokazane jako {index + 1}
                        </Badge>
                     </li>
                  ))}
               </ul>
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
