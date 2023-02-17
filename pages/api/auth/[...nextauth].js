import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    jwt: true,
    maxAge: process.env.NEXT_JWT_MAX_AGE || 7 * 24 * 60 * 60, // 7 days (in seconds)
  },
  callbacks: {
    // need to put accessToken so that session can have it
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user && user.accessToken) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/users/sign_in`,
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
