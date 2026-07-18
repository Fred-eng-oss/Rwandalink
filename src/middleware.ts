import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token')?.value;

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin';
  const isPublicAdminPage =
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/verify-code' ||
    pathname === '/admin/reset-password';

  if (isAdminRoute && !isLoginPage && !isPublicAdminPage && !adminToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
