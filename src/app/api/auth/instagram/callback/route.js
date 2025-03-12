
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const savedState = cookies().get('instagram_oauth_state');

  if (!code || state !== savedState) {
    return new NextResponse('Invalid OAuth request', { status: 400 });
  }

  const tokenUrl = 'https://api.instagram.com/oauth/access_token';
  const body = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
    code,
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = await response.json();

  if (data.access_token) {
    cookies().set('instagram_access_token', data.access_token, { httpOnly: true });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify(data), { status: 400 });
  }
}
