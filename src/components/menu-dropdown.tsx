import Link from "next/link"
import { auth, SignInButton, SignOutButton } from "@clerk/nextjs"
import { Menu, SearchCheck, Star, TagsIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button, buttonVariants } from "./ui/button"

function MenuDropdown() {
   const user = auth()

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <div
               className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-auto p-2 text-black"
               )}
            >
               <Menu />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="z-[9999] w-[300px]">
            <DropdownMenuLabel className="text-xl">Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
               <button className="w-full">
                  <Link
                     className="flex items-center gap-2 font-medium"
                     href={"/dashboard/favourites"}
                  >
                     <Star /> Ulubione
                  </Link>
               </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
               <button className="w-full">
                  <Link
                     href={"/dashboard/saved-searches"}
                     className="flex items-center gap-2 font-medium"
                  >
                     <SearchCheck /> Zapisane wyszukiwania
                  </Link>
               </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
               <button className="w-full">
                  <Link
                     href={"/dashboard/my-offers"}
                     className="flex items-center gap-2 font-medium"
                  >
                     <TagsIcon /> Moje ogłoszenia
                  </Link>
               </button>
            </DropdownMenuItem>
            <div className="flex flex-col items-center gap-2 py-10">
               {user.userId ? (
                  <SignOutButton>
                     <Button className={cn("w-full max-w-52 text-center")}>
                        Wyloguj się
                     </Button>
                  </SignOutButton>
               ) : (
                  <SignInButton>
                     <Button className={cn("w-full max-w-52 text-center")}>
                        Zaloguj się
                     </Button>
                  </SignInButton>
               )}
            </div>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
export default MenuDropdown
