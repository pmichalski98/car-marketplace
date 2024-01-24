import React from "react"
import { PrismaClient } from "@prisma/client"

import { Button } from "@/components/ui/button"
import CarOffer from "@/app/(routes)/dashboard/_components/car-offer"

async function LatestOffers() {
   const prisma = new PrismaClient()

   const latestCarOffers = await prisma.carOffer.findMany({
      include: {
         images: true,
      },
      orderBy: {
         createdAt: "desc",
      },
      take: 20,
   })

   if (!latestCarOffers) return <div>No car offers created yet.</div>
   return (
      <>
         <ul className="grid grid-cols-4 gap-10">
            {latestCarOffers.map((carOffer) => {
               return (
                  <li key={carOffer.id}>
                     <CarOffer carOffer={carOffer} />
                  </li>
               )
            })}
         </ul>
         <div className="mt-14 w-full text-center">
            <Button variant="outline" className="border-black">
               Zobacz więcej
            </Button>
         </div>
      </>
   )
}

export default LatestOffers
