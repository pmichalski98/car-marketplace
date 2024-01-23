"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
   navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

function MenuPanel() {
   const ROUTES = [
      {
         label: "Nowości",
         href: "/",
      },
      {
         label: "Wyszukiwanie zaawansowane",
         href: "/",
         placeholder: (
            <>
               Wyszukiwanie zaawansowane
               <ChevronDown className="ml-1 mt-[2px] size-3" />
            </>
         ),
         content: (
            <div>
               <h1>Wyszukiwanie zaawansowane</h1>
            </div>
         ),
      },
      {
         label: "Dodaj ogłoszenie",
         href: "/",
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
      // <HydrationWrapper>
      <NavigationMenu>
         <NavigationMenuList>
            {ROUTES.map((route) =>
               route.content ? (
                  <NavigationMenuItem>
                     <NavigationMenuTrigger className="text-white">
                        {route.label}
                     </NavigationMenuTrigger>
                     <NavigationMenuContent>
                        {route.content}
                     </NavigationMenuContent>
                  </NavigationMenuItem>
               ) : (
                  <NavigationMenuItem>
                     <Link href={route.href} legacyBehavior passHref>
                        <NavigationMenuLink
                           className={cn(
                              navigationMenuTriggerStyle(),
                              "text-white"
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
