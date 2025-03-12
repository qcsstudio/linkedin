import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return new NextResponse('Missing OAuth configuration', { status: 500 });
  }

  // Generate and store state
  const state = Math.random().toString(36).substring(2);
  cookies().set('instagram_oauth_state', state, {
    httpOnly: true,
    maxAge: 300,
  });

  const authUrl = new URL('https://api.instagram.com/oauth/authorize');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('scope', 'user_profile,user_media');
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('response_type', 'code');

  return NextResponse.redirect(authUrl.toString());
}
