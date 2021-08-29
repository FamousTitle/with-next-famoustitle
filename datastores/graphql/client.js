import { InMemoryCache, ApolloClient } from "@apollo/client"

export const serverURI = `${process.env.NEXT_PUBLIC_BACKEND_DNS_HOST}/graphql`

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
  let { session, uri } = options

  if (uri === undefined || uri === "") {
    uri = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
  }

  return new ApolloClient({
    uri: uri,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    headers: {
      JWT_AUD: "web",
      Authorization: session && session.accessToken,
    },
  })
}
