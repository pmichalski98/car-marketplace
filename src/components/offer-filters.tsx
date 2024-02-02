"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Make, Model } from "@prisma/client"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDown } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

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

import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import MinMaxInput from "./ui/min-max-input"
import Multiselect from "./ui/multiselect"

const items = ["enf", "sdff", "sdfsd"]

const sortItems = [
   { label: "Rosnąco", value: "asc" },
   { label: "Malejąco", value: "desc" },
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
      brand: z.string().optional(),
      model: z.string().optional(),
      bodyType: z.array(z.string()),
      fuelType: z.array(z.string()),
      transmissionType: z.array(z.string()),

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
   brandsData: {
      models: Model[]
      make: string
   }[]
}

export default function OfferFilters({ brandsData }: OfferFiltersProps) {
   const [brand, setBrand] = useState<undefined | string>()
   const [modelItems, setModelItems] = useState<undefined | string[]>([])

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

   const router = useRouter()

   function onSubmit(formData: FormData) {
      console.log(formData)
   }
   const brandItems = useMemo(() => {
      return brandsData.map((brandValue) => brandValue.make)
   }, [brandsData])

   useEffect(() => {
      const selectedBrand = brandsData.filter((brandValue) =>
         brandValue.make === brand ? brandValue.models : null
      )

      const newModelItems =
         selectedBrand.length > 0
            ? selectedBrand[0].models.map((modelValue) => modelValue.model)
            : []

      setModelItems(newModelItems)
   }, [brand])

   useEffect(() => {
      const url = new URL(window.location.href)

      const newMinPrice = parseInt(url.searchParams.get("minPrice") || "")
      const newMaxPrice = parseInt(url.searchParams.get("maxPrice") || "")
      const newMinPower = parseInt(url.searchParams.get("minPower") || "")
      const newMaxPower = parseInt(url.searchParams.get("maxPower") || "")
      const newMinEngineCapacity = parseInt(
         url.searchParams.get("minEngineCapacity") || ""
      )
      const newMaxEngineCapacity = parseInt(
         url.searchParams.get("maxEngineCapacity") || ""
      )
      const newMinMileage = parseInt(url.searchParams.get("minMileage") || "")
      const newMaxMileage = parseInt(url.searchParams.get("maxMileage") || "")
      const newMinManufactureYear = parseInt(
         url.searchParams.get("minManufactureYear") || ""
      )
      const newMaxManufactureYear = parseInt(
         url.searchParams.get("maxManufactureYear") || ""
      )
      const newModel = url.searchParams.get("model")
      const newBodyType = url.searchParams.get("bodyType")
      const newFuelType = url.searchParams.get("fuelType")
      const newTransmissionType = url.searchParams.get("transmissionType")
      const newSort = url.searchParams.get("sort")
      const newBrand = url.searchParams.get("brand")

      newMinPrice !== null && !isNaN(newMinPrice)
         ? setValue("minPrice", newMinPrice)
         : null

      newMaxPrice !== null && !isNaN(newMaxPrice)
         ? setValue("maxPrice", newMaxPrice)
         : null

      newMinPower !== null && !isNaN(newMinPower)
         ? setValue("minPower", newMinPower)
         : null

      newMaxPower !== null && !isNaN(newMaxPower)
         ? setValue("maxPower", newMaxPower)
         : null

      newMinEngineCapacity !== null && !isNaN(newMinEngineCapacity)
         ? setValue("minEngineCapacity", newMinEngineCapacity)
         : null

      newMaxEngineCapacity !== null && !isNaN(newMaxEngineCapacity)
         ? setValue("maxEngineCapacity", newMaxEngineCapacity)
         : null

      newMinMileage !== null && !isNaN(newMinMileage)
         ? setValue("minMileage", newMinMileage)
         : null

      newMaxMileage !== null && !isNaN(newMaxMileage)
         ? setValue("maxMileage", newMaxMileage)
         : null

      newMinManufactureYear !== null && !isNaN(newMinManufactureYear)
         ? setValue("minManufactureYear", newMinManufactureYear)
         : null

      newMaxManufactureYear !== null && !isNaN(newMaxManufactureYear)
         ? setValue("maxManufactureYear", newMaxManufactureYear)
         : null

      if (newBrand != null) {
         setValue("brand", newBrand)
         setBrand(newBrand)
      }

      newModel != null ? setValue("model", newModel) : null

      newBodyType != null ? setValue("bodyType", newBodyType.split(",")) : null

      newFuelType != null ? setValue("fuelType", newFuelType.split(",")) : null

      newTransmissionType != null
         ? setValue("transmissionType", newTransmissionType.split(","))
         : null

      newSort != null
         ? setValue(
              "sort",
              sortItems.filter((sortItem) =>
                 sortItem.value === newSort ? sortItem : null
              )[0]
           )
         : null
   }, [])

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
               <Popover modal={true}>
                  <PopoverTrigger>
                     <div
                        role="combobox"
                        className={cn(
                           buttonVariants({ variant: "outline" }),
                           "flex h-8 w-[160px] justify-between border-black"
                        )}
                     >
                        <p>{field.value ? field.value : "Marka"}</p>
                        <ChevronDown className=" relative right-0 h-4 w-4 shrink-0 opacity-50" />
                     </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] overflow-hidden p-0">
                     <Command>
                        <CommandInput placeholder={"Wyszukaj markę"} />
                        <CommandEmpty>{"Nie znaleziono marki"}</CommandEmpty>

                        <CommandGroup className="max-h-52 overflow-y-auto">
                           {brandItems.map((item) => (
                              <CommandItem
                                 value={item}
                                 key={item}
                                 onSelect={() => {
                                    router.push(
                                       setUrlParam("brand", item).toString()
                                    )
                                    setValue("brand", item)
                                    resetField("model")
                                    setBrand(item)
                                 }}
                                 className="flex gap-2 px-0 py-0"
                              >
                                 <Checkbox
                                    checked={item === field.value}
                                    id={item}
                                 />
                                 <Label className="w-full py-2" htmlFor={item}>
                                    {item}
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
                              const newUrl = setUrlParam("brand", undefined)

                              newUrl.searchParams.delete("model")

                              router.push(newUrl.toString())

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

         <Controller
            control={control}
            name={"model"}
            render={({ field }) => (
               <Popover modal={true}>
                  <PopoverTrigger
                     disabled={!brand || !modelItems}
                     className={cn(!brand || !modelItems ? "opacity-65" : null)}
                  >
                     <div
                        role="combobox"
                        className={cn(
                           buttonVariants({ variant: "outline" }),
                           "flex h-8 w-[160px] justify-between border-black"
                        )}
                     >
                        <p>{field.value ? field.value : "Model"}</p>
                        <ChevronDown className=" relative right-0 h-4 w-4 shrink-0 opacity-50" />
                     </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] overflow-hidden p-0">
                     <Command>
                        <CommandInput placeholder={"Wyszkuaj nazwę modelu"} />
                        <CommandEmpty>{"Nie znaleziono modelu"}</CommandEmpty>
                        <CommandGroup className="max-h-52 overflow-y-auto">
                           {modelItems?.map((item) => (
                              <CommandItem
                                 value={item}
                                 key={item}
                                 onSelect={() => {
                                    router.push(
                                       setUrlParam("model", item).toString()
                                    )
                                    setValue("model", item)
                                 }}
                                 className="flex gap-2 px-0 py-0"
                              >
                                 <Checkbox
                                    checked={item === field.value}
                                    id={item}
                                 />
                                 <Label className="w-full py-2" htmlFor={item}>
                                    {item}
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
                              router.push(
                                 setUrlParam("model", undefined).toString()
                              )
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
         <Multiselect
            items={items}
            control={control}
            name={"bodyType"}
            label={"Typ nadwozia"}
            setValue={setValue}
            resetField={resetField}
            notFound="Nie znaleziono typu nadwozia"
            searchMessage="Wyszukaj nadwozie"
         />
         <Multiselect
            items={items}
            control={control}
            name={"fuelType"}
            label={"Rodzaj Paliwa"}
            setValue={setValue}
            resetField={resetField}
            notFound="Nie znaleziono rodzaju paliwa"
            searchMessage="Wyszkuaj rodzaj paliwa"
         />
         <Multiselect
            items={items}
            control={control}
            name={"transmissionType"}
            label={"Rodzaj skrzyni"}
            setValue={setValue}
            resetField={resetField}
            notFound="Nie znaleziono skrzyni biegów"
            searchMessage="Wyszukaj skrzynię biegów"
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
         {/* <SingleSearchSelect
            items={items}
            control={control}
            name={"sort"}
            setValue={setValue}
            resetField={resetField}
            label={"Sortuj"}
            notFound={"Nie znaloeziono"}
            searchMessage={""}
         /> */}
         <Controller
            control={control}
            name={"sort"}
            render={({ field }) => (
               <Popover modal={true}>
                  <PopoverTrigger>
                     <div
                        role="combobox"
                        className={cn(
                           buttonVariants({ variant: "outline" }),
                           "flex h-8 w-[160px] justify-between border-black"
                        )}
                     >
                        <p>{field.value ? field.value?.label : "Sortuj"}</p>
                        <ChevronDown className=" relative right-0 h-4 w-4 shrink-0 opacity-50" />
                     </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] overflow-hidden p-0">
                     <Command>
                        <CommandInput placeholder={"Wyszkuaj nazwę sortu"} />
                        <CommandEmpty>{"Nie znaleziono sortu"}</CommandEmpty>
                        <CommandGroup className="max-h-52 overflow-y-auto">
                           {sortItems?.map((item) => (
                              <CommandItem
                                 value={item.value}
                                 key={item.value}
                                 onSelect={() => {
                                    setValue("sort", item)
                                    router.push(
                                       setUrlParam(
                                          "sort",
                                          item.value
                                       ).toString()
                                    )
                                 }}
                                 className="flex gap-2 px-0 py-0"
                              >
                                 <Checkbox
                                    checked={item.label === field.value?.label}
                                    id={item.label}
                                 />
                                 <Label
                                    className="w-full py-2"
                                    htmlFor={item.label}
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
                              resetField("sort")
                              router.push(
                                 setUrlParam("sort", undefined).toString()
                              )
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

         <Button type="submit">Szukaj</Button>
      </form>
   )
}
