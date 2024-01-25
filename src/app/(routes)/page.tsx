import HeroHeader from "@/app/(routes)/_components/hero-header"
import HottestOffers from "@/app/(routes)/_components/hottest-offers"
import LatestOffers from "@/app/(routes)/_components/latest-offers"

export default async function Page() {
   return (
      <main className="mx-auto max-w-screen-2xl px-3 py-10 md:px-10">
         <section className="">
            <HeroHeader />
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
