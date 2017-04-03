import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import app from '../modules/app'

const Store = ({ children }) => {
  const store = createStore(
    app,
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default Store
