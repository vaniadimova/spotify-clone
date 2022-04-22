import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // Token will exits if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    
    const { pathname } = req.nextUrl;

    // Allow access to pages if user is logged in

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect to login page if user is not logged in

    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }
}