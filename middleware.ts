import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protected routes
  if (path.includes('/edit')) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/edit/:path*']
};