import React from "react"
import { PrismaClient } from "@prisma/client"

import { Button } from "@/components/ui/button"
import CarOffer from "@/app/(routes)/dashboard/_components/car-offer"

async function HottestOffers() {
   const prisma = new PrismaClient()

   const carOffers = await prisma.carOffer.findMany({
      include: {
         images: true,
      },
      take: 20,
   })

   if (!carOffers) return <div>No car offers were created yet.</div>
   return (
      <>
         <>
            <ul className="grid grid-cols-4 gap-10">
               {carOffers.map((carOffer) => {
                  return (
                     <li key={carOffer.id}>
                        <CarOffer carOffer={carOffer} />
                     </li>
                  )
               })}
            </ul>
         </>
         <div className="mt-14 w-full text-center">
            <Button variant="outline" className="border-black">
               Zobacz więcej
            </Button>
         </div>
      </>
   )
}

export default HottestOffers
