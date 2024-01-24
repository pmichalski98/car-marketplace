"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { PopoverClose } from "@radix-ui/react-popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "@/components/ui/command"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"

import { Badge } from "./ui/badge"
import { Input } from "./ui/input"

const items = [
   { label: "English", value: "en" },
   { label: "French", value: "fr" },
   { label: "German", value: "de" },
   { label: "Spanish", value: "es" },
   { label: "Portuguese", value: "pt" },
   { label: "Russian", value: "ru" },
   { label: "Japanese", value: "ja" },
   { label: "Korean", value: "ko" },
   { label: "Chinese", value: "zh" },
] as const

const FormSchema = z
   .object({
      brand: z.string().optional(),
      model: z.string().optional(),
      bodyType: z.string().optional(),
      fuelType: z.string().optional(),
      location: z.string().optional(),
      sortingOption: z.string().optional(),
      transmissionType: z.string().optional(),

      minPrice: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),
      maxPrice: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),

      minPower: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),
      maxPower: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),

      minEngineCapacity: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),
      maxEngineCapacity: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),

      minMileage: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),
      maxMileage: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),

      minManufactureYear: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),
      maxManufactureYear: z.coerce
         .number()
         .gte(1, "Musi wynosić 1 lub więcej.")
         .optional(),
   })
   .refine(
      (data) =>
         data.minEngineCapacity &&
         data.maxEngineCapacity &&
         data.minEngineCapacity > data.maxEngineCapacity,
      {
         message:
            "Minimalna pojemność nie może być większa niż maksymalana pojemność",
         path: ["minEngineCapacity"],
      }
   )
   .refine(
      (data) => data.minPower && data.maxPower && data.minPower > data.maxPower,
      {
         message: "Minimalna moc nie może być większa niż maksymalana moc",
         path: ["minPower"],
      }
   )
   .refine(
      (data) => data.minPrice && data.maxPrice && data.minPrice > data.maxPrice,
      {
         message: "Minimalna cena nie może być większa niż maksymalana cena",
         path: ["minPrice"],
      }
   )
   .refine(
      (data) =>
         data.minMileage &&
         data.maxMileage &&
         data.minMileage > data.maxMileage,
      {
         message:
            "Minimalny przebieg nie może być większy niż maksymalny przebieg",
         path: ["minMileage"],
      }
   )
   .refine(
      (data) =>
         data.minManufactureYear &&
         data.maxManufactureYear &&
         data.minManufactureYear > data.maxManufactureYear,
      {
         message:
            "Minimalny rok produkcji nie może być większy niż maksymalny rok produkcji",
         path: ["minManufactureYear"],
      }
   )

