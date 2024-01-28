"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PopoverClose } from "@radix-ui/react-popover"
import axios from "axios"
import { ChevronDown } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

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

import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import MinMaxInput from "./ui/min-max-input"
import Multiselect from "./ui/multiselect"
import SingleSearchSelect from "./ui/single-search-select"

const items = [
   { label: "English", value: "en" },
   { label: "French", value: "fr" },
   { label: "German", value: "de" },
   { label: "Portuguese", value: "pt" },
   { label: "Russian", value: "ru" },
   { label: "Japanese", value: "ja" },
   { label: "Korean", value: "ko" },
   { label: "Chinese", value: "zh" },
]

const rangeValidator = (min: number | undefined, max: number | undefined) => {
   if (min === undefined || max === undefined) {
      return true
   } else if (min > max) {
      return false
   }
   return true
}

const formSchema = z
   .object({
      sort: z
         .object({
            label: z.string(),
            value: z.string(),
         })
         .optional(),
      brand: z
         .object({
            label: z.string(),
            value: z.string(),
         })
         .optional(),
      model: z
         .object({
            label: z.string().min(1),
            value: z.string().min(1),
         })
         .optional(),
      bodyType: z.array(
         z.object({
            label: z.string().min(1),
            value: z.string().min(1),
         })
      ),
      fuelType: z.array(
         z.object({
            label: z.string().min(1),
            value: z.string().min(1),
         })
      ),
      transmissionType: z.array(
         z.object({
            label: z.string().min(1),
            value: z.string().min(1),
         })
      ),

      minPrice: z.coerce.number().optional(),
      maxPrice: z.coerce.number().optional(),

      minPower: z.coerce.number().optional(),
      maxPower: z.coerce.number().optional(),

      minEngineCapacity: z.coerce.number().optional(),
      maxEngineCapacity: z.coerce.number().optional(),

      minMileage: z.coerce.number().optional(),
      maxMileage: z.coerce.number().optional(),

      minManufactureYear: z.coerce.number().optional(),
      maxManufactureYear: z.coerce.number().optional(),
   })
   .refine(
      (data) => rangeValidator(data.minEngineCapacity, data.maxEngineCapacity),
      {
         message:
            "Minimalna pojemność nie może być większa niż maksymalna pojemność",
         path: ["minEngineCapacity"],
      }
   )
   .refine((data) => rangeValidator(data.minPower, data.maxPower), {
      message: "Minimalna moc nie może być większa niż maksymalana moc",
      path: ["minPower"],
   })
   .refine((data) => rangeValidator(data.minPrice, data.maxPrice), {
      message: "Minimalna cena nie może być większa niż maksymalana cena",
      path: ["minPrice"],
   })
   .refine((data) => rangeValidator(data.minMileage, data.maxMileage), {
      message:
         "Minimalny przebieg nie może być większy niż maksymalny przebieg",
      path: ["minMileage"],
   })
   .refine(
      (data) =>
         rangeValidator(data.minManufactureYear, data.maxManufactureYear),
      {
         message:
            "Minimalny rok produkcji nie może być większy niż maksymalny rok produkcji",
         path: ["minManufactureYear"],
      }
   )

type FormData = z.infer<typeof formSchema>

interface OfferFiltersProps {
   brandItems: { label: string; value: string }[]
}

