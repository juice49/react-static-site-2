'use strict'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router'
import { withAsyncComponents } from 'react-async-component'
import App from './components/app'

const renderApp = () => {
  const app = (
    <Router>
      <App />
    </Router>
  )

  withAsyncComponents(app)
    .then(({ appWithAsyncComponents }) => {
      render(appWithAsyncComponents, document.getElementById('app'))
    })
}

renderApp()

if (module.hot) {
  module.hot.accept('./components/app', renderApp)
}
