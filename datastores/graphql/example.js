import { gql } from "@apollo/client"
import client from "datastores/graphql/client"

const getTestFieldQuery = gql`
  query {
    testField
  }
`

export async function getClientTestField({ session }) {
  const results = await client({ session }).query({
    variables: {},
    query: getTestFieldQuery
  })
  return results.data.testField
}
