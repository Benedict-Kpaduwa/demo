import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    console.log('Middleware: Token found:', !!token);

    if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
        console.log('Middleware: Redirecting to /login');
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};