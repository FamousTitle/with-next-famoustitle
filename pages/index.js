import { getSession } from "next-auth/react"

import StoreProvider from "contexts/store-context"
import Content from "components/homepage/content"

export default function Homepage(props) {
  const { message } = props

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
    return {
      props: {
        message: "Hello World!",
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
