"use client"

import { useState } from "react"
import { router } from "next/client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { urlToFile } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { formSchema } from "@/app/(routes)/dashboard/offer-create/formSchema"

import DropzoneField from "./dropzone-field"

type FormData = z.infer<typeof formSchema>

function AddOfferForm() {
   const {
      register,
      handleSubmit,
      control,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit",
   })

   const [imagePreviews, setImagePreviews] = useState<string[]>([])
   const router = useRouter()

   const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
      const data = new FormData()

      await Promise.all(
         imagePreviews.map(async (url) => {
            const file = await urlToFile(url)

            if (file) {
               // Append the file to the FormData outside of the async block
               data.append("images", file)
            }
         })
      )

      Object.entries(formData).forEach(([key, value]) => {
         console.log(key, value)
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
      <>
         <DropzoneField
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
         />
         <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex w-full max-w-xl flex-col gap-5 pt-6"
         >
            <div className={"relative"}>
               <Label htmlFor="title">Tytuł</Label>
               <Input
                  id="title"
                  placeholder="Nissan Patrol.."
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("title")}
               />
               {errors.title && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger className="absolute bottom-2 right-3 text-red-500">
                           <AlertCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{errors.title.message}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>
            <div className={"relative"}>
               <Label htmlFor="description">Opis</Label>
               <Textarea
                  id="description"
                  placeholder="Lorem ipsum lorem ipsum"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("description")}
               />
               {errors.description && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger className="absolute bottom-2 right-3 text-red-500">
                           <AlertCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{errors.description.message}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>
            <div className={"relative"}>
               <Label htmlFor="mileage">Przebieg (km)</Label>
               <Input
                  id="mileage"
                  placeholder="120000"
                  type="number"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("mileage")}
               />
               {errors.mileage && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger className="absolute bottom-2 right-3 text-red-500">
                           <AlertCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{errors.mileage.message}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>
            <div className={"relative"}>
               <Label htmlFor="manufacture">Producent</Label>
               <Input
                  id="manufacture"
                  placeholder="Nissan"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("manufacturer")}
               />
               {errors.manufacturer && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger className="absolute bottom-2 right-3 text-red-500">
                           <AlertCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{errors.manufacturer.message}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
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
            <div className={"relative"}>
               <Label htmlFor="year">Rok produkcji</Label>
               <Input
                  id="year"
                  placeholder="2022"
                  type="number"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("prodYear")}
               />
               {errors.prodYear && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger className="absolute bottom-2 right-3 text-red-500">
                           <AlertCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{errors.prodYear.message}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>
            <div className={"relative"}>
               <Label htmlFor="color">Kolor</Label>
               <Input
                  id="color"
                  placeholder="Biały, zielony, żółty..."
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("color")}
               />
               {errors.color && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger className="absolute bottom-2 right-3 text-red-500">
                           <AlertCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{errors.color.message}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>
            <div className={"relative"}>
               <Label htmlFor="price">Cena</Label>
               <Input
                  id="price"
                  placeholder="Podaj cenę (zł)"
                  type="number"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("price")}
               />
               {errors.price && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger className="absolute bottom-2 right-3 text-red-500">
                           <AlertCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{errors.price.message}</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>
            {/* Add more fields as needed */}

            <Button>Potwierdź</Button>
         </form>
      </>
   )
}

export default AddOfferForm
