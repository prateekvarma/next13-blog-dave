import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  console.log('Middleware');
  console.log(request.method);
  console.log(request.url);

  const origin = request.headers.get('origin');
  console.log(origin);

  return NextResponse.next();
}

// following means to exempt the path '/api/:path*' from middlewares
export const config = {
  matcher: '/api/:path*',
};
