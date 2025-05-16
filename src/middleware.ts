import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '../utils/supabase/middleware'
import { createAdminClient } from '../utils/supabase/server'
export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  const sb = await createAdminClient()
  
  const { data: { session } } = await sb.auth.getSession();
  
  if(request.nextUrl.pathname.startsWith('/admin')){
    if(!session || !session.user){
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return res;
}
export const config = {
  matcher: ['/admin/:path*'],
}