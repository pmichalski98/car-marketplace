import Link from "next/link"
import { auth, SignOutButton } from "@clerk/nextjs"
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
               {user.userId && (
                  <SignOutButton>
                     <Button className={cn("w-full max-w-52 text-center")}>
                        Wyloguj się
                     </Button>
                  </SignOutButton>
               )}
            </div>
         </DropdownMenuContent>
      </DropdownMenu>
      //      }
      //   />
   )
}
export default MenuDropdown
