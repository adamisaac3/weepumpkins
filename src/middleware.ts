import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '../utils/supabase/middleware'
export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  const {user} = await updateSession(request)
  
  
  if(request.nextUrl.pathname.startsWith('/admin') && (user && user.is_anonymous)){
      return NextResponse.redirect(new URL('/login', request.url))
    }

  return res;
}
export const config = {
  matcher: ['/admin/:path*'],
}