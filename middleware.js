import { NextResponse } from 'next/server';

const SUPPORTED_LANGUAGES = ['es', 'en'];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const firstSegment = pathname.split('/')[1];

  if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
    const url = req.nextUrl.clone();
    url.pathname = '/'; // enforce domain.com
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/:path*'],
};
