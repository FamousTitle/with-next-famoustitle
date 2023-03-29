import { useRef, useState, useEffect } from "react"
import { getSession } from "next-auth/react"
import { replace, pullAt } from "lodash"
import prettyBytes from "pretty-bytes"

import { getCurrentUser } from "datastores/graphql/users"
import { upload, remove } from "datastores/rest/upload"

export default function UploadPage({ session }) {
  const inputFileRef = useRef()
  const [disabled, setDisabled] = useState(false)
  const [data, setData] = useState([])

  async function uploadBtnClicked(e) {
    setDisabled(true)
    const files = inputFileRef.current.files
    if (files) {
      const response = await upload({ session, files })
      inputFileRef.current.value = ""
      setDisabled(false)
      setData((prevData) => {
        response.data.files.forEach((file) => {
          prevData.push(file)
        })
        return prevData
      })
    }
  }

  async function onDeleteBtnClicked(id, index) {
    setDisabled(true)
    await remove({ session, uri: `uploads/${id}` })
    setDisabled(false)
    pullAt(data, index)
    setData(data)
  }

  useEffect(() => {
    getCurrentUser({ session, addFiles: true }).then((user) => {
      setData(user.files)
    })
  }, [])

  return (
    <div>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Files
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Files uploaded by current user
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                ref={inputFileRef}
                onChange={uploadBtnClicked}
                disabled={disabled}
                multiple
                className="sr-only"
              />
            </label>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Img
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Filename
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((file, index) => (
                    <tr key={`files-${index}`}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {file.thumbUrl ? (
                          <img
                            className="h-10 w-10"
                            src={replace(
                              file.thumbUrl,
                              process.env.NEXT_PUBLIC_SERVER_HOST,
                              process.env.NEXT_PUBLIC_CLIENT_HOST
                            )}
                            alt=""
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-10 h-10 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                        <a
                          href={replace(
                            file.fullUrl,
                            process.env.NEXT_PUBLIC_SERVER_HOST,
                            process.env.NEXT_PUBLIC_CLIENT_HOST
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.filename}
                        </a>
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {prettyBytes(file.byteSize)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => onDeleteBtnClicked(file.id, index)}
                          disabled={disabled}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
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
