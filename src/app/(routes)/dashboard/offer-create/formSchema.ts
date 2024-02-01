import { z } from "zod"

export const formSchema = z.object({
   title: z.string().min(1, "Uzupełnij tytuł ogłoszenia"),
   description: z.string().min(10, "Uzupełnij opis ogłoszenia"),
   mileage: z.coerce.number().gte(1, "Przebieg musi być większy od 0"),
   transmission: z.string().min(1, "Wybierz rodzaj skrzyni biegów"),
   manufacturer: z.string().min(1, "Podaj markę pojazdu"),
   model: z.string().min(1, "Podaj model auta"),
   fuelType: z.string().min(1, "Wybierz typ paliwa"),
   prodYear: z.coerce
      .number()
      .gte(1900, "Musi być rokiem 1900 lub późniejszym."),
   color: z.string().min(1, "Podaj kolor auta"),
   price: z.coerce.number().gte(1, "Podaj cenę"),
   sellersCity: z.string().min(1, "Podaj miejsce gdzie można obejrzeć auto"),
   sellersZip: z
      .string()
      .regex(/(^\d{2}-\d{3}$)|(^\d{5}$)/, {
         message: "Podaj kod pocztowy w formacie XX-XXX",
      })
      .max(6)
      .min(5),
})

export type FormSchema = z.infer<typeof formSchema>
