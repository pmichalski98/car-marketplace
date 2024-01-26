"use client"

import Link from "next/link"
import { SignUp, SignUpButton } from "@clerk/nextjs"

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
         <SignUp />
         {/*<Card className="w-[430px] border-0 p-7 shadow-lg">*/}
         {/*   <CardHeader>*/}
         {/*      <CardTitle>Załóż konto</CardTitle>*/}
         {/*      <CardDescription className="text-slate-500">*/}
         {/*         aby kontynuować na car-marketplace*/}
         {/*      </CardDescription>*/}
         {/*   </CardHeader>*/}
         {/*   <CardContent>*/}
         {/*      <SignUpButton>*/}
         {/*         <Button*/}
         {/*            variant="outline"*/}
         {/*            className="flex w-full items-center justify-start gap-2"*/}
         {/*         >*/}
         {/*            <GoogleLogo />*/}
         {/*            Kontynuuj z Google*/}
         {/*         </Button>*/}
         {/*      </SignUpButton>*/}
         {/*   </CardContent>*/}
         {/*   <CardFooter>*/}
         {/*      <div className="space-x-1 text-sm">*/}
         {/*         <span className="text-slate-500">Masz już konto?</span>*/}
         {/*         <Link*/}
         {/*            className="text-blue-600 hover:underline "*/}
         {/*            href="/sign-in"*/}
         {/*         >*/}
         {/*            Zaloguj się*/}
         {/*         </Link>*/}
         {/*      </div>*/}
         {/*   </CardFooter>*/}
         {/*</Card>*/}
      </main>
   )
}

export default Page
