import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async(req)=>{

        const cookieStore = cookies();
        const jwtToken = await cookieStore.get("access_token");


        if(req.nextUrl.pathname.startsWith('/dashboard') && !jwtToken){
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if(req.nextUrl.pathname.startsWith('/login') && jwtToken){
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if(req.nextUrl.pathname.startsWith('/register') && jwtToken){
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return NextResponse.next();  
}