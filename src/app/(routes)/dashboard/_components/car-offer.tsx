import React from "react"
import Image from "next/image"
import Link from "next/link"
import { CarOffer as CarOfferType, Images, Prisma } from "@prisma/client"
import { MapPin } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CarOfferProps = {
   carOffer: CarOfferType & {
      images: Images[]
   }
}
function CarOffer({ carOffer }: CarOfferProps) {
   return (
      <Link href={`/dashboard/${carOffer.id}`}>
         <Card>
            <CardHeader className="max-h-[220px]">
               <Image
                  className="rounded-lg"
                  width={300}
                  height={400}
                  src={`https://cool-car-marketplace.s3.eu-north-1.amazonaws.com/${carOffer.images[0].id}`}
                  alt={"Main car offer image"}
               />
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <CardTitle>
                     {carOffer.prodYear} {carOffer.title}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                     <MapPin size={20} />
                     <p>Warszawa, 11-356</p>
                  </div>
                  <p>
                     {carOffer.price.toLocaleString("pl-PL", {
                        currency: "PLN",
                        style: "currency",
                     })}
                  </p>
               </div>
            </CardContent>
         </Card>
      </Link>
   )
}

export default CarOffer
