import NextAuth, { type Session } from "next-auth";
import type { NextAuthConfig } from "next-auth"
import { type TokenSet } from "@auth/core/types"
import { JWT } from "@auth/core/jwt";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    {
      id: 'signalwire',
      name: 'SignalWire',
      type: 'oauth',
      authorization: {
        url: process.env.SIGNALWIRE_AUTH_URL,
        params: { scope: 'email' },
      },
      clientId: process.env.SIGNALWIRE_CLIENT_ID,
      clientSecret: process.env.SIGNALWIRE_CLIENT_SECRET,
      token: process.env.SIGNALWIRE_ACCESS_TOKEN_URL,
      userinfo: process.env.SIGNALWIRE_USERINFO_URL,
      checks: ['pkce', 'state'],
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          displayName: profile.display_name,
          jobTitle: profile.job_title,
          timeZone: profile.time_zone,
          counry: profile.country,
          region: profile.region,
          companyName: profile.company_name,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token?: any; }) {
      session.user.id = token.id
      session.user.sat = token.accessToken

      return session
    },    
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        // token.name = `${user.firstName} ${user.lastName}`
        token.id  = user.id
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = Math.floor(Date.now() / 1000 + (account.expires_in || 0))
        return token
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.expiresAt * 1000) {
        return token
      }

      // If the access token has expired, try to refresh it
      const tokens = await refreshAccessToken(token)
      return {
        ...token,
        accessToken: tokens.access_token,
        expiresAt: Math.floor(Date.now() / 1000 + tokens.expires_in),
      };        

      // return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

async function refreshAccessToken(token) {
  console.log("refreshAccessToken", token)

  const response = await fetch(process.env.SIGNALWIRE_ACCESS_TOKEN_URL || '', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.SIGNALWIRE_CLIENT_ID || '',
      client_secret: process.env.SIGNALWIRE_CLIENT_SECRET || '',
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }),
    method: 'POST',
  });

  if (!response.ok) {
    console.error('Error refreshing access token', await response.text());
    throw new Error('RefreshAccessTokenError');
  }

  const data = await response.json();
  return data;
}