export default function ComboboxForm() {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   })

   function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(data)
   }

   const formValues = form.getValues()

   const priceIndicator = () => {
      if (formValues.maxPrice && formValues.minPrice) return 2
      if (formValues.maxPrice || formValues.minPrice) return 1
      return 0
   }

   const powerIndicator = () => {
      if (formValues.maxPower && formValues.minPower) return 2
      if (formValues.maxPower || formValues.minPower) return 1
      return 0
   }
   const engineCapacityIndicator = () => {
      if (formValues.maxEngineCapacity && formValues.minEngineCapacity) return 2
      if (formValues.maxEngineCapacity || formValues.minEngineCapacity) return 1
      return 0
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap gap-3"
         >
            <FormField
               control={form.control}
               name="brand"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant="outline"
                                 role="combobox"
                                 className={cn(
                                    "justify-between",
                                    !field.value && "text-muted-foreground"
                                 )}
                              >
                                 {field.value
                                    ? items.find(
                                         (language) =>
                                            language.value === field.value
                                      )?.label
                                    : "Marka"}
                                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                           <Command>
                              <CommandInput placeholder="Szukaj marki..." />
                              <CommandEmpty>
                                 Nie znaloeziono marki.
                              </CommandEmpty>
                              <CommandGroup>
                                 {items.map((language) => (
                                    <CommandItem
                                       value={language.label}
                                       key={language.value}
                                       onSelect={() => {
                                          form.setValue("brand", language.value)
                                       }}
                                    >
                                       <Check
                                          className={cn(
                                             "mr-2 h-4 w-4",
                                             language.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                       {language.label}
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                              <div className="flex">
                                 <Button
                                    className="w-full rounded-none"
                                    variant={"secondary"}
                                    onClick={() => {
                                       form.setValue("brand", undefined)
                                    }}
                                 >
                                    Wyczyść
                                 </Button>
                                 <PopoverClose asChild>
                                    <Button className="w-full rounded-none">
                                       Zapisz
                                    </Button>
                                 </PopoverClose>
                              </div>
                           </Command>
                        </PopoverContent>
                     </Popover>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="model"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant="outline"
                                 role="combobox"
                                 className={cn(
                                    "justify-between",
                                    !field.value && "text-muted-foreground"
                                 )}
                              >
                                 {field.value
                                    ? items.find(
                                         (language) =>
                                            language.value === field.value
                                      )?.label
                                    : "Model"}
                                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                           <Command>
                              <CommandInput placeholder="Szukaj modelu..." />
                              <CommandEmpty>
                                 Nie znaloeziono modelu.
                              </CommandEmpty>
                              <CommandGroup>
                                 {items.map((language) => (
                                    <CommandItem
                                       value={language.label}
                                       key={language.value}
                                       onSelect={() => {
                                          form.setValue("model", language.value)
                                       }}
                                    >
                                       <Check
                                          className={cn(
                                             "mr-2 h-4 w-4",
                                             language.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                       {language.label}
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                              <div className="flex">
                                 <Button
                                    className="w-full rounded-none"
                                    variant={"secondary"}
                                    onClick={() => {
                                       form.setValue("model", undefined)
                                    }}
                                 >
                                    Wyczyść
                                 </Button>
                                 <PopoverClose asChild>
                                    <Button className="w-full rounded-none">
                                       Zapisz
                                    </Button>
                                 </PopoverClose>
                              </div>
                           </Command>
                        </PopoverContent>
                     </Popover>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="bodyType"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant="outline"
                                 role="combobox"
                                 className={cn(
                                    "justify-between",
                                    !field.value && "text-muted-foreground"
                                 )}
                              >
                                 {field.value
                                    ? items.find(
                                         (language) =>
                                            language.value === field.value
                                      )?.label
                                    : "Typ nadwozia"}
                                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                           <Command>
                              <CommandInput placeholder="Szukaj typu nadwozia..." />
                              <CommandEmpty>
                                 Nie znaloeziono typu nadwozia.
                              </CommandEmpty>
                              <CommandGroup>
                                 {items.map((language) => (
                                    <CommandItem
                                       value={language.label}
                                       key={language.value}
                                       onSelect={() => {
                                          form.setValue(
                                             "bodyType",
                                             language.value
                                          )
                                       }}
                                    >
                                       <Check
                                          className={cn(
                                             "mr-2 h-4 w-4",
                                             language.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                       {language.label}
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                              <div className="flex">
                                 <Button
                                    className="w-full rounded-none"
                                    variant={"secondary"}
                                    onClick={() => {
                                       form.setValue("bodyType", undefined)
                                    }}
                                 >
                                    Wyczyść
                                 </Button>
                                 <PopoverClose asChild>
                                    <Button className="w-full rounded-none">
                                       Zapisz
                                    </Button>
                                 </PopoverClose>
                              </div>
                           </Command>
                        </PopoverContent>
                     </Popover>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="fuelType"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant="outline"
                                 role="combobox"
                                 className={cn(
                                    "justify-between",
                                    !field.value && "text-muted-foreground"
                                 )}
                              >
                                 {field.value
                                    ? items.find(
                                         (language) =>
                                            language.value === field.value
                                      )?.label
                                    : "Rodzaj paliwa"}
                                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                           <Command>
                              <CommandInput placeholder="Szukaj rodzaju paliwa..." />
                              <CommandEmpty>
                                 Nie znaloeziono rodzaju paliwa.
                              </CommandEmpty>
                              <CommandGroup>
                                 {items.map((language) => (
                                    <CommandItem
                                       value={language.label}
                                       key={language.value}
                                       onSelect={() => {
                                          form.setValue(
                                             "fuelType",
                                             language.value
                                          )
                                       }}
                                    >
                                       <Check
                                          className={cn(
                                             "mr-2 h-4 w-4",
                                             language.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                       {language.label}
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                              <div className="flex">
                                 <Button
                                    className="w-full rounded-none"
                                    variant={"secondary"}
                                    onClick={() => {
                                       form.setValue("fuelType", undefined)
                                    }}
                                 >
                                    Wyczyść
                                 </Button>
                                 <PopoverClose asChild>
                                    <Button className="w-full rounded-none">
                                       Zapisz
                                    </Button>
                                 </PopoverClose>
                              </div>
                           </Command>
                        </PopoverContent>
                     </Popover>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Popover>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     role="combobox"
                     className={"justify-between"}
                  >
                     Moc silnika
                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />{" "}
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[300px] overflow-hidden rounded-md p-0">
                  <div className="flex flex-col gap-2 p-1">
                     <FormField
                        control={form.control}
                        name="minPower"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Minimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="maxPower"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Maksimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <div className="flex">
                     <Button
                        className="w-full rounded-none"
                        variant={"secondary"}
                        onClick={() => {
                           form.setValue("minPower", undefined)
                           form.setValue("maxPower", undefined)
                        }}
                     >
                        Wyczyść
                     </Button>
                     <PopoverClose asChild>
                        <Button className="w-full rounded-none">Zapisz</Button>
                     </PopoverClose>
                  </div>
               </PopoverContent>
            </Popover>

            <Popover>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     role="combobox"
                     className={"justify-between"}
                  >
                     Pojemność silnika
                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[300px] overflow-hidden rounded-md p-0">
                  <div className="flex flex-col gap-2 p-1">
                     <FormField
                        control={form.control}
                        name="minEngineCapacity"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Minimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="maxEngineCapacity"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Maksimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <div className="flex">
                     <Button
                        className="w-full rounded-none"
                        variant={"secondary"}
                        onClick={() => {
                           form.setValue("minPower", undefined)
                           form.setValue("maxPower", undefined)
                        }}
                     >
                        Wyczyść
                     </Button>
                     <PopoverClose asChild>
                        <Button className="w-full rounded-none">Zapisz</Button>
                     </PopoverClose>
                  </div>
               </PopoverContent>
            </Popover>

            <FormField
               control={form.control}
               name="location"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant="outline"
                                 role="combobox"
                                 className={cn(
                                    "justify-between",
                                    !field.value && "text-muted-foreground"
                                 )}
                              >
                                 {field.value
                                    ? items.find(
                                         (language) =>
                                            language.value === field.value
                                      )?.label
                                    : "Lokazlizacja"}
                                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                           <Command>
                              <CommandInput placeholder="Szukaj locationu..." />
                              <CommandEmpty>
                                 Nie znaloeziono locationu.
                              </CommandEmpty>
                              <CommandGroup>
                                 {items.map((language) => (
                                    <CommandItem
                                       value={language.label}
                                       key={language.value}
                                       onSelect={() => {
                                          form.setValue(
                                             "location",
                                             language.value
                                          )
                                       }}
                                    >
                                       <Check
                                          className={cn(
                                             "mr-2 h-4 w-4",
                                             language.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                       {language.label}
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                              <div className="flex">
                                 <Button
                                    className="w-full rounded-none"
                                    variant={"secondary"}
                                    onClick={() => {
                                       form.setValue("location", undefined)
                                    }}
                                 >
                                    Wyczyść
                                 </Button>
                                 <PopoverClose asChild>
                                    <Button className="w-full rounded-none">
                                       Zapisz
                                    </Button>
                                 </PopoverClose>
                              </div>
                           </Command>
                        </PopoverContent>
                     </Popover>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="sortingOption"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant="outline"
                                 role="combobox"
                                 className={cn(
                                    "justify-between",
                                    !field.value && "text-muted-foreground"
                                 )}
                              >
                                 {field.value
                                    ? items.find(
                                         (language) =>
                                            language.value === field.value
                                      )?.label
                                    : "Sortuj"}
                                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                           <Command>
                              <CommandInput placeholder="Szukaj sortingOptionu..." />
                              <CommandEmpty>
                                 Nie znaloeziono sortingOptionu.
                              </CommandEmpty>
                              <CommandGroup>
                                 {items.map((language) => (
                                    <CommandItem
                                       value={language.label}
                                       key={language.value}
                                       onSelect={() => {
                                          form.setValue(
                                             "sortingOption",
                                             language.value
                                          )
                                       }}
                                    >
                                       <Check
                                          className={cn(
                                             "mr-2 h-4 w-4",
                                             language.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                       {language.label}
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                              <div className="flex">
                                 <Button
                                    className="w-full rounded-none"
                                    variant={"secondary"}
                                    onClick={() => {
                                       form.setValue("sortingOption", undefined)
                                    }}
                                 >
                                    Wyczyść
                                 </Button>
                                 <PopoverClose asChild>
                                    <Button className="w-full rounded-none">
                                       Zapisz
                                    </Button>
                                 </PopoverClose>
                              </div>
                           </Command>
                        </PopoverContent>
                     </Popover>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="transmissionType"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant="outline"
                                 role="combobox"
                                 className={cn(
                                    "justify-between",
                                    !field.value && "text-muted-foreground"
                                 )}
                              >
                                 {field.value
                                    ? items.find(
                                         (language) =>
                                            language.value === field.value
                                      )?.label
                                    : "Rodaj skrzyni"}
                                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                           <Command>
                              <CommandInput placeholder="Szukaj transmissionTypeu..." />
                              <CommandEmpty>
                                 Nie znaloeziono transmissionTypeu.
                              </CommandEmpty>
                              <CommandGroup>
                                 {items.map((language) => (
                                    <CommandItem
                                       value={language.label}
                                       key={language.value}
                                       onSelect={() => {
                                          form.setValue(
                                             "transmissionType",
                                             language.value
                                          )
                                       }}
                                    >
                                       <Check
                                          className={cn(
                                             "mr-2 h-4 w-4",
                                             language.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                       {language.label}
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                              <div className="flex">
                                 <Button
                                    className="w-full rounded-none"
                                    variant={"secondary"}
                                    onClick={() => {
                                       form.setValue(
                                          "transmissionType",
                                          undefined
                                       )
                                    }}
                                 >
                                    Wyczyść
                                 </Button>
                                 <PopoverClose asChild>
                                    <Button className="w-full rounded-none">
                                       Zapisz
                                    </Button>
                                 </PopoverClose>
                              </div>
                           </Command>
                        </PopoverContent>
                     </Popover>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Popover>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     role="combobox"
                     className={"justify-between"}
                  >
                     Przebieg
                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[300px] overflow-hidden rounded-md p-0">
                  <div className="flex flex-col gap-2 p-1">
                     <FormField
                        control={form.control}
                        name="minMileage"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Minimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="maxMileage"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Maksimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <div className="flex">
                     <Button
                        className="w-full rounded-none"
                        variant={"secondary"}
                        onClick={() => {
                           form.setValue("minPower", undefined)
                           form.setValue("maxPower", undefined)
                        }}
                     >
                        Wyczyść
                     </Button>
                     <PopoverClose asChild>
                        <Button className="w-full rounded-none">Zapisz</Button>
                     </PopoverClose>
                  </div>
               </PopoverContent>
            </Popover>
            <Popover>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     role="combobox"
                     className={"justify-between"}
                  >
                     Rok produkcji
                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[300px] overflow-hidden rounded-md p-0">
                  <div className="flex flex-col gap-2 p-1">
                     <FormField
                        control={form.control}
                        name="minManufactureYear"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Minimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="maxManufactureYear"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Maksimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <div className="flex">
                     <Button
                        className="w-full rounded-none"
                        variant={"secondary"}
                        onClick={() => {
                           form.setValue("minPower", undefined)
                           form.setValue("maxPower", undefined)
                        }}
                     >
                        Wyczyść
                     </Button>
                     <PopoverClose asChild>
                        <Button className="w-full rounded-none">Zapisz</Button>
                     </PopoverClose>
                  </div>
               </PopoverContent>
            </Popover>
            <Popover>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     role="combobox"
                     className={"flex justify-between gap-5"}
                  >
                     Cena
                     {priceIndicator() === 0 ? (
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                     ) : (
                        <Badge variant={"outline"} className="px-1">
                           {priceIndicator()}
                        </Badge>
                     )}
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[300px] overflow-hidden rounded-md p-0">
                  <div className="flex flex-col gap-2 p-1">
                     <FormField
                        control={form.control}
                        name="minPrice"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Minimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="maxPrice"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormControl>
                                 <Input placeholder="Maksimum" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <div className="flex">
                     <Button
                        className="w-full rounded-none"
                        variant={"secondary"}
                        onClick={() => {
                           form.setValue("minPrice", undefined)
                           form.setValue("maxPrice", undefined)
                        }}
                     >
                        Wyczyść
                     </Button>
                     <PopoverClose asChild>
                        <Button className="w-full rounded-none">Zapisz</Button>
                     </PopoverClose>
                  </div>
               </PopoverContent>
            </Popover>
            <Button type="submit">Szukaj</Button>
         </form>
      </Form>
   )
}
