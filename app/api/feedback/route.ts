import { NextResponse } from 'next/server';

type Feedback = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const data: Feedback = await request.json();
  console.log('data from the form: ', data);

  const { name, email, message } = data;

  return NextResponse.json({ name, email, message });
}
