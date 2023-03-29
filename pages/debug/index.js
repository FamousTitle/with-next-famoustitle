import { useState } from "react"
import { getSession, signOut } from "next-auth/react"

export default function DebugPage(props) {
  const [response, setResponse] = useState("")

  return (
    <div>
      <h1>Debug</h1>
      <p>For debugging purposes</p>

      <div>
        <h2>Response:</h2>
        <p>{JSON.stringify(props.session)}</p>
        <button
          onClick={() => {
            const response = fetch(
              `${process.env.NEXT_PUBLIC_CLIENT_HOST}/users/sign_out`,
              {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  JWT_AUD: "web",
                  Authorization: props.session.accessToken,
                },
              }
            )

            signOut({
              callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_HOST}/login`,
            })
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
