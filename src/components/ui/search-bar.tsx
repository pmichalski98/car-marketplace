import { Search } from "lucide-react"

import { Button } from "./button"
import { Input } from "./input"

function SearchBar() {
   return (
      <div className="relative w-full max-w-2xl">
         <Search
            className="absolute left-3 top-2 text-muted-foreground"
            strokeWidth={1}
            size={25}
         />
         <Input
            placeholder="Szukaj"
            className="w-full border py-2 ps-12"
            type="text"
         />
         <Button className="absolute right-0 top-0 h-full max-w-lg border px-12">
            Wyszukaj
         </Button>
      </div>
   )
}
export default SearchBar
