import Image from "next/image"
import { notFound } from "next/navigation"
import { CarOffer } from "@prisma/client"
import { Car, MapPin, Star, Upload } from "lucide-react"

import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel"

export async function generateStaticParams() {
   const offers = await prisma.carOffer.findMany()

   return offers.map((offer: CarOffer) => ({
      offerId: offer.id,
   }))
}

async function OfferPage({ params }: { params: { offerId: string } }) {
   const offer = await prisma.carOffer.findFirst({
      where: {
         id: params.offerId,
      },
   })

   if (!offer) {
      return notFound()
   }

   const images = [
      "/miata.jpg",
      "/miata.jpg",
      "/miata.jpg",
      "/miata.jpg",
      "/miata.jpg",
      "/miata.jpg",
      "/miata.jpg",
      "/miata.jpg",
      "/miata.jpg",
      "/miata.jpg",
   ]

   return (
      <main className="flex justify-center">
         <section className="flex w-full max-w-[1440px] flex-col gap-16 px-6 pt-10">
            <div>
               <p className="text-foreground-muted">
                  Car Marketplace / Wyróznione oferty / Jaguar
               </p>
            </div>
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
               <div className="flex items-center gap-2">
                  <h1 className="border-r border-primary pe-2 text-xl font-medium">
                     {offer.title}
                  </h1>
                  <h2 className="flex items-center gap-2 text-xl font-medium">
                     <MapPin /> Warszawa, Polska
                  </h2>
               </div>
               <div className="flex gap-2">
                  <button className="p-2">
                     <Star className="size-8" strokeWidth={1} />
                  </button>
                  <button className="p-2">
                     <Upload className="size-8" strokeWidth={1} />
                  </button>
               </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
               <Carousel className="w-full">
                  <CarouselContent>
                     {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                           key={index}
                           className="relative aspect-square"
                        >
                           <Image
                              src={"/miata.jpg"}
                              alt={""}
                              className="rounded-lg object-cover object-center"
                              fill
                           />
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-10" />
                  <CarouselNext className="absolute right-10" />
               </Carousel>
               <div className="grid w-full grid-cols-2 place-content-between gap-x-2 gap-y-2 md:gap-y-0">
                  {images.slice(0, 4).map((image, index) => (
                     <div
                        className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg"
                        key={index}
                     >
                        {index === 3 && images.length > 4 ? (
                           <>
                              <div className="absolute top-0 z-20 h-full w-full bg-black/40 hover:bg-black/60" />
                              <div className="absolute flex h-full w-full items-center justify-center">
                                 <p className="z-30 text-5xl text-white">
                                    +{images.length - 4}
                                 </p>
                              </div>
                           </>
                        ) : null}
                        <Image
                           src={image}
                           key={index}
                           alt={""}
                           className="z-0 object-cover object-center"
                           fill
                        />
                     </div>
                  ))}
               </div>
            </div>
            <section className="flex flex-col gap-10">
               <div className="flex flex-col gap-10 lg:flex-row">
                  <div className="w-full">
                     <h2 className="pb-5 text-xl font-medium">
                        Informajce szczegółowe:
                     </h2>
                     <Card className="grid w-full grid-cols-2 p-5">
                        <ul className="flex flex-col gap-4">
                           <li className="flex items-center gap-2">
                              <p className="font-medium">Data produkcji:</p>
                              {offer.prodYear}
                           </li>
                           <li className="flex items-center gap-2">
                              <p className="font-medium">Model:</p>
                              {offer.prodYear}
                           </li>
                           <li className="flex items-center gap-2">
                              <p className="font-medium">
                                 Kolor: {offer.color}
                              </p>
                           </li>
                           <li className="flex items-center gap-2">
                              <p className="font-medium">Przebieg:</p>
                              {offer.mileage}
                           </li>
                           <li className="flex items-center gap-2">
                              <p className="font-medium">Skrzynia biegów:</p>
                              {offer.transmission}
                           </li>
                           <li className="flex items-center gap-2">
                              <p className="font-medium">Rodzaj paliwa:</p>
                              {offer.fuelType}
                           </li>
                        </ul>
                        <ul>
                           <li className="flex items-center gap-2">
                              <p className="text-lg font-medium">Cena</p>
                              <span className="text-red-500">
                                 {offer.price} PLN
                              </span>
                           </li>
                        </ul>
                     </Card>
                  </div>
                  <div className="w-full lg:max-w-[400px]">
                     <h2 className="pb-5 text-xl font-medium">Sprzedający:</h2>
                     <Card className="grid w-full grid-cols-1 gap-10 p-5">
                        <ul className="flex flex-col gap-4">
                           <li className="flex items-center gap-2">
                              <p className="font-medium">Osoba Prywatna:</p>
                              {offer.fuelType}
                           </li>
                           <li className="flex items-center gap-2">
                              <p className="font-medium">Telefon:</p>
                              {offer.prodYear}
                           </li>
                        </ul>
                        <div className="flex flex-col gap-3">
                           <Button>Napisz wiadomość</Button>
                           <button className="flex items-center gap-2">
                              <Star /> Dodaj ofertę do ulubionych
                           </button>
                           <button className="flex items-center gap-2">
                              <Upload /> Udostępnij ofertę
                           </button>
                        </div>
                     </Card>
                  </div>
               </div>
               <div className="w-full">
                  <h2 className="pb-5 text-xl font-medium">
                     Opis sprzedającego:
                  </h2>
                  <Card className="w-full p-5 pb-60">
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis unde modi iure, illum, aperiam nihil vitae beatae
                        voluptatem a nostrum, laborum nemo facere. Amet nesciunt
                        earum dolorem, tempore quis impedit doloremque error
                        labore, ex quod culpa? Labore neque, tenetur cum ipsa
                        dolor eius dicta quam ex nulla, delectus accusamus
                        recusandae. Esse voluptatem architecto laboriosam
                        consequatur maiores ad? Quibusdam adipisci quaerat fuga
                        non, beatae omnis, cupiditate ea incidunt nesciunt
                        suscipit aliquid dolores, est nulla itaque rerum!
                        Dolorum soluta id, expedita ducimus nam praesentium
                        fugit necessitatibus veritatis, laboriosam sequi quas?
                        Libero repudiandae quam, officia aliquam ullam debitis
                        eum, totam ipsum tenetur, sint commodi hic amet illo.
                        Esse accusamus earum a aut unde ab quis excepturi
                        voluptate asperiores. Repudiandae, facere. Harum numquam
                        quia, nam fugiat sunt eveniet similique quod hic iusto
                        rerum? Nam excepturi praesentium a, illo reprehenderit
                        odit numquam totam fugit repudiandae ut, et harum odio
                        laborum quod ipsum tenetur. Officia delectus culpa ipsa
                        reiciendis nemo natus? Fuga adipisci molestias sint
                        magnam nostrum placeat velit reprehenderit ipsam,
                        possimus quo dolorem similique reiciendis. Eum fugiat
                        sunt in earum debitis quidem quia odit, quo dicta,
                     </p>
                  </Card>
               </div>
               <div className="w-full">
                  <h2 className="pb-5 text-xl font-medium">Dla kupującego:</h2>
                  <div className="grid grid-cols-2 gap-10 lg:grid-cols-3">
                     <Card className="flex w-full flex-col items-center gap-6 p-6">
                        <h1 className="flex items-center gap-2 text-lg font-medium">
                           <Car /> Historia Pojazdu
                        </h1>
                        <p className="text-center">
                           Zanim zdecydujesz się kupić samochód, zapoznaj się z
                           jego historią. Pobierz raport za opłatą.
                        </p>
                        <Button variant={"outline"} size={"lg"}>
                           Pobierz raport
                        </Button>
                     </Card>
                  </div>
               </div>
            </section>
         </section>
      </main>
   )
}

export default OfferPage
