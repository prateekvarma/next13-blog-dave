import { NextResponse } from 'next/server';
import { limiter } from '../config/limiter';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const name = searchParams.get('name');
//   const instrument = searchParams.get('instrument');

//   // expects URL GET for something like http://localhost:3000/api/echo?name=prateek&instrument=guitar
//   return NextResponse.json({ name, instrument });
// }

export async function GET(request: Request) {
  const origin = request.headers.get('origin');

  const remaining = await limiter.removeTokens(1);
  console.log('Remaning tokens: ', remaining);
  if (remaining < 0) {
    return NextResponse.json(null, {
      status: 429,
      statusText: 'Too many requests',
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-Type': 'application/json',
      },
    });
  }

  const { searchParams } = new URL(request.url);

  const obj = Object.fromEntries(searchParams.entries());
  // this returns *any* URL params provided

  return NextResponse.json(obj);
}
