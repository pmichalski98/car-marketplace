import React from "react"
import { PrismaClient } from "@prisma/client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CarOffers from "@/app/(routes)/dashboard/_components/car-offers"

async function HottestOffers() {
   const prisma = new PrismaClient()

   const hottestCarOffers = await prisma.carOffer.findMany({
      include: {
         images: true,
      },
      take: 20,
   })

   if (!hottestCarOffers) return <div>No car offers were created yet.</div>
   return (
      <>
         <div className=" space-y-2 py-10 text-center">
            <h2 className="text-2xl font-medium">Wyróżnione oferty</h2>
            <p>Przeglądaj wszystkie nasze wyróżnione oferty samochodów</p>
         </div>
         <div className="flex items-center gap-2 pb-4 ">
            <p className="text-sm">Popularne kategorie:</p>
            <div className="space-x-2">
               <Badge variant="outline">SUV</Badge>
               <Badge variant="outline">Automat</Badge>
               <Badge variant="outline">Diesel</Badge>
            </div>
         </div>
         <CarOffers carOffers={hottestCarOffers} />
         <div className="mt-14 w-full text-center">
            <Button variant="outline" className="border-black">
               Zobacz więcej
            </Button>
         </div>
      </>
   )
}

export default HottestOffers
