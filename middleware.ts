import { NextResponse } from 'next/server';

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://www.yoursite.com', 'https://yoursite.com']
    : ['http://localhost:3000', 'https://google.com'];

export function middleware(request: Request) {
  const origin = request.headers.get('origin');
  console.log(origin);

  //below, add || !origin - if your want the origin to includes in the allowedOrigins, and if origin is absent like the postman tool. Check dave 4:39:10
  if(origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Context-Type': 'text/plain',
      }
    })
  }
  
  console.log('Middleware');
  console.log(request.method);
  console.log(request.url);


  return NextResponse.next();
}

// following means to exempt the path '/api/:path*' from middlewares
export const config = {
  matcher: '/api/:path*',
};
