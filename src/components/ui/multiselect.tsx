"use client"

import { useRouter } from "next/navigation"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDown } from "lucide-react"
import { Controller } from "react-hook-form"

import { cn, setUrlParam } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "@/components/ui/command"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"

import { Checkbox } from "./checkbox"
import { Label } from "./label"

interface MultiselectProps {
   items: string[]
   control: any
   name: string
   setValue: any
   resetField: any
   label: string
   notFound: string
   searchMessage: string
}

function Multiselect({
   items,
   control,
   name,
   setValue,
   resetField,
   label,
   notFound,
   searchMessage,
}: MultiselectProps) {
   const router = useRouter()

   return (
      <Popover modal={true}>
         <PopoverTrigger>
            <div
               role="combobox"
               className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-min-[100px] flex h-8 justify-between border-black"
               )}
            >
               {label}
               <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>
         </PopoverTrigger>
         <PopoverContent className="w-[300px] p-0">
            <Command>
               <CommandInput placeholder={searchMessage} />
               <CommandEmpty>{notFound}</CommandEmpty>
               <CommandGroup className="max-h-52 overflow-y-auto">
                  {items.map((item) => {
                     return (
                        <CommandItem
                           key={item}
                           className="flex gap-2 px-0 py-0"
                        >
                           <Controller
                              control={control}
                              name={name}
                              render={({ field }) => {
                                 const isChecked = field.value.some(
                                    (innerField: any) => innerField == item
                                 )
                                 return (
                                    <Checkbox
                                       checked={isChecked}
                                       {...field}
                                       id={item}
                                       value={item}
                                       onCheckedChange={(checked) => {
                                          if (checked) {
                                             // If checked, add the item.value to the array
                                             router.push(
                                                setUrlParam(name, [
                                                   ...field.value,
                                                   item,
                                                ]).toString()
                                             )
                                             setValue(name, [
                                                ...field.value,
                                                item,
                                             ])
                                          } else {
                                             // If unchecked, filter out the item.value from the array

                                             const filteredField =
                                                field.value.filter(
                                                   (innerField: string) =>
                                                      innerField !== item
                                                )

                                             router.push(
                                                setUrlParam(
                                                   name,
                                                   filteredField.length > 0
                                                      ? filteredField
                                                      : undefined
                                                ).toString()
                                             )
                                             setValue(name, filteredField)
                                          }
                                       }}
                                    />
                                 )
                              }}
                           />
                           <Label className="w-full py-2" htmlFor={item}>
                              {item}
                           </Label>
                        </CommandItem>
                     )
                  })}
               </CommandGroup>
               <div className="flex">
                  <Button
                     className="w-full rounded-none"
                     variant={"secondary"}
                     onClick={() => {
                        router.push(setUrlParam(name, undefined).toString())
                        resetField(name)
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
            </Command>
         </PopoverContent>
      </Popover>
   )
}
export default Multiselect
