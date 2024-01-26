"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

import MinMaxInput from "./ui/min-max-input"
import Multiselect from "./ui/multiselect"
import SingleSearchSelect from "./ui/single-search-select"

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

export default function OfferFilters() {
   const {
      register,
      handleSubmit,
      resetField,
      control,
      getValues,
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
   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex flex-wrap gap-3"
         noValidate
      >
         {/* {errors.brand ? errors.brand.message : null} */}
         {errors.model ? errors.model.message : null}
         <SingleSearchSelect
            items={items}
            control={control}
            name={"brand"}
            label={"Marka"}
            setValue={setValue}
            resetField={resetField}
            notFound="Nie znaleziono marki."
            searchMessage="Wpisz nazwę marki."
         />
         <SingleSearchSelect
            items={items}
            control={control}
            name={"model"}
            label={"Model"}
            setValue={setValue}
            resetField={resetField}
            notFound="Nie znaleziono modelu."
            searchMessage="Wyszkuaj nazwę modelu."
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
