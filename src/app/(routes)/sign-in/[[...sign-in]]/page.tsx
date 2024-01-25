"use client"

import Link from "next/link"
import { SignIn, SignInButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import GoogleLogo from "@/components/ui/google-logo"

function Page() {
   return (
      <main className="mt-44 flex items-center justify-center">
         <SignIn />
         {/*<Card className="w-[430px] border-0 p-7 shadow-lg">*/}
         {/*   <CardHeader>*/}
         {/*      <CardTitle>Zaloguj się</CardTitle>*/}
         {/*      <CardDescription className="text-slate-500">*/}
         {/*         aby kontynuować na car-marketplace*/}
         {/*      </CardDescription>*/}
         {/*   </CardHeader>*/}
         {/*   <CardContent>*/}
         {/*      <SignInButton>*/}
         {/*         /!*<Button*!/*/}
         {/*         /!*   variant="outline"*!/*/}
         {/*         /!*   className="flex w-full items-center justify-start gap-2"*!/*/}
         {/*         /!*>*!/*/}
         {/*         /!*<GoogleLogo />*!/*/}
         {/*         Kontynuuj z Google*/}
         {/*         /!*</Button>*!/*/}
         {/*      </SignInButton>*/}
         {/*   </CardContent>*/}
         {/*   <CardFooter>*/}
         {/*      <div className="space-x-1 text-sm">*/}
         {/*         <span className="text-slate-500">Nie masz konta?</span>*/}
         {/*         <Link*/}
         {/*            className="text-blue-600 hover:underline "*/}
         {/*            href="/sign-up"*/}
         {/*         >*/}
         {/*            Załóż konto*/}
         {/*         </Link>*/}
         {/*      </div>*/}
         {/*   </CardFooter>*/}
         {/*</Card>*/}
      </main>
   )
}

export default Page
