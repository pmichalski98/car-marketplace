"use client"

import React, { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { urlToFile, zipCodeRefactor } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ErrorTooltip from "@/components/ui/error-tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import AddOfferFormItem from "@/app/(routes)/dashboard/offer-create/_components/AddOfferFormItem"
import {
   FormSchema,
   formSchema,
} from "@/app/(routes)/dashboard/offer-create/formSchema"

import DropzoneField from "./dropzone-field"

export default function AddOfferForm() {
   const {
      register,
      handleSubmit,
      control,
      reset,
      watch,
      setValue,
      getValues,
      formState: { errors, isSubmitting },
   } = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit",
   })

   const handleResizeHeight = (event: ChangeEvent<HTMLTextAreaElement>) => {
      event.target.style.height = "inherit"
      event.target.style.height = `${event.target.scrollHeight}px`
   }

   const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue("description", event.target.value)
      handleResizeHeight(event) // Ensure textarea resizes
   }

   const [imagePreviews, setImagePreviews] = useState<string[]>([])
   const router = useRouter()

   const onSubmit: SubmitHandler<FormSchema> = async (formData: FormSchema) => {
      const data = new FormData()

      await Promise.all(
         imagePreviews.map(async (url) => {
            const file = await urlToFile(url)

            if (file) {
               data.append("images", file)
            }
         })
      )

      Object.entries(formData).forEach(([key, value]) => {
         data.append(key, String(value))
      })

      const res = await fetch("/api/add-offer", {
         method: "POST",
         body: data,
      })
      if (res.ok) {
         reset()
         router.push("/dashboard")
         setImagePreviews([])
      }
   }

   return (
      <div className="bg-secondary/60 p-4 lg:p-10">
         <DropzoneField
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
         />
         <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex w-full flex-col gap-5 pt-6"
         >
            <div className=" flex space-x-12">
               <div className={"relative basis-2/3"}>
                  <AddOfferFormItem
                     register={register}
                     name="title"
                     type="text"
                     title="Tytuł"
                     isSubmitting={isSubmitting}
                     error={errors.title}
                     placeholder="Nissan Skyline Turbo 300km JDM..."
                  />
               </div>
               <div className={"relative"}>
                  <AddOfferFormItem
                     register={register}
                     name="sellersCity"
                     type="text"
                     title="Lokalizacja"
                     isSubmitting={isSubmitting}
                     error={errors.sellersCity}
                     placeholder="Warszawa..."
                  />
               </div>
               <div className={"relative"}>
                  <Label htmlFor="sellersZip">Kod pocztowy</Label>
                  <Input
                     id="sellersZip"
                     placeholder="05-120"
                     type="number"
                     autoCapitalize="none"
                     autoCorrect="off"
                     disabled={isSubmitting}
                     {...register("sellersZip", {
                        onBlur: (e) => {
                           zipCodeRefactor(e, setValue)
                        },
                     })}
                  />
                  {errors.sellersZip && (
                     <ErrorTooltip errorMsg={errors.sellersZip.message} />
                  )}
               </div>
            </div>
            <div className={"relative flex gap-10 "}>
               <div className="w-full">
                  <Label htmlFor="description">Opis</Label>
                  <Textarea
                     className="basis-2/3 resize-none overflow-y-hidden"
                     id="description"
                     placeholder="Lorem ipsum lorem ipsum"
                     autoCapitalize="none"
                     autoCorrect="off"
                     disabled={isSubmitting}
                     {...register("description")}
                     onChange={(e) => handleChange(e)}
                  />
                  {errors.description && (
                     <ErrorTooltip
                        classNames="top-0"
                        errorMsg={errors.description.message}
                     />
                  )}
               </div>
            </div>
            <div className={"relative w-fit"}>
               <AddOfferFormItem
                  title="Przebieg (km)"
                  isSubmitting={isSubmitting}
                  type="number"
                  register={register}
                  name="mileage"
                  error={errors.mileage}
                  placeholder="180000..."
               />
            </div>
            <div className="items-center space-y-4 md:flex md:space-x-10  md:space-y-0 ">
               <div className={"relative"}>
                  <AddOfferFormItem
                     title="Marka"
                     isSubmitting={isSubmitting}
                     register={register}
                     name="manufacturer"
                     type="text"
                     error={errors.manufacturer}
                     placeholder="Nissan"
                  />
               </div>
               <div className={"relative"}>
                  <AddOfferFormItem
                     title="Model"
                     isSubmitting={isSubmitting}
                     register={register}
                     name="model"
                     error={errors.model}
                     placeholder="Skyline"
                  />
               </div>
            </div>
            <div className={"relative flex gap-2"}>
               <div>
                  <Label>Typ paliwa</Label>
                  <Controller
                     name="fuelType"
                     control={control}
                     render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                           <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Inny" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="gas">Benzyna</SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="hydrogen">Wodór</SelectItem>
                              <SelectItem value="electric">
                                 Elektryczny
                              </SelectItem>
                              <SelectItem value="other">Inny</SelectItem>
                           </SelectContent>
                        </Select>
                     )}
                  />
               </div>
               {errors.fuelType && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger className="mt-6 text-red-500">
                           <AlertCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{errors.fuelType.message}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>
            <div className={"relative flex gap-2"}>
               <div>
                  <Label>Skrzynia biegów</Label>
                  <Controller
                     name="transmission"
                     control={control}
                     render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                           <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Inny" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="manual">Manualna</SelectItem>
                              <SelectItem value="automatic">
                                 Automatyczna
                              </SelectItem>
                              <SelectItem value="other">Inna</SelectItem>
                           </SelectContent>
                        </Select>
                     )}
                  />
               </div>
               {errors.transmission && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger className="mt-6 text-red-500">
                           <AlertCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{errors.transmission.message}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>
            <div className={"relative w-fit"}>
               <AddOfferFormItem
                  title="Rok produkcji"
                  isSubmitting={isSubmitting}
                  register={register}
                  name="prodYear"
                  type="number"
                  error={errors.prodYear}
                  placeholder="1996"
               />
            </div>
            <div className={"relative w-fit"}>
               <AddOfferFormItem
                  title="Kolor"
                  type="text"
                  isSubmitting={isSubmitting}
                  register={register}
                  name="color"
                  error={errors.color}
                  placeholder="Biały..."
               />
            </div>
            <div className={"relative w-fit"}>
               <AddOfferFormItem
                  title="Cena"
                  type="number"
                  isSubmitting={isSubmitting}
                  register={register}
                  name="price"
                  error={errors.price}
                  placeholder="36000"
               />
            </div>
            {/* Add more fields as needed */}
            <Button>Potwierdź</Button>
         </form>
      </div>
   )
}
