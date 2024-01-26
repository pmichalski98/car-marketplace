import React from "react"
import Image from "next/image"
import Link from "next/link"
import { CarOffer as CarOfferType, Images } from "@prisma/client"
import { CircleDollarSign, MapPin, Star } from "lucide-react"

import { getFormattedCurrency, getImageUrl } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"

interface CarOfferProps {
   carOffer: CarOfferType & {
      images: Images[]
   }
}
function CarOffer({ carOffer }: CarOfferProps) {
   return (
      <Link className="group" href={`/offers/${carOffer.id}`}>
         <Card className=" ring-slate-300 group-hover:border-0 group-hover:ring-2 lg:block">
            <CardHeader className=" max-h-[220px] p-0">
               <div className="relative h-[250px] ">
                  <Image
                     className="rounded-lg object-cover"
                     sizes="100vw"
                     fill
                     src={getImageUrl(carOffer.images[0].id)}
                     alt={"Main car offer image"}
                  />
                  <div className="absolute  right-2 top-2 z-40 ">
                     <TooltipProvider delayDuration={100}>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <button className="group/star">
                                 <Star
                                    size={26}
                                    className="z-10 hidden text-white group-hover:block group-hover/star:fill-yellow-300 group-hover/star:text-yellow-300"
                                 />
                              </button>
                           </TooltipTrigger>
                           <TooltipContent
                              className="opacity-80"
                              side={"left"}
                              alignOffset={1}
                           >
                              <p>Dodaj do obserwowanych</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-3 pt-4 lg:pt-2 ">
                  <CardTitle className="flex items-center gap-1 whitespace-nowrap text-xl">
                     <p className="capitalize">{carOffer.manufacturer}</p>
                     <span className="font-light">|</span>
                     <p className="capitalize">mx-5</p>
                     <span className="font-light">|</span>
                     <p>{carOffer.prodYear}</p>
                  </CardTitle>
                  <div className="flex items-center gap-1">
                     <MapPin size={20} />
                     <p>Warszawa, 11-356</p>
                  </div>
                  <div className="flex items-center gap-1">
                     <CircleDollarSign size={20} />
                     <p className="font-bold text-rose-500">
                        {getFormattedCurrency(carOffer.price)}
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </Link>
   )
}

export default CarOffer
