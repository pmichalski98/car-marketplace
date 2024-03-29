import React from "react"
import { CarOffer as CarOfferType, Images } from "@prisma/client"

import CarOffer from "@/app/(routes)/_components/car-offer"

interface CarOffersProps {
   carOffers: (CarOfferType & {
      images: Images[]
   })[]
}
function CarOffers({ carOffers }: CarOffersProps) {
   return (
      <ul className="grid max-w-screen-2xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
         {carOffers.map((carOffer) => {
            return (
               <li key={carOffer.id}>
                  <CarOffer carOffer={carOffer} />
               </li>
            )
         })}
      </ul>
   )
}

export default CarOffers
