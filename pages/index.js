import { getSession } from "next-auth/react"

import StoreProvider from "contexts/store-context"
import Content from "components/homepage/content"
import { getCurrentUser } from "datastores/graphql/users"

export default function Homepage(props) {
  const { user } = props

  return (
    <StoreProvider session={props.session} data={{ user }}>
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

  const user = await getCurrentUser({ session })

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }
  }

  try {
    return {
      props: {
        user,
        session,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        message: "Error",
      },
    }
  }
}
