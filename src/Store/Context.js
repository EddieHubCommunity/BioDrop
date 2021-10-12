import React from 'react'
import PropTypes from 'prop-types'

const GlobalStateContext = React.createContext([])
const GlobalDispatchContext = React.createContext(null)

// Actions
const SET_USER_LIST = 'SET_USER_LIST'

// Reducer
const reducer = (state, action) => {
  const { type, data } = action
  switch (type) {
    case SET_USER_LIST: {
      return data
    }
    default:
      return state
  }
}

function GlobalState(props) {
  const { initialState, dispatch } = props
  return (
    <GlobalStateContext.Provider value={initialState}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {props.children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}
GlobalState.propTypes = {
  initialState: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default GlobalState
export { GlobalStateContext, GlobalDispatchContext, SET_USER_LIST, reducer }
