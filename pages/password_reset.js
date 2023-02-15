import { useRef } from "react"
import { useRouter } from "next/router"
import { toastSuccess, toastError } from "components/notification"
import { userResetPassword } from "datastores/graphql/users"

export default function PasswordResetPage(props) {
  const router = useRouter()
  const inputPasswordRef = useRef()
  const inputPasswordConfirmationRef = useRef()

  async function submitBtnClicked(e) {
    e.preventDefault()
    let submittable = true

    if (
      inputPasswordRef.current.value !==
      inputPasswordConfirmationRef.current.value
    ) {
      toastError("Passwords do not match")
      submittable = false
    }

    // if (inputPasswordRef.current.value.length < 8) {
    //   toastError("Password needs to be at least 8 characters long")
    //   submittable = false
    // }

    if (submittable) {
      const response = await userResetPassword({
        resetPasswordToken: router.query.token,
        password: inputPasswordRef.current.value,
        passwordConfirmation: inputPasswordConfirmationRef.current.value,
      })

      if (response === "error") {
        toastError("An error occurred")
      } else {
        toastSuccess("Password reset successful!")
        router.push(`/login`)
      }
    }
  }

  function handleCheckboxChange(e) {
    if (e.target.checked) {
      inputPasswordRef.current.type = "text"
      inputPasswordConfirmationRef.current.type = "text"
    } else {
      inputPasswordRef.current.type = "password"
      inputPasswordConfirmationRef.current.type = "password"
    }
  }

  return (
    <form className="mx-auto pt-12 space-y-8 w-3/6">
      <div className="divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Let's Reset your password
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter a new password along with a password confirmation to reset
              your password
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
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={inputPasswordRef}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Password Confirmation
              </label>
              <div className="mt-1">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  ref={inputPasswordConfirmationRef}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="flex h-5 items-center">
            <input
              id="offers"
              aria-describedby="offers-description"
              name="offers"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="offers" className="font-medium text-gray-700">
              show password
            </label>
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
            Reset Password
          </button>
        </div>
      </div>
    </form>
  )
}
