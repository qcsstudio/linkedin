import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const redirectUri = process.env.FACEBOOK_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return new NextResponse('Missing OAuth configuration', { status: 500 });
  }

  // Generate and store state
  const state = Math.random().toString(36).substring(2);
  cookies().set('facebook_oauth_state', state, {
    httpOnly: true,
    maxAge: 300,
  });

  const authUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('scope', 'public_profile,email,pages_manage_posts,pages_read_engagement');
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('response_type', 'code');

  return NextResponse.redirect(authUrl.toString());
}
