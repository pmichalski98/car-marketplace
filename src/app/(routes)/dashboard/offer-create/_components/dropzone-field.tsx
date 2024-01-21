import { useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { FileWithPath, useDropzone } from "react-dropzone"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DropzoneFieldProps {
   setFilePreviews: React.Dispatch<React.SetStateAction<string[]>>
   filePreviews: string[]
}

function DropzoneField({ setFilePreviews, filePreviews }: DropzoneFieldProps) {
   const typeValidator = (file: FileWithPath) => {
      if (file.type.startsWith("image/")) {
         if (file.size > 3 * 1024 * 1024) {
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
      setFilePreviews((prev) => [
         ...prev,
         ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ])
   }, [acceptedFiles])

   const handlePreviewImageRemove = (path: string) => {
      setFilePreviews((prev) => prev.filter((item) => path !== item))
   }

   return (
      <>
         {filePreviews.length > 0 && (
            <div>
               <p>Dodane zdjęcia:</p>
               <ul className="flex flex-wrap gap-5">
                  {filePreviews.map((path, index) => (
                     <li key={path} className="relative">
                        <Image
                           src={path}
                           alt="added image"
                           height={200}
                           width={0}
                           style={{ width: "auto" }}
                        />
                        <Button
                           variant={"destructive"}
                           size={"sm"}
                           className="absolute right-3 top-3 size-7 p-1"
                           onClick={() => handlePreviewImageRemove(path)}
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
