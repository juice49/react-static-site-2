'use strict'

import React from 'react'
import { renderToString as render } from 'react-dom/server'
import { MemoryRouter as Router } from 'react-router-dom'
import App from './components/app'
import Store from './components/store'

render(
  <Store>
    <Router>
      <App />
    </Router>
  </Store>
)
