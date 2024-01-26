import Link from "next/link"
import { auth } from "@clerk/nextjs"

import { cn } from "@/lib/utils"

import MenuDropdown from "./menu-dropdown"
import MenuPanel from "./menu-panel"
import { buttonVariants } from "./ui/button"
import Logo from "./ui/logo"
import SearchBar from "./ui/search-bar"

function Navbar() {
   const user = auth()
   return (
      <div className="sticky z-[9999] flex w-full justify-center bg-secondary pt-5">
         <div className="flex w-full max-w-[1440px] flex-col">
            <section className="flex w-full justify-between px-5">
               <div className="flex w-full items-center gap-7">
                  <Logo />
                  <SearchBar />
               </div>
               <div className="flex items-center">
                  {!user.userId && (
                     <Link
                        href="/sign-in"
                        className={cn(
                           buttonVariants({ variant: "link" }),
                           "text-black hover:text-black"
                        )}
                     >
                        Zaloguj się
                     </Link>
                  )}
                  <MenuDropdown />
               </div>
            </section>

            <section className="flex w-full justify-start p-2 ps-24">
               <MenuPanel />
            </section>
         </div>
      </div>
   )
}
export default Navbar
