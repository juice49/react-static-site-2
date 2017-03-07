'use strict'

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import isNode from 'detect-node'
import { BrowserRouter as Router } from 'react-router-dom'
import fetchContent from './lib/fetch-content'
import app from './modules/app'
import App from './components/app'

const store = createStore(app)

const renderApp = cache => {
  render(
    <Provider store={store}>
      <Router>
        <App cache={cache} />
      </Router>
    </Provider>,
    document.getElementById('app')
  )
}

const isDynamic = !isNode && window.prerendered

if (isDynamic) {
  const { url, urn } = isDynamic
  fetchContent(urn)
    .then(Content => renderApp(
      { [url]: Content }
    ))
} else {
  renderApp()
}

if (module.hot) {
  module.hot.accept('./components/app', renderApp)
}
