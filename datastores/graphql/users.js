import { gql } from "@apollo/client"
import client from "datastores/graphql/client"

const getCurrentUserQuery = gql`
  query currentUser {
    currentUser {
      id
      email
    }
  }
`

const sendPasswordResetTokenMutation = gql`
  mutation sendPasswordResetToken($email: String!) {
    sendPasswordResetToken(email: $email)
  }
`

const userResetPasswordMutation = gql`
  mutation userResetPassword(
    $resetPasswordToken: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    userResetPassword(
      resetPasswordToken: $resetPasswordToken
      password: $password
      passwordConfirmation: $passwordConfirmation
    )
  }
`

export async function sendPasswordResetToken({ email }) {
  const results = await client().mutate({
    variables: {
      email,
    },
    mutation: sendPasswordResetTokenMutation,
  })
  return results.data.sendPasswordResetToken
}

export async function userResetPassword({
  resetPasswordToken,
  password,
  passwordConfirmation,
}) {
  const results = await client().mutate({
    variables: {
      resetPasswordToken,
      password,
      passwordConfirmation,
    },
    mutation: userResetPasswordMutation,
  })
  return results.data.userResetPassword
}

export async function getCurrentUser({ session }) {
  const results = await client({ session }).query({
    variables: {},
    query: getCurrentUserQuery,
  })
  return results.data.currentUser
}
