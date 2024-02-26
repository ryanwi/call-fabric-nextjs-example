import NextAuth from "next-auth"

// declare module '@auth/core/types' {
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      name: string
      email: string
      sat: string
    } & DefaultSession["user"]
  }
}

declare module '@auth/core/jwt' {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  interface JWT {
		id: string | undefined
		accessToken: string | undefined
		refreshToken: string | undefined
		accessTokenExpires: number
	}
}
