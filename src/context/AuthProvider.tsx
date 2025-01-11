'use client'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import Home from './../app/page';

export default function AuthProvider({children}:{children:ReactNode}) {
    
  return (
    
    <SessionProvider >
        {/* <Home/> */}
        {children}
    </SessionProvider>
  )
}