export default function OfferFilters({ brandItems }: OfferFiltersProps) {
   const [brand, setBrand] = useState<undefined | string>()
   const [modelItems, setModelItems] = useState<
      { label: string; value: string }[]
   >([])
   const {
      register,
      handleSubmit,
      resetField,
      control,
      setValue,
      formState: { errors },
   } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      defaultValues: {
         bodyType: [],
         fuelType: [],
         transmissionType: [],
      },
   })

   function onSubmit(formData: FormData) {
      console.log(formData)
   }

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get("/api/get-models", {
               params: { brand: brand },
            })

            console.log(response)

            setModelItems(
               response.data.newModelItems ? response.data.newModelItems : []
            )
         } catch (error) {
            console.error("Error fetching data:", error)
         }
      }
      if (brand !== undefined) {
         fetchData()
      }
   }, [brand])

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex flex-wrap gap-3"
         noValidate
      >
         <Controller
            control={control}
            name={"brand"}
            render={({ field }) => (
               <Popover>
                  <PopoverTrigger>
                     <div
                        role="combobox"
                        className={cn(
                           buttonVariants({ variant: "outline" }),
                           "w-min-[100px] flex h-8 justify-between border-black"
                        )}
                     >
                        {field.value ? field.value.label : "Marka"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                     </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] overflow-hidden p-0">
                     <Command>
                        <CommandInput placeholder={"Wyszukaj markę."} />
                        <CommandEmpty>{"Nie znaleziono marki."}</CommandEmpty>
                        <CommandGroup>
                           {brandItems.map((item) => (
                              <CommandItem
                                 value={item.label}
                                 key={item.value}
                                 onSelect={() => {
                                    setValue("brand", item)
                                    setBrand(item.value)
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
                              setBrand(undefined)
                              resetField("brand")
                              resetField("model")
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

         <SingleSearchSelect
            items={modelItems}
            control={control}
            name={"model"}
            label={"Model"}
            setValue={setValue}
            resetField={resetField}
            notFound="Nie znaleziono modelu."
            searchMessage="Wyszkuaj nazwę modelu."
            disabled={!brand}
         />
         <Multiselect
            items={items}
            control={control}
            name={"bodyType"}
            label={"Typ nadwozia"}
            setValue={setValue}
            resetField={resetField}
            notFound="Nie znaleziono typu nadwozia."
            searchMessage="Wyszukaj nadwozie."
         />
         <Multiselect
            items={items}
            control={control}
            name={"fuelType"}
            label={"Rodzaj Paliwa"}
            setValue={setValue}
            resetField={resetField}
            notFound="Nie znaleziono rodzaju paliwa."
            searchMessage="Wyszkuaj rodzaj paliwa."
         />
         <Multiselect
            items={items}
            control={control}
            name={"transmissionType"}
            label={"Rodzaj skrzyni"}
            setValue={setValue}
            resetField={resetField}
            notFound="Nie znaleziono skrzyni biegów."
            searchMessage="Wyszukaj skrzynię biegów."
         />

         <MinMaxInput
            setValue={setValue}
            label={"Pojemność silnika"}
            register={register}
            resetField={resetField}
            minError={errors.minEngineCapacity?.message}
            maxError={errors.maxEngineCapacity?.message}
            minName={"minEngineCapacity"}
            maxName={"maxEngineCapacity"}
         />
         <MinMaxInput
            setValue={setValue}
            label={"Moc silnika"}
            register={register}
            resetField={resetField}
            minError={errors.minPower?.message}
            maxError={errors.maxPower?.message}
            minName={"minPower"}
            maxName={"maxPower"}
         />
         <MinMaxInput
            setValue={setValue}
            label={"Rok produkcji"}
            register={register}
            resetField={resetField}
            minError={errors.minManufactureYear?.message}
            maxError={errors.maxManufactureYear?.message}
            minName={"minManufacutreYear"}
            maxName={"maxManufacutreYear"}
         />
         <MinMaxInput
            setValue={setValue}
            label={"Przebieg"}
            register={register}
            resetField={resetField}
            minError={errors.minMileage?.message}
            maxError={errors.maxMileage?.message}
            minName={"minMileage"}
            maxName={"maxMileage"}
         />
         <MinMaxInput
            setValue={setValue}
            label={"Cena"}
            register={register}
            resetField={resetField}
            minError={errors.minPrice?.message}
            maxError={errors.maxPrice?.message}
            minName={"minPrice"}
            maxName={"maxPrice"}
         />
         <SingleSearchSelect
            items={items}
            control={control}
            name={"sort"}
            setValue={setValue}
            resetField={resetField}
            label={"Sortuj"}
            notFound={"Nie znaloeziono."}
            searchMessage={""}
         />

         <Button type="submit">Szukaj</Button>
      </form>
   )
}
