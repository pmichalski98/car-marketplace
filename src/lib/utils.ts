import { randomUUID } from "crypto"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
