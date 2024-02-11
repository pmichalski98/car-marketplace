import React, { Dispatch } from "react"
import Image from "next/image"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const SortableItem = ({
   index,
   path,
   setImagePreviews,
   ...props
}: {
   path: string
   index: number
   setImagePreviews: Dispatch<React.SetStateAction<string[]>>
}) => {
   const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: path })

   const style = {
      transform: CSS.Transform.toString(transform),
      transition: transition || undefined,
   }
   const handlePreviewImageRemove = (path: string) => {
      setImagePreviews((prev) => prev.filter((item) => path !== item))
   }

   return (
      <div
         className={"relative float-left m-2 aspect-square md:size-52 "}
         ref={setNodeRef}
         style={style}
         {...props}
      >
         <Image
            src={path}
            alt="added image"
            fill
            className=" object-cover object-center"
            {...attributes}
            {...listeners}
         />
         {index === 0 && (
            <Badge className="absolute left-2 top-2" variant={"destructive"}>
               Zdjęcie główne
            </Badge>
         )}
         <Badge className="absolute bottom-2 left-2" variant={"secondary"}>
            Zdjęcie nr {index + 1}
         </Badge>
         <Button
            variant={"destructive"}
            size={"sm"}
            className="absolute right-3 top-3 z-[9999] size-7 p-1"
            onClick={() => handlePreviewImageRemove(path)}
         >
            <X />
         </Button>
      </div>
   )
}

export default SortableItem
