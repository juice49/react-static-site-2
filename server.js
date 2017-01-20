'use strict'

import { readdir, writeFile } from 'fs'
import { join as pathJoin, dirname } from 'path'
import mkdirp from 'mkdirp'
import React from 'react'
import { renderToString as render, renderToStaticMarkup } from 'react-dom/server'
import { ServerRouter as Router, createServerRenderContext } from 'react-router'
import config from './config'
import fetchContent from './lib/fetch-content'
import { theme } from './theme-config'
import App from './components/app'

const context = createServerRenderContext()
const { Document } = theme

const paths = [
  {
    uri: '/posts/hello-world',
    urn: 'hello-world'
  },
  {
    uri: '/posts/foo',
    urn: 'foo'
  }
]

const fetchContentAndRenderPage = (uri, urn) => fetchContent(urn)
  .then(Content => renderPage(uri, urn, Content))

const renderPage = (uri, urn, Content) => {
  const initialCache = { [urn]: Content }

  const app = render(
    <Router location={uri} context={context}>
      <App serverCache={initialCache} />
    </Router>
  )

  const html = renderToStaticMarkup(
    <Document>
      <div id='app' dangerouslySetInnerHTML={{ __html: app }} />
      <script src='/dist/index.js' />
    </Document>
  )

  return Promise.resolve({ uri, html })
}

/* <script dangerouslySetInnerHTML={{ __html: `
  window.prerendered = '${urn}'
  window.test = function() { return ${Content} }
` }} /> */

const writePage = (uri, html) => {
  const path = `${pathJoin(config.paths.public, uri)}.html`
  mkdirp(dirname(path))
  writeFile(path, html, err => {
    if (err) {
      console.error(err)
    }
  })
}

const pages = paths.map(({ uri, urn }) =>
  fetchContentAndRenderPage(uri, urn))

Promise.all(pages)
  .then(renderedPages => {
    renderedPages.forEach(({ uri, html }) =>
      writePage(uri, html))
  })

renderPage('/', 'index')
  .then(({ html }) => writePage('index', html))
