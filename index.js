'use strict'

import React from 'react'
import { render } from 'react-dom'
import Bar from './components'

const renderApp = () =>
  render(<Bar />, document.getElementById('app'))

renderApp()

if (module.hot) {
  module.hot.accept('./components', renderApp)
}
