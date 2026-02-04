import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

// Routes that require admin authentication
const protectedRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    // Get the auth token from cookies
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
        // Redirect to login if no token
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // Verify the token
        const { payload } = await jwtVerify(token, JWT_SECRET);

        // Check if user is admin
        if (payload.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    } catch {
        // Token is invalid, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*'],
};
