import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const GlobalStateContext = createContext([])
const GlobalDispatchContext = createContext(null)

export function GlobalProvider({ children }) {
  const [users, dispatch] = useReducer(usersReducer, initialUsers)

  return (
    <GlobalStateContext.Provider value={users}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export function useUsers() {
  return useContext(GlobalStateContext)
}

export function useUsersDispatch() {
  return useContext(GlobalDispatchContext)
}

function usersReducer(state, action) {
  const { type, data } = action
  switch (type) {
    case 'SET_USER_LIST': {
      return data
    }
    default:
      return state
  }
}

const initialUsers = []

GlobalProvider.propTypes = {
  children: PropTypes.node,
}
