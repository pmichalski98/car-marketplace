import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { PrismaClient } from "@prisma/client"

import { formSchema } from "@/app/(routes)/dashboard/offer-create/formSchema"
import { addImagesToS3 } from "@/app/api/addImagesToS3"

export async function POST(req: Request) {
   const { userId } = auth()
   const prisma = new PrismaClient()
   console.log(userId)
   if (!userId) throw new Error("User not signed In")
   try {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) {
         const user = await prisma.user.create({ data: { id: userId } })
      }
   } catch (e) {
      console.error(e)
      throw new Error("Unable to add user to database")
   }

   const data = await req.formData()
   const imageFiles = data.getAll("images")

   data.delete("images")

   const formData = Object.fromEntries(data)
   const parsedData = formSchema.parse(formData)

   let imageIds: `${string}-${string}-${string}-${string}-${string}`[]

   try {
      imageIds = await addImagesToS3(imageFiles as File[])
   } catch (e) {
      throw new Error("Error adding images to S3 Bucket")
   }
   try {
      await prisma.$transaction(async (prisma) => {
         const carOffer = await prisma.carOffer.create({
            data: {
               ...parsedData,
               userId,
            },
         })

         const imageRecords: {
            id: `${string}-${string}-${string}-${string}-${string}`
            carOfferId: string
         }[] = imageIds.map((imageId) => {
            return {
               id: imageId,
               carOfferId: carOffer.id,
            }
         })

         await prisma.images.createMany({
            data: imageRecords,
         })
         if (!carOffer) {
            throw new Error("Error creating CarOffer with images.")
         }
      })
   } catch (e) {
      console.error(e)
      throw new Error("Error creating CarOffer with images")
   }

   return NextResponse.json({ status: 201 })
}
