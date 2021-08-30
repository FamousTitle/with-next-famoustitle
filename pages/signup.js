import { useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { toastSuccess, toastError } from "components/notification"

export default function SignUpPage() {
  const router = useRouter()
  const inputEmailRef = useRef()
  const inputPasswordRef = useRef()
  const inputPasswordConfirmationRef = useRef()

  async function submitBtnClicked(e) {
    e.preventDefault()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/users`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          JWT_AUD: "web",
        },
        body: JSON.stringify({
          user: {
            email: inputEmailRef.current.value,
            password: inputPasswordRef.current.value,
            password_confirmation: inputPasswordConfirmationRef.current.value,
          },
        }),
      }
    )

    if (response.status === 201) {
      toastSuccess("new user created")
      router.push(`/login`)
    } else {
      toastError("an error occurred")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
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
                  required
                  ref={inputEmailRef}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  ref={inputPasswordRef}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password-confirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Password Confirmation
              </label>
              <div className="mt-1">
                <input
                  id="password-confirmation"
                  name="password-confirmation"
                  type="password"
                  autoComplete="current-password"
                  required
                  ref={inputPasswordConfirmationRef}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                onClick={submitBtnClicked}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
