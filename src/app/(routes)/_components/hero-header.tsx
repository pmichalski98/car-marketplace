import React from "react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

function HeroHeader() {
   return (
      <div className="mx-auto  max-w-screen-2xl grid-cols-2 lg:grid">
         <div className="mb-10 flex flex-col justify-center gap-4 lg:mb-0 lg:pr-20">
            <h1 className="text-4xl font-bold">
               Znajdź swój wymarzony <br /> samochód
            </h1>
            <p>
               Nowoczesna platforma do kupna i sprzedaży ciekawych samochodów
            </p>
            <div className="flex gap-2">
               <Select>
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Marka" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="Mazda">Mazda</SelectItem>
                  </SelectContent>
               </Select>
               <Select>
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="Mx-5">Mx-5</SelectItem>
                  </SelectContent>
               </Select>
               <Button>Wyszukaj</Button>
            </div>
            <div className="space-y-2 pt-2">
               <h3 className="font-medium">Najpopularniejsze wyszukiwania:</h3>
               <div className="space-x-2">
                  <Badge>Nissan Skyline</Badge>
                  <Badge>Toyota Supra</Badge>
                  <Badge>Mazda Mx-5</Badge>
               </div>
            </div>
         </div>
         <div className="relative min-h-[300px]">
            <Image
               className="rounded-lg object-cover "
               sizes="100vw"
               src={"/miata.jpg"}
               alt="hero image"
               fill
            />
         </div>
      </div>
   )
}

export default HeroHeader
