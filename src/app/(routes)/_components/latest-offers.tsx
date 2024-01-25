import React from "react"

import { Button } from "@/components/ui/button"
import CarOffers from "@/app/(routes)/_components/car-offers"

import { prisma } from "../../../../prisma/db"

async function LatestOffers() {
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
         <div className=" space-y-2 py-10 text-center">
            <h2 className="text-2xl font-medium">Nowości</h2>
            <p>Przeglądaj wszystkie nowości na sprzedaż</p>
         </div>
         <CarOffers carOffers={latestCarOffers} />
         <div className="mt-14 w-full text-center">
            <Button variant="outline" className="border-black">
               Zobacz więcej
            </Button>
         </div>
      </>
   )
}

export default LatestOffers
