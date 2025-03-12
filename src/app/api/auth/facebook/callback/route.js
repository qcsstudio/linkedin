import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const savedState = cookies().get('facebook_oauth_state');

  if (!code || state !== savedState) {
    return new NextResponse('Invalid OAuth request', { status: 400 });
  }

  const tokenUrl = 'https://graph.facebook.com/v18.0/oauth/access_token';
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_CLIENT_ID,
    client_secret: process.env.FACEBOOK_CLIENT_SECRET,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
    code,
  });

  const response = await fetch(`${tokenUrl}?${params.toString()}`, { method: 'GET' });
  const data = await response.json();

  if (data.access_token) {
    cookies().set('facebook_access_token', data.access_token, { httpOnly: true });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify(data), { status: 400 });
  }
}
