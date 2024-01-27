"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
   NavigationMenu,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"

import OfferFilters from "./offer-filters"

function MenuPanel() {
   const ROUTES = [
      {
         label: "Nowości",
         href: "/",
      },
      {
         label: "Wyszukiwanie zaawansowane",
         href: "/",
         content: (
            <Sheet>
               <SheetTrigger>
                  <p className="flex text-sm font-medium">
                     Wyszukiwanie zaawansowane{" "}
                     <ChevronDown className="relative left-1 top-[5px] size-3" />
                  </p>
               </SheetTrigger>
               <SheetContent
                  side={"top"}
                  className="top-32 flex justify-center"
               >
                  <SheetHeader className="flex w-full max-w-[1440px] flex-col gap-5">
                     <SheetTitle>Wyszukiwanie zaawansowane:</SheetTitle>
                     <OfferFilters />
                  </SheetHeader>
               </SheetContent>
            </Sheet>
         ),
      },
      {
         label: "Dodaj ogłoszenie",
         href: "/dashboard/offer-create",
      },
      {
         label: "Kontakt",
         href: "/",
      },
      {
         label: "O Nas",
         href: "/",
      },
   ]

   return (
      <NavigationMenu>
         <NavigationMenuList>
            {ROUTES.map((route) =>
               route.content ? (
                  <NavigationMenuItem key={route.label}>
                     {route.content}
                  </NavigationMenuItem>
               ) : (
                  <NavigationMenuItem key={route.label}>
                     <Link href={route.href} legacyBehavior passHref>
                        <NavigationMenuLink
                           className={cn(
                              navigationMenuTriggerStyle(),
                              "text-black"
                           )}
                        >
                           {route.label}
                        </NavigationMenuLink>
                     </Link>
                  </NavigationMenuItem>
               )
            )}
         </NavigationMenuList>
      </NavigationMenu>
   )
}
export default MenuPanel
