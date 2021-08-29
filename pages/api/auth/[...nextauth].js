import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days (in seconds)
  },
  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (profile && profile.accessToken) {
        token.accessToken = profile.accessToken
      }
      return token
    },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_DNS_HOST}/users/sign_in`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                JWT_AUD: "web",
              },
              body: JSON.stringify({
                user: {
                  email: credentials.email,
                  password: credentials.password,
                },
              }),
            }
          )

          if (response.status === 201 || response.status === 200) {
            let data = await response.json()
            data["accessToken"] = response.headers.get("authorization")
            return data
          } else {
            return null
          }
        } catch (e) {
          console.log(e)
          return null
        }
      },
    }),
  ],
})
