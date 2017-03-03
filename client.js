'use strict'

import React from 'react'
import { render } from 'react-dom'
import isNode from 'detect-node'
import { BrowserRouter as Router } from 'react-router-dom'
import fetchContent from './lib/fetch-content'
import App from './components/app'

const renderApp = cache => {
  render(
    <Router>
      <App cache={cache} />
    </Router>,
    document.getElementById('app')
  )
}

const isDynamic = !isNode && window.prerendered

if (isDynamic) {
  const urn = isDynamic
  fetchContent(urn)
    .then(Content => renderApp(
      { [urn]: Content }
    ))
} else {
  renderApp()
}

if (module.hot) {
  module.hot.accept('./components/app', renderApp)
}
