import { getSession } from "next-auth/react"

import StoreProvider from "contexts/store-context"
import Content from "components/homepage/content"
import { getServerUsers } from "datastores/graphql/users"

export default function Homepage(props) {
  const { message, users } = props

  console.log("Data from server: ", users)

  return (
    <StoreProvider session={props.session} data={{ message }}>
      <Content />
    </StoreProvider>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }
  }

  try {
    const users = await getServerUsers({ session })
    return {
      props: {
        message: "Hello World!",
        users
      },
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        message: "Error"
      }
    }
  }

}
