import { useState, useEffect } from "react"
import { useStoreValue } from "contexts/store-context"
import { getCurrentUser } from "datastores/graphql/users"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Example() {
  const [state] = useStoreValue()
  const [dataFromClient, setDataFromClient] = useState(null)

  const { user, session } = state

  useEffect(() => {
    getCurrentUser({ session }).then((result) =>
      setDataFromClient(
        `Data from server (called from browser)! (${result.email})`
      )
    )
  })

  return (
    <div className="flex-1 flex items-stretch overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4">
        {/* Primary column */}

        {/* in section use h-full for the section to take over the entire height */}
        <section
          aria-labelledby="primary-heading"
          className="min-w-0 flex-1 flex flex-col overflow-hidden lg:order-last"
        >
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Data Examples
          </h1>
          Data from server (called from backend) {user.id}
          {!dataFromClient && <p>Loading data from browser</p>}
          {dataFromClient && <p>{dataFromClient}</p>}
        </section>

        <section className="mt-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Features
          </h1>
          <ul>
            <li>
              <a href="/debug">Debug Page</a>
            </li>
            <li>
              <a href="/debug/upload">File Upload Page</a>
            </li>
          </ul>
        </section>
      </main>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden w-96 bg-white border-l border-gray-200 overflow-y-auto lg:block p-4">
        {/* Your content */}
        Data from server (called from backend) {user.id}
      </aside>
    </div>
  )
}
