import { InMemoryCache, ApolloClient } from "@apollo/client"

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
}

export default function client(options = {}) {
  let { session } = options

  let host = process.env.NEXT_PUBLIC_CLIENT_HOST

  // set host to server if not calling from browser (backend call)
  if (typeof window === "undefined") {
    host = process.env.NEXT_PUBLIC_SERVER_HOST
  }

  return new ApolloClient({
    uri: `${host}/graphql`,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    headers: {
      JWT_AUD: process.env.NEXT_JWT_AUD || "web",
      Authorization: session && session.accessToken,
    },
  })
}
