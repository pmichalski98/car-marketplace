"use client"

import Link from "next/link"
import {
   ChevronDown,
   Menu,
   Search,
   SearchCheck,
   Star,
   TagsIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
   navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import HydrationWrapper from "./hydration-wrapper"
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
               <NavigationMenu>
                  <NavigationMenuList>
                     <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                           <NavigationMenuLink
                              className={cn(
                                 navigationMenuTriggerStyle(),
                                 "text-white"
                              )}
                           >
                              Nowości
                           </NavigationMenuLink>
                        </Link>
                     </NavigationMenuItem>
                     <HydrationWrapper
                        placeholder={
                           <Link href="/docs" legacyBehavior passHref>
                              <NavigationMenuLink
                                 className={cn(
                                    navigationMenuTriggerStyle(),
                                    "text-white"
                                 )}
                              >
                                 Wyszukiwanie zaawansowane{" "}
                                 <ChevronDown className="ml-1 mt-[2px] size-3" />
                              </NavigationMenuLink>
                           </Link>
                        }
                     >
                        <NavigationMenuItem>
                           <NavigationMenuTrigger className="text-white">
                              Wyszukiwanie zaawansowane
                           </NavigationMenuTrigger>
                           <NavigationMenuContent>
                              <div>
                                 <h1>Wyszukiwanie zaawansowane</h1>
                              </div>
                           </NavigationMenuContent>
                        </NavigationMenuItem>
                     </HydrationWrapper>

                     <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                           <NavigationMenuLink
                              className={cn(
                                 navigationMenuTriggerStyle(),
                                 "text-white"
                              )}
                           >
                              Dodaj ogłoszenie
                           </NavigationMenuLink>
                        </Link>
                     </NavigationMenuItem>
                     <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                           <NavigationMenuLink
                              className={cn(
                                 navigationMenuTriggerStyle(),
                                 "text-white"
                              )}
                           >
                              Kontakt
                           </NavigationMenuLink>
                        </Link>
                     </NavigationMenuItem>
                     <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                           <NavigationMenuLink
                              className={cn(
                                 navigationMenuTriggerStyle(),
                                 "text-white"
                              )}
                           >
                              O Nas
                           </NavigationMenuLink>
                        </Link>
                     </NavigationMenuItem>
                  </NavigationMenuList>
               </NavigationMenu>
            </section>
         </div>
      </div>
   )
}
export default Navbar
