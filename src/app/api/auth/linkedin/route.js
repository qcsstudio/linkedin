// app/api/auth/linkedin/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCookie } from '@/utils/getCookie';
import { verifyToken } from '@/utils/tokenGenerator';

export async function GET() {
  const cookieStore = await cookies();
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
  
  if (!clientId || !redirectUri) {
    return new NextResponse('Missing OAuth configuration', { status: 500 });
  }

  const jwt_data = await getCookie("access_token");
  const token = await verifyToken(jwt_data?.value);
  const userId = await token?.userId;

  // Generate and store state
  const state = userId;
  cookieStore.set('linkedin_oauth_state', state, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    maxAge: 300,
  });

  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append("scope", "openid profile email w_member_social r_ads_reporting r_organization_social rw_organization_admin w_member_social rw_events r_ads w_organization_social rw_ads r_basicprofile r_events r_organization_admin email r_1st_connections_size");
  authUrl.searchParams.append('state', state);

  return NextResponse.redirect(authUrl.toString());
}