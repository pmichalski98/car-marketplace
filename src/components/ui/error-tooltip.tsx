import React from "react"
import { AlertCircle } from "lucide-react"
import { twMerge } from "tailwind-merge"

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"

interface ErrorTooltipProps {
   errorMsg: string | undefined
   classNames?: string
}
function ErrorTooltip({ errorMsg, classNames }: ErrorTooltipProps) {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger
               className={twMerge(
                  "absolute bottom-2 right-3 text-red-500",
                  classNames
               )}
            >
               <AlertCircle />
            </TooltipTrigger>
            <TooltipContent>
               <p>{errorMsg}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
}

export default ErrorTooltip
