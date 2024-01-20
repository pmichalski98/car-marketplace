import { NextResponse } from "next/server"
import {formSchema} from "@/app/(routes)/dashboard/add-offer/formSchema";

export async function POST(req: Request) {
   const data = await req.formData();
   console.log(data)
   // const parsed = formSchema.parse(data)
   const images = data.getAll('files')
   // console.log(parsed, images)
   return new NextResponse("test")
}
