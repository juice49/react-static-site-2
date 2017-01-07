'use strict'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router'
import App from './components/app'

const renderApp = () =>
  render(
    <Router>
      <App />
    </Router>,
    document.getElementById('app')
  )

renderApp()

if (module.hot) {
  module.hot.accept('./components/app', renderApp)
}
