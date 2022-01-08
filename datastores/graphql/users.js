import { gql } from "@apollo/client"
import client, { serverURI } from "datastores/graphql/client"

const getUsersQuery = gql`
  query users {
    users {
      id
      email
    }
  }
`

export async function getServerUsers({ session }) {
  const results = await client({ session, uri: serverURI }).query({
    variables: {},
    query: getUsersQuery
  })
  return results.data.users
}
