import { useEffect, useState } from "react"
import { getSession, signOut } from "next-auth/client"
import FileViewer from "react-file-viewer"

export default function DebugPage(props) {
  const [response, setResponse] = useState("")
  const file =
    "http://localhost:8301/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9JYTJWNVNTSWhORFp2WjJocGJuQm1hMnMyY25ONGJEVTVhekZtWWpGemNXbHZjUVk2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpUldsdWJHbHVaVHNnWm1sc1pXNWhiV1U5SW01bGMzTWdjR2xqZEhWeVpTSTdJR1pwYkdWdVlXMWxLajFWVkVZdE9DY25ibVZ6Y3lVeU1IQnBZM1IxY21VR093WlVPaEZqYjI1MFpXNTBYM1I1Y0dWSklnNXBiV0ZuWlM5d2JtY0dPd1pVT2hGelpYSjJhV05sWDI1aGJXVTZDbXh2WTJGcyIsImV4cCI6IjIwMjEtMDgtMThUMDg6MTQ6NDkuNDkzWiIsInB1ciI6ImJsb2Jfa2V5In19--663ec730b7879be293f4df2c47f923203217f6e2/ness%20picture"

  return (
    <div>
      <h1>Debug</h1>
      <p>For debugging purposes</p>

      <FileViewer fileType={"png"} filePath={file} />

      <div>
        <h2>Response:</h2>
        <p>{JSON.stringify(props.session)}</p>
        <button
          onClick={() => {
            const response = fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_HOST}/users/sign_out`,
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
              callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/login`,
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
