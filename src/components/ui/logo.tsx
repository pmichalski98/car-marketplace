import Image from "next/image"
import Link from "next/link"

function Logo() {
   return (
      <Link href={"/"}>
         <Image
            src={"/logo.png"}
            alt="logo"
            width={50}
            height={50}
            className="rounded-lg"
         />
      </Link>
   )
}
export default Logo
