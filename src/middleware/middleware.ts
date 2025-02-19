// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  // Only apply to /api/users and similar protected routes
  if (request.nextUrl.pathname.startsWith('/api/users')) {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authentication token required' }, 
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      // Verify the token
      const decoded=verify(token, process.env.JWT_SECRET!);
      
      if (JSON.parse(JSON.stringify(decoded)).userName=='admin'){
        return NextResponse.next();
      }
        else{
          return NextResponse.json(
            { message: 'You are not an admin' }, 
            { status: 401 }
          );
        }      
    } catch (error) {
      // Token is invalid
      return NextResponse.json(
        { message: 'Invalid authentication token' }, 
        { status: 401 }
      );
    }
  }
  
  // Not a protected path, continue
  return NextResponse.next();
}

// Configure which paths this middleware is run on
export const config = {
  matcher: ['/api/users/:path*'],
};