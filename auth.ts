import NextAuth, { type Session } from "next-auth";
import type { NextAuthConfig } from "next-auth"

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
      if (account && user) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        // token.name = `${user.firstName} ${user.lastName}`
        token.id  = user.id
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = Math.floor(Date.now() / 1000 + (account.expires_in || 0))
      // } else if (Date.now() < token.expiresAt * 1000) {
      // isValidToken
      //   return token
      // } else {
      //   // If the access token has expired, try to refresh it
      }

      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
