import NextAuth from "next-auth"

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
    async session({ session, user, token }) {
      console.log("session =", { session, user, token })

      session.user.id = token.id || "id unset"
      session.user.name = token.name || "first last unset"
      session.sat = token.accessToken;

      return session
    },    
    async jwt({ token, account, user }) {
      if (account && user) {
        console.log("jwt = ", { token, account, user })
        // Persist the OAuth access_token and or the user id to the token right after signin
        token.id = user.id
        token.name = user.display_name
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }

      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
