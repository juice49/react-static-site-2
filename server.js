'use strict'

import React from 'react'
import { renderToString as render, renderToStaticMarkup } from 'react-dom/server'
import { ServerRouter as Router, createServerRenderContext } from 'react-router'
import fetchContent from './lib/fetch-content'
import { theme } from './theme-config'
import App from './components/app'

const context = createServerRenderContext()
const { Document } = theme
const uri = '/posts/hello-world'
const urn = 'hello-world'

fetchContent(urn).then(Content => {
  const app = render(
    <Router location={uri} context={context}>
      <App serverCache={{ [urn]: Content }} />
    </Router>
  )

  const html = renderToStaticMarkup(
    <Document>
      <div id='app' dangerouslySetInnerHTML={{ __html: app }} />
      <script src='/dist/index.js' />
    </Document>
  )

  console.log('hmmmmmm', html)
})
