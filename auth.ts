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
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl
    //   if (pathname === "/middleware-example") return !!auth
    //   return true
    // },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
