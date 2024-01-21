"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

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

import DropzoneField from "./dropzone-field"

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
   title: z.string().min(1, "Wymagane jest podanie tytułu."),
   description: z.string().min(1, "Wymagane jest podanie opisu."),
   mileage: z.coerce.number().gte(1, "Musi wynosić 1 lub więcej."),
   transmission: z.string(),
   manufacture: z.string().min(1, "Wymagane jest podanie producenta."),
   fuelType: z.string(),
   year: z.coerce.number().gte(1900, "Musi być rokiem 1900 lub późniejszym."), // Rok produkcji
   color: z.string().min(1, "Wymagane jest podanie koloru."),
   price: z.coerce.number().gte(1, "Musi wynosić 1 lub więcej."),
})

function AddOfferForm() {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
   } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit",
   })

   const [filePreviews, setFilePreviews] = useState<string[]>([])

   const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
      console.log(formData)
      // Handle form submission logic here
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         noValidate
         className="flex w-full max-w-xl flex-col gap-5 pt-6"
      >
         <DropzoneField filePreviews={filePreviews} setFilePreviews={setFilePreviews} />

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
               {...register("manufacture")}
            />
            {errors.manufacture && (
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger className="absolute bottom-2 right-3 text-red-500">
                        <AlertCircle />
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{errors.manufacture.message}</p>
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
                           <SelectItem value="electric">Elektryczny</SelectItem>
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
               {...register("year")}
            />
            {errors.year && (
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger className="absolute bottom-2 right-3 text-red-500">
                        <AlertCircle />
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{errors.year.message}</p>
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

         <Button>Powtierdź</Button>
      </form>
   )
}

export default AddOfferForm
