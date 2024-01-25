"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"

import MinMaxInput from "./ui/min-max-input"
import Multiselect from "./ui/multiselect"

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

const numberSchema = z.coerce.number()
// .refine((value) => !isNaN(parseInt(value)) || value === undefined, {
//    message: "Wartość musi być liczbą",
// })

// const rangeValidator = (min, max) => (data) =>
// (min !== undefined && max !== undefined) || parseInt(min) < parseInt(max)

const formSchema = z.object({
   brand: z.array(
      z.object({
         label: z.string().min(1),
         value: z.string().min(1),
      })
   ),
   model: z.array(
      z.object({
         label: z.string().min(1),
         value: z.string().min(1),
      })
   ),
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

   minPrice: numberSchema.optional(),
   maxPrice: numberSchema.optional(),

   minPower: numberSchema.optional(),
   maxPower: numberSchema.optional(),

   minEngineCapacity: numberSchema.optional(),
   maxEngineCapacity: numberSchema.optional(),

   minMileage: numberSchema.optional(),
   maxMileage: numberSchema.optional(),

   minManufactureYear: numberSchema.optional(),
   maxManufactureYear: numberSchema.optional(),
})
// .refine(
//    (data) => rangeValidator(data.minEngineCapacity, data.maxEngineCapacity),
//    {
//       message:
//          "Minimalna pojemność nie może być większa niż maksymalna pojemność",
//       path: ["minEngineCapacity"],
//    }
// )
// .refine((data) => rangeValidator(data.minPower, data.maxPower), {
//    message: "Minimalna moc nie może być większa niż maksymalana moc",
//    path: ["minPower"],
// })
// .refine((data) => rangeValidator(data.minPrice, data.maxPrice), {
//    message: "Minimalna cena nie może być większa niż maksymalana cena",
//    path: ["minPrice"],
// })
// .refine((data) => rangeValidator(data.minMileage, data.maxMileage), {
//    message:
//       "Minimalny przebieg nie może być większy niż maksymalny przebieg",
//    path: ["minMileage"],
// })
// .refine(
//    (data) =>
//       rangeValidator(data.minManufactureYear, data.maxManufactureYear),
//    {
//       message:
//          "Minimalny rok produkcji nie może być większy niż maksymalny rok produkcji",
//       path: ["minManufactureYear"],
//    }
// )

type FormData = z.infer<typeof formSchema>

export default function OfferFilters() {
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
         brand: [],
         model: [],
         bodyType: [],
         fuelType: [],
         transmissionType: [],
      },
   })

   function onSubmit(formData: FormData) {
      console.log(formData.minEngineCapacity, formData.maxEngineCapacity)
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex flex-wrap gap-3"
         noValidate
      >
         <Multiselect
            items={items}
            control={control}
            name={"brand"}
            label={"Marka"}
            setValue={setValue}
            resetField={resetField}
            notFound="sdd"
            searchMessage="sdf"
         />
         <Multiselect
            items={items}
            control={control}
            name={"model"}
            label={"Model"}
            setValue={setValue}
            resetField={resetField}
            notFound="sdd"
            searchMessage="sdf"
         />
         <Multiselect
            items={items}
            control={control}
            name={"bodyType"}
            label={"Typ nadwozia"}
            setValue={setValue}
            resetField={resetField}
            notFound="sdd"
            searchMessage="sdf"
         />
         <Multiselect
            items={items}
            control={control}
            name={"fuelType"}
            label={"Rodzaj Paliwa"}
            setValue={setValue}
            resetField={resetField}
            notFound="sdd"
            searchMessage="sdf"
         />
         <Multiselect
            items={items}
            control={control}
            name={"transmissionType"}
            label={"Rodzaj skrzyni"}
            setValue={setValue}
            resetField={resetField}
            notFound="sdd"
            searchMessage="sdf"
         />

         <MinMaxInput
            label={"Pojemność silnika"}
            register={register}
            resetField={resetField}
            minError={errors.minEngineCapacity?.message}
            maxError={errors.maxEngineCapacity?.message}
            minName={"minEngineCapacity"}
            maxName={"maxEngineCapacity"}
         />
         <MinMaxInput
            label={"Moc silnika"}
            register={register}
            resetField={resetField}
            minError={errors.minPower?.message}
            maxError={errors.maxPower?.message}
            minName={"minPower"}
            maxName={"maxPower"}
         />
         <MinMaxInput
            label={"Rok produkcji"}
            register={register}
            resetField={resetField}
            minError={errors.minManufactureYear?.message}
            maxError={errors.maxManufactureYear?.message}
            minName={"minManufacutreYear"}
            maxName={"maxManufacutreYear"}
         />
         <MinMaxInput
            label={"Przebieg"}
            register={register}
            resetField={resetField}
            minError={errors.minMileage?.message}
            maxError={errors.maxMileage?.message}
            minName={"minMileage"}
            maxName={"maxMileage"}
         />

         <Button type="submit">Szukaj</Button>
      </form>
   )
}
