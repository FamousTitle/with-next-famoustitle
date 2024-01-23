"use client"

import { createContext, useReducer, useContext } from "react"

const AppContext = createContext()

const TYPE_UPDATE = "TYPE_UPDATE"
const TYPE_REPLACE = "TYPE_REPLACE"

function reducer(state, action) {
  switch (action.type) {
    case TYPE_UPDATE: {
      return {
        ...state,
        ...action.data,
      }
    }
    case TYPE_REPLACE: {
      return {
        ...action.data,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function AppProvider(props) {
  const value = useReducer(reducer, {
    session: props.session,
    ...props.data,
  })

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

const useAppValue = () => useContext(AppContext)
export { useAppValue, TYPE_UPDATE, TYPE_REPLACE }

export default AppProvider
