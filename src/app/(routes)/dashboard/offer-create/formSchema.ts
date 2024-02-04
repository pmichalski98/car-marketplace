import { z } from "zod"

export const formSchema = z.object({
   title: z.string().min(1, "Uzupełnij tytuł ogłoszenia").max(50, ""),
   description: z.string().min(10, "Uzupełnij opis ogłoszenia"),
   mileage: z.coerce
      .number({ invalid_type_error: "Przebieg musi być większy od 0" })
      .gte(1, "Przebieg musi być większy od 0"),
   transmission: z.string().min(1, "Wybierz rodzaj skrzyni biegów"),
   manufacturer: z.string().min(1, "Podaj markę pojazdu"),
   model: z.string().min(1, "Podaj model auta"),
   fuelType: z.string().min(1, "Wybierz typ paliwa"),
   prodYear: z.coerce
      .number({ invalid_type_error: "Musi być rokiem 1900 lub późniejszym." })
      .gte(1900, "Musi być rokiem 1900 lub późniejszym."),
   engineCapacity: z.coerce
      .number({ invalid_type_error: "Podaj pojemność silnika w ccm3 " })
      .gte(1, "Podaj pojemność silnika w ccm3"),
   enginePower: z.coerce
      .number({
         invalid_type_error: "Podaj moc silnika w koniach mechanicznych",
      })
      .gte(1, "Podaj moc silnika w koniach mechanicznych"),
   vin: z.coerce
      .string()
      .min(17, "Musi się składać z 17 znaków")
      .max(17, "Musi się składać z 17 znaków"),
   color: z.string().min(1, "Podaj kolor auta"),
   price: z.coerce
      .number({ invalid_type_error: "Podaj cenę" })
      .gte(1, "Podaj cenę"),
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
