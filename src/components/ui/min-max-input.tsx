"use client"

import { PopoverClose } from "@radix-ui/react-popover"
import { AlertCircle, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "./input"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "./tooltip"

interface MinMaxInputProps {
   label: string
   minError?: string
   maxError?: string
   register: any
   setValue: any
   resetField: any
   minName: string
   maxName: string
}

function MinMaxInput({
   register,
   label,
   minError,
   setValue,
   maxError,
   resetField,
   minName,
   maxName,
}: MinMaxInputProps) {
   return (
      <Popover>
         <PopoverTrigger>
            <div
               role="combobox"
               className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-min-[100px] flex h-8 justify-between gap-3 border-black"
               )}
            >
               {label}
               {minError || maxError ? (
                  <AlertCircle className="size-5 text-red-500" />
               ) : (
                  <ChevronDown className=" h-4 w-4 shrink-0 opacity-50" />
               )}
            </div>
         </PopoverTrigger>
         <PopoverContent className="w-[300px] overflow-hidden p-0">
            <div className="flex flex-col gap-4 px-3 py-6">
               <div className="relative">
                  <Input
                     {...register(minName)}
                     placeholder="Minimum"
                     onChange={(event) => {
                        const result = event.target.value.replace(/\D/g, "")
                        setValue(minName, result)
                     }}
                  />
                  {minError && (
                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger className="absolute right-3 top-2.5 text-red-500">
                              <AlertCircle />
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>{minError}</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  )}
               </div>
               <div className="relative">
                  <Input
                     {...register(maxName)}
                     placeholder="Maksimum"
                     onChange={(event) => {
                        const result = event.target.value.replace(/\D/g, "")
                        setValue(maxName, result)
                     }}
                  />
                  {maxError && (
                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger className="absolute right-3 top-2.5 text-red-500">
                              <AlertCircle />
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>{maxError}</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  )}
               </div>
            </div>
            <div className="flex">
               <Button
                  className="w-full rounded-none"
                  variant={"secondary"}
                  onClick={() => {
                     setValue(minName, undefined)
                     resetField(maxName, undefined)
                  }}
               >
                  Wyczyść
               </Button>
               <PopoverClose className="w-full">
                  <div
                     className={cn(
                        buttonVariants({ variant: "default" }),
                        "w-full rounded-none"
                     )}
                  >
                     Zapisz
                  </div>
               </PopoverClose>
            </div>
         </PopoverContent>
      </Popover>
   )
}
export default MinMaxInput
