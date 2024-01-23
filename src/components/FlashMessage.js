"use client"

import { useRef, useEffect } from "react"
import { useAppValue, TYPE_UPDATE } from "@/contexts/AppProvider"
import {
  toastSuccess,
  toastError,
  toastInfo,
  TYPE_SUCCESS,
  TYPE_ERROR,
  TYPE_INFO,
  showToast,
} from "@/components/Notification"

export const FlashMessage = () => {
  const initialized = useRef(false)
  const [state, dispatch] = useAppValue()

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true

      if (typeof state.flash !== "undefined" && state.flash !== null) {
        switch (state.flash.type) {
          case TYPE_SUCCESS: {
            toastSuccess(state.flash.message)
            break
          }
          case TYPE_ERROR: {
            toastError(state.flash.message)
            break
          }
          case TYPE_INFO: {
            toastInfo(state.flash.message)
            break
          }
          default: {
            showToast(state.flash.message)
          }
        }
        dispatch({ type: TYPE_UPDATE, data: { flash: null } })
      }
    }
  }, [])

  return <></>
}
