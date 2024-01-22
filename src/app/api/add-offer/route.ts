import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { PrismaClient } from "@prisma/client"

import { formSchema } from "@/app/(routes)/dashboard/offer-create/formSchema"
import { addImagesToS3 } from "@/app/api/addImagesToS3"

export async function POST(req: Request) {
   const { userId } = auth()
   const prisma = new PrismaClient()

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

   try {
      const imageIds = await addImagesToS3(imageFiles as File[])
      const carOffer = await prisma.carOffer.create({
         data: {
            userId,
            ...parsedData,
         },
      })
      if (!carOffer) return
      const imagesRes = await Promise.all(
         imageIds.map((imageId) => {
            return prisma.images.create({
               data: { id: imageId, carOfferId: carOffer.id },
            })
         })
      )
      if (!imagesRes) throw new Error("Error adding images to database")
   } catch (e) {
      throw new Error("Error adding images to S3 Bucket")
   }
   return NextResponse.json({ status: 201 })
}
