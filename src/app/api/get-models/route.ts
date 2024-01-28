import { NextResponse } from "next/server"

import { prisma } from "@/lib/db"

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url)
   const brand = searchParams.get("brand")

   if (!brand) {
      return new NextResponse("Brand is required", { status: 500 })
   }

   try {
      const response = await prisma.make.findFirst({
         where: {
            make: brand,
         },
         include: {
            models: true,
         },
      })

      const newModelItems = response
         ? response.models.map((model) => ({
              label: model.model,
              value: model.model,
           }))
         : []

      return NextResponse.json({ newModelItems })
   } catch (error) {
      console.error(error)
      return new NextResponse("Query is required", { status: 500 })
   }
}
