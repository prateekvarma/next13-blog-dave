import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const instrument = searchParams.get('instrument');

  // expects URL GET for something like http://localhost:3000/api/echo?name=prateek&instrument=guitar
  return NextResponse.json({ name, instrument }); 
}
