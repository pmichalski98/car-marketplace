import { ChangeEvent } from "react"
import { clsx, type ClassValue } from "clsx"
import { UseFormSetValue } from "react-hook-form"
import { twMerge } from "tailwind-merge"

import { FormSchema } from "@/app/(routes)/dashboard/offer-create/formSchema"

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export async function urlToFile(url: string): Promise<File | null> {
   try {
      // Fetch the file as a blob
      const response = await fetch(url)
      const blob = await response.blob()

      // Create a File object from the blob
      const filename = getFilenameFromUrl(url)
      const file = new File([blob], filename)

      return file
   } catch (error) {
      console.error("Error converting URL to File:", error)
      return null
   }
}

function getFilenameFromUrl(url: string): string {
   // Extract filename from the URL
   const urlParts = url.split("/")
   return urlParts[urlParts.length - 1]
}

export function getImageUrl(imageId: string) {
   return `https://cool-car-marketplace.s3.eu-north-1.amazonaws.com/${imageId}`
}

export const getFormattedCurrency = (value: number) =>
   new Intl.NumberFormat("pl", {
      style: "currency",
      currency: "PLN",
   }).format(value)

export function zipCodeRefactor(
   e: ChangeEvent<HTMLInputElement>,
   setValue: UseFormSetValue<FormSchema>
) {
   const value: string = e.target.value
   if (/^\d{5}$/.test(e.target.value)) {
      const firstTwo = value.slice(0, 2)
      const lastThree = value.slice(2)
      const changedZipCode = firstTwo.concat("-").concat(lastThree)
      setValue("sellersZip", changedZipCode)
   }
}
