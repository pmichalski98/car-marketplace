import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDown } from "lucide-react"
import { Controller } from "react-hook-form"

import { cn } from "@/lib/utils"
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

interface SingleSearchSelectProps {
   items: { label: string; value: string }[]
   control: any
   name: string
   setValue: any
   resetField: any
   label: string
   notFound: string
   searchMessage: string
   disabled?: boolean
}

function SingleSearchSelect({
   items,
   control,
   name,
   setValue,
   resetField,
   label,
   notFound,
   searchMessage,
   disabled,
}: SingleSearchSelectProps) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field }) => (
            <Popover>
               <PopoverTrigger
                  disabled={disabled}
                  className={cn(disabled ? "opacity-65" : null)}
               >
                  <div
                     role="combobox"
                     className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-min-[100px] flex h-8 justify-between border-black"
                     )}
                  >
                     {field.value ? field.value.label : label}
                     <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </div>
               </PopoverTrigger>
               <PopoverContent className="w-[300px] overflow-hidden p-0">
                  <Command>
                     <CommandInput placeholder={searchMessage} />
                     <CommandEmpty>{notFound}</CommandEmpty>
                     <CommandGroup>
                        {items.map((item) => (
                           <CommandItem
                              value={item.label}
                              key={item.value}
                              onSelect={() => {
                                 setValue(name, item)
                              }}
                              className="flex gap-2 px-0 py-0"
                           >
                              <Checkbox
                                 checked={item.value === field.value?.value}
                                 id={item.value}
                              />
                              <Label
                                 className="w-full py-2"
                                 htmlFor={item.value}
                              >
                                 {item.label}
                              </Label>
                           </CommandItem>
                        ))}
                     </CommandGroup>
                  </Command>
                  <div className="flex">
                     <Button
                        className="w-full rounded-none"
                        variant={"secondary"}
                        onClick={() => {
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
               </PopoverContent>
            </Popover>
         )}
      />
   )
}
export default SingleSearchSelect
