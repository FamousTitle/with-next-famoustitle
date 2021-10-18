import { createContext, useReducer, useContext } from "react"

const StoreContext = createContext()

const TYPE_UPDATE = "TYPE_UPDATE"

function reducer(state, action) {
  switch (action.type) {
    case TYPE_UPDATE: {
      return {
        ...state,
        ...action.data,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function StoreProvider(props) {
  const value = useReducer(reducer, {
    session: props.session,
    ...props.data,
  })

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  )
}

const useStoreValue = () => useContext(StoreContext)
export { useStoreValue, TYPE_UPDATE }

export default StoreProvider
