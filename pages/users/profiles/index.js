import { getSession } from "next-auth/react"

import StoreProvider from "contexts/store-context"
import Container from "components/container"
import Content from "components/users/profiles/content"
import { getCurrentUser } from "datastores/graphql/users"

export default function DashboardPage(props) {
  const { user } = props

  return (
    <StoreProvider session={props.session} data={{ user }}>
      <Container>
        <div className="bg-white">
          <div className="px-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Content />
            </div>
          </div>
        </div>
      </Container>
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
