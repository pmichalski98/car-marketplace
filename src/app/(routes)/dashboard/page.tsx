import { auth } from "@clerk/nextjs"
import { PrismaClient } from "@prisma/client"

import CarOffer from "@/app/(routes)/dashboard/_components/car-offer"

async function DashboardPage() {
   const { userId } = auth()
   const prisma = new PrismaClient()

   if (!userId) throw new Error("User not logged in")

   const carOffers = await prisma.carOffer.findMany({
      where: {
         userId,
      },
      include: {
         images: true,
      },
   })

   if (!carOffers) return <div>No car offers created yet.</div>

   return (
      <section className="px-10 py-10">
         <ul className="grid grid-cols-4 gap-10">
            {carOffers.map((carOffer) => {
               return (
                  <li key={carOffer.id}>
                     <CarOffer carOffer={carOffer} />
                  </li>
               )
            })}
         </ul>
      </section>
   )
}
export default DashboardPage
