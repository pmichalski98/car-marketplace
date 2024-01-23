import Link from "next/link"
import { Menu, Search, SearchCheck, Star, TagsIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import HydrationWrapper from "./hydration-wrapper"
import MenuPanel from "./menu-panel"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"
import Logo from "./ui/logo"

function Navbar() {
   return (
      <div className="flex justify-center bg-primary pt-5">
         <div className="flex w-full max-w-[1440px] flex-col">
            <section className="flex w-full justify-between px-5">
               <div className="flex w-full items-center gap-7">
                  <Logo />
                  <div className="relative w-full max-w-2xl">
                     <Search
                        className="absolute left-3 top-2 text-muted-foreground"
                        strokeWidth={1}
                        size={25}
                     />
                     <Input
                        placeholder="Szukaj"
                        className="w-full border py-2 ps-12"
                        type="text"
                     />
                     <Button className="absolute right-0 top-0 h-full max-w-lg border px-12">
                        Wyszukaj
                     </Button>
                  </div>
               </div>
               <div className="flex items-center">
                  <div>
                     <Link
                        href="/"
                        className={cn(
                           buttonVariants({ variant: "link" }),
                           "text-white hover:text-white"
                        )}
                     >
                        Zaloguj się
                     </Link>
                  </div>
                  <HydrationWrapper
                     placeholder={
                        <div className="h-auto p-2 text-white">
                           <Menu />
                        </div>
                     }
                  >
                     <DropdownMenu>
                        <DropdownMenuTrigger>
                           <Button
                              variant={"ghost"}
                              className="h-auto p-2 text-white"
                           >
                              <Menu />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[300px]">
                           <DropdownMenuLabel className="text-xl">
                              Menu
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem
                              className="flex items-center gap-2 font-medium"
                              asChild
                           >
                              <Link href={"/"}>
                                 <Star /> Ulubione
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              className="flex items-center gap-2 font-medium"
                              asChild
                           >
                              <Link href={"/"}>
                                 <SearchCheck /> Zapisane wyszukiwania
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              className="flex items-center gap-2 font-medium"
                              asChild
                           >
                              <Link href={"/"}>
                                 <TagsIcon /> Moje ogłoszenia
                              </Link>
                           </DropdownMenuItem>
                           <div className="flex flex-col items-center gap-2 py-10">
                              <Link
                                 className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "w-full max-w-52 text-center"
                                 )}
                                 href={"/"}
                              >
                                 Zaloguj się
                              </Link>
                              <Link
                                 className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "w-full max-w-52 text-center"
                                 )}
                                 href={"/"}
                              >
                                 Załóż konto
                              </Link>
                           </div>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </HydrationWrapper>
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
