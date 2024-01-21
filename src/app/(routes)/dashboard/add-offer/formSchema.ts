import { z } from "zod"

export const formSchema = z.object({
   title: z.string().min(1, "Wymagane jest podanie tytułu."),
   description: z.string().min(1, "Wymagane jest podanie opisu."),
   mileage: z.coerce.number().gte(1, "Musi wynosić 1 lub więcej."),
   transmission: z.string(),
   manufacturer: z.string().min(1, "Wymagane jest podanie producenta."),
   fuelType: z.string(),
   prodYear: z.coerce
      .number()
      .gte(1900, "Musi być rokiem 1900 lub późniejszym."), // Rok produkcji
   color: z.string().min(1, "Wymagane jest podanie koloru."),
   price: z.coerce.number().gte(1, "Musi wynosić 1 lub więcej."),
})
