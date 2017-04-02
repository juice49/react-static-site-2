'use strict'

import React from 'react'
import { renderToString as render } from 'react-dom/server'
import { MemoryRouter as Router } from 'react-router-dom'
import App from './components/app'

render(
  <Router>
    <App />
  </Router>
)
