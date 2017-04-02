'use strict'

import React from 'react'
import { render } from 'react-dom'
import isNode from 'detect-node'
import { BrowserRouter as Router } from 'react-router-dom'
import fetchContent from './lib/fetch-content'
import App from './components/app'
import Store from './components/store'

const renderApp = cache => {
  render(
    <Store cache={cache}>
      <Router>
        <App />
      </Router>
    </Store>,
    document.getElementById('app')
  )
}

const isDynamic = !isNode && window.prerendered

if (isDynamic) {
  const { url } = isDynamic
  fetchContent(url)
    .then(Content => renderApp(
      { [url]: Content }
    ))
} else {
  renderApp()
}

if (module.hot) {
  module.hot.accept('./components/app', renderApp)
}
