
import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const session = await getToken({req: req, secret: process.env.NEXTAUTH_SECRET})

    if(!session) {
        if(req.nextUrl.pathname.startsWith('/api')) return NextResponse.json({}, {status: 401})
        else return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    if(req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin')) {
        const username = session.username;
    
        if(!process.env.ADMIN_USERS.includes(username)) {
            if(req.nextUrl.pathname.startsWith('/api')) return NextResponse.json({}, {status: 401})
            else return NextResponse.redirect(new URL('/404', req.url))
        }
    }
}

export const config = { matcher: ["/account/:path*", "/api/account/:path*", "/admin/:path*", "/api/admin/:path*"] }