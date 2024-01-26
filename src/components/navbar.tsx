import Link from "next/link"

import { cn } from "@/lib/utils"

import MenuDropdown from "./menu-dropdown"
import MenuPanel from "./menu-panel"
import { buttonVariants } from "./ui/button"
import Logo from "./ui/logo"
import SearchBar from "./ui/search-bar"

function Navbar() {
   return (
      <div className="sticky z-[9999] flex w-full justify-center bg-secondary py-5 md:py-0 md:pt-5">
         <div className="flex w-full max-w-[1440px] flex-col">
            <section className="flex w-full justify-between px-5">
               <div className="flex w-full items-center gap-7">
                  <Logo />
                  <div className="hidden w-full sm:block">
                     <SearchBar />
                  </div>
               </div>
               <div className="flex items-center">
                  <div>
                     <Link
                        href="/"
                        className={cn(
                           buttonVariants({ variant: "link" }),
                           "text-black hover:text-black"
                        )}
                     >
                        Zaloguj się
                     </Link>
                  </div>
                  <MenuDropdown />
               </div>
            </section>
            <section className="hidden w-full justify-start p-2 ps-24 md:flex">
               <MenuPanel />
            </section>
         </div>
      </div>
   )
}
export default Navbar
