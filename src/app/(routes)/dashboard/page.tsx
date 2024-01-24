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
import HottestOffers from "@/app/(routes)/dashboard/_components/hottest-offers"
import LatestOffers from "@/app/(routes)/dashboard/_components/latest-offers"

async function DashboardPage() {
   return (
      <div className="px-10 py-10">
         <section className="grid w-full grid-cols-2">
            <div className="flex flex-col justify-center gap-4 pr-20">
               <h1 className="text-4xl font-bold">
                  Znajdź swój wymarzony samochód
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
                  <h3 className="font-medium">
                     Najpopularniejsze wyszukiwania:
                  </h3>
                  <div className="space-x-2">
                     <Badge>Nissan Skyline</Badge>
                     <Badge>Toyota Supra</Badge>
                     <Badge>Mazda Mx-5</Badge>
                  </div>
               </div>
            </div>
            <Image
               className={"rounded-lg"}
               src={"/miata.jpg"}
               alt="hero image"
               width={500}
               height={500}
            />
         </section>
         <section className=" py-10">
            <div className=" space-y-2 py-10 text-center">
               <h2 className="text-2xl font-medium">Wyróżnione oferty</h2>
               <p>Przeglądaj wszystkie nasze wyróżnione oferty samochodów</p>
            </div>
            <div>
               <div className="flex gap-2 pb-4">
                  <p>Popularne kategorie:</p>
                  <Badge variant="outline">SUV</Badge>
                  <Badge variant="outline">Automat</Badge>
                  <Badge variant="outline">Diesel</Badge>
               </div>
               <HottestOffers />
            </div>
         </section>
         <section>
            <div className=" space-y-2 py-10 text-center">
               <h2 className="text-2xl font-medium">Nowości</h2>
               <p>Przeglądaj wszystkie nowości na sprzedaż</p>
            </div>
            <LatestOffers />
         </section>
      </div>
   )
}

export default DashboardPage
