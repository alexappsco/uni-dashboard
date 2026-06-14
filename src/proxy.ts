import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/auth');

  // Verify token presence and check if it is expired
  let isTokenValid = false;
  if (token) {
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        // Decode base64url payload
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // base64 decode using global atob
        const jsonPayload = atob(base64);
        const payload = JSON.parse(jsonPayload);
        
        if (payload.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (payload.exp > currentTime) {
            isTokenValid = true;
          }
        } else {
          // If no exp claim, assume valid
          isTokenValid = true;
        }
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }

  // Auth routing logic
  if (!isTokenValid) {
    if (!isAuthPage) {
      // Redirect to login page and clear the invalid cookie
      const redirectUrl = new URL('/auth/login', request.url);
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
      return response;
    }
  } else {
    if (isAuthPage) {
      // If user is already logged in, redirect away from auth pages to home page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (like logoyouni.png and other images/assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logoyouni.png|.*\\..*).*)',
  ],
};
