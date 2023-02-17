import { useRef } from "react"
import { useRouter } from "next/router"
import { toastSuccess } from "components/notification"
import { sendPasswordResetToken } from "datastores/graphql/users"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const inputEmailRef = useRef()

  function submitBtnClicked(e) {
    e.preventDefault()

    if (inputEmailRef.current.value.length > 0) {
      sendPasswordResetToken({ email: inputEmailRef.current.value })
      toastSuccess("Please check your email for password reset link!")
      router.push(`/login`)
    }
  }

  return (
    <form className="mx-auto pt-12 space-y-8 w-3/6">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Forgot Password?
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter your email to receive a password reset link
            </p>
          </div>
        </div>

        <div className="pt-8">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={inputEmailRef}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <a
            href="/login"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={submitBtnClicked}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}
