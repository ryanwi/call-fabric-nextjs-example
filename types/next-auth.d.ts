import NextAuth from "next-auth"

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
	interface JWT {
		id: string | undefined
		accessToken: string | undefined
		refreshToken: string | undefined
		accessTokenExpires: number
	}
}
