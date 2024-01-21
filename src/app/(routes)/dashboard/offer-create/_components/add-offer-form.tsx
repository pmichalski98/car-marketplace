"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import { FileWithPath, useDropzone } from "react-dropzone"
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
import { formSchema } from "@/app/(routes)/dashboard/offer-create/formSchema"
<<<<<<< HEAD
=======

import DropzoneField from "./dropzone-field"
>>>>>>> parent of 76272b2 (Revert "fix: git conflicts")

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

   const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
      useDropzone({
         maxFiles: 8,
      })

   const [filePreviews, setFilePreviews] = useState<FileWithPath[]>([])

   useEffect(() => {
      // Update file previews when acceptedFiles change
      setFilePreviews((prev) => [...prev, ...acceptedFiles])
   }, [acceptedFiles])

   const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
      const data = new FormData()

      filePreviews.forEach((file) => {
         data.append("images", file)
      })

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
         // redirect probably
      }
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         noValidate
         className="flex w-full max-w-xl flex-col gap-5 pt-6"
      >
<<<<<<< HEAD
         <div
            {...getRootProps()}
            className={`flex h-28 items-center justify-center rounded-md border-2 border-dashed p-4 ${
               isDragActive ? "bg-gray-100" : ""
            }`}
         >
            <input {...getInputProps({ multiple: true, required: true })} />
            <p>
               Przeciągnij i upuść niektóre pliki tutaj lub kliknij, aby wybrać
               pliki
            </p>
         </div>
         {filePreviews.length > 0 && (
            <div>
               <p>Przegląd plików:</p>
               <ul>
                  {filePreviews.map((file: FileWithPath) => (
                     <li key={file.path}>
                        {file.path} - {file.size} bytes
                     </li>
                  ))}
               </ul>
            </div>
         )}
=======
         <DropzoneField
            filePreviews={filePreviews}
            setFilePreviews={setFilePreviews}
         />

>>>>>>> parent of 76272b2 (Revert "fix: git conflicts")
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
   )
}

export default AddOfferForm
