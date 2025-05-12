import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (req) => {

    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("access_token");

    if (req.nextUrl.pathname.startsWith('/dashboard') && !jwtToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/login') && jwtToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/register') && jwtToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/privacy-policy')) {
        return NextResponse.redirect(new URL('https://www.qcsstudio.com/privacy-policy', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/terms-service')) {
        return NextResponse.redirect(new URL('https://www.qcsstudio.com/terms-service', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/refund-cancellation')) {
        return NextResponse.redirect(new URL('https://www.qcsstudio.com/refund-cancellation', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/terms-condition')) {
        return NextResponse.redirect(new URL('https://www.qcsstudio.com/terms-condition', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/intellectual-property')) {
        return NextResponse.redirect(new URL('https://www.qcsstudio.com/intellectual-property', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/compliance-regulatory')) {
        return NextResponse.redirect(new URL('https://www.qcsstudio.com/compliance-regulatory', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/liability-disclaimer')) {
        return NextResponse.redirect(new URL('https://www.qcsstudio.com/liability-disclaimer', req.url));
    }

    return NextResponse.next();
}