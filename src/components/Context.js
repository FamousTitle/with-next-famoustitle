"use client"

import { useAppValue } from "@/contexts/AppProvider"

export const Context = () => {
  const [state, dispatch] = useAppValue()

  return (
    <>
      <div className="break-words italic">{JSON.stringify(state)}</div>
    </>
  )
}
