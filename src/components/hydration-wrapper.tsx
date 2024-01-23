"use client"

import { useEffect, useState } from "react"

interface HydrationWrapperProps {
   children: React.ReactNode
   placeholder?: React.ReactNode
}

function HydrationWrapper({
   children,
   placeholder = null,
}: HydrationWrapperProps) {
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
      setIsMounted(true)
   })

   if (!isMounted) {
      return <>{placeholder}</>
   }
   return <>{children}</>
}
export default HydrationWrapper
