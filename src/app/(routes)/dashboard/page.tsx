import DashboardHeader from "@/app/(routes)/dashboard/_components/dashboard-header"
import HottestOffers from "@/app/(routes)/dashboard/_components/hottest-offers"
import LatestOffers from "@/app/(routes)/dashboard/_components/latest-offers"

async function DashboardPage() {
   return (
      <main className="mx-auto max-w-screen-2xl px-3 py-10 md:px-10">
         <section className="">
            <DashboardHeader />
         </section>
         <section className=" py-10">
            <HottestOffers />
         </section>
         <section>
            <LatestOffers />
         </section>
      </main>
   )
}

export default DashboardPage
