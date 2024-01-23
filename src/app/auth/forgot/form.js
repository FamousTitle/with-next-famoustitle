"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { toastSuccess } from "@/components/Notification"
import Link from "next/link"

export default function Login() {
  let [loading, setLoading] = useState(false)
  let [formValues, setFormValues] = useState({
    email: "",
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn("email", {
        email: formValues.email,
        redirect: false,
        callbackUrl: "/", // or /profile so they can change their password
      })
    } catch (e) {}

    // either way, just say email sent
    toastSuccess(
      "A magic link has been sent to that email! Please check your inbox."
    )

    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formValues.email}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm leading-6">
            <Link
              href="/auth/signin"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Return to Log In
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Loading..." : "Send Magic Link"}
          </button>
        </div>
      </form>

      <div className="relative mt-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
      </div>
    </>
  )
}
