import { NextRequest, NextResponse } from "next/server";

export default function middleware(request:NextRequest){
    const token = request.cookies.get('next-auth.session-token')
    // const currentUrl = request.nextUrl.pathname
    if (!token ) 
        return NextResponse.rewrite(new URL("/login" ,request.url ) )

    return NextResponse.next() 
    
}

// the middleware will work for all routes except the signin route
export const config = {
    matcher: ['/home'],
}