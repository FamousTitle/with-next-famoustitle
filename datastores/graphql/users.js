import { gql } from "@apollo/client"
import client from "datastores/graphql/client"

const getCurrentUserQuery = gql`
  query currentUser($addFiles: Boolean!) {
    currentUser {
      id
      email
      files @include(if: $addFiles) {
        id
        filename
        byteSize
        contentType
        fullUrl
        thumbUrl
      }
    }
  }
`

const updateUserMutation = gql`
  mutation updateUser($input: UpdateInput!) {
    updateUser(input: $input) {
      success
      errors
      user {
        id
        email
      }
    }
  }
`

const sendPasswordResetTokenMutation = gql`
  mutation sendPasswordResetToken($input: SendPasswordResetTokenInput!) {
    sendPasswordResetToken(input: $input) {
      success
      errors
    }
  }
`

const userResetPasswordMutation = gql`
  mutation userResetPassword($input: UserResetPasswordInput!) {
    userResetPassword(input: $input) {
      success
      errors
    }
  }
`

export async function sendPasswordResetToken({ email }) {
  const results = await client().mutate({
    variables: {
      input: { email },
    },
    mutation: sendPasswordResetTokenMutation,
  })
  return results.data.sendPasswordResetToken.success
}

export async function userResetPassword({
  resetPasswordToken,
  password,
  passwordConfirmation,
}) {
  const results = await client().mutate({
    variables: {
      input: {
        resetPasswordToken,
        password,
        passwordConfirmation,
      },
    },
    mutation: userResetPasswordMutation,
  })
  return results.data.userResetPassword.success
}

export async function getCurrentUser({ session, addFiles = false }) {
  const results = await client({ session }).query({
    variables: {
      addFiles,
    },
    query: getCurrentUserQuery,
  })
  return results.data.currentUser
}

export async function updateUser({ session, careerPath, responses }) {
  const results = await client({ session }).mutate({
    variables: {
      input: {
        careerPath,
        responses,
      },
    },
    mutation: updateUserMutation,
  })

  if (results.data.updateUser.success) {
    return results.data.updateUser.user
  }

  return false
}
