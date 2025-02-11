import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Skip middleware for login page and API routes
  if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('adminToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};