"use client"

import { signIn, signOut } from "next-auth/react"
import Link from "next/link"

export const LoginButton = () => {
  // return (
  //   <button style={{ marginRight: 10 }} onClick={() => signIn()}>
  //     Sign in
  //   </button>
  // )

  return (
    <Link
      href="/auth/signin"
      className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Log In
    </Link>
  )
}

export const RegisterButton = () => {
  return (
    <Link
      href="/auth/register"
      className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Register
    </Link>
  )
}

export const LogoutButton = () => {
  return (
    <button
      className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  )
}

export const ProfileButton = () => {
  // return <Link href="/profile">Profile</Link>
  return (
    <Link
      href="/profile-server"
      className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Profile
    </Link>
  )
  // return <Link href="/profile-with-middleware">Profile</Link>
}
