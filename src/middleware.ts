import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/users')) {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    try {
      const token = authHeader.split(' ')[1] // Get token from "Bearer <token>"
      const decoded = verify(token, process.env.JWT_SECRET!) as {
        userName: string
        role: string
      }

      if (decoded.role !== 'admin') {
        return NextResponse.json(
          { error: 'Not authorized - Admin access required' },
          { status: 403 }
        )
      }

      return NextResponse.next()
    } catch (error) {
      console.error('Error fetching user:', error);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/users/:path*'
} 