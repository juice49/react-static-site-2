'use strict'

import { readdir, writeFile } from 'fs'
import { join as pathJoin, dirname } from 'path'
import mkdirp from 'mkdirp'
import serialize from 'serialize-javascript'
import React from 'react'
import { renderToString as render, renderToStaticMarkup } from 'react-dom/server'
import { withAsyncComponents, createAsyncComponent } from 'react-async-component';
import { ServerRouter as Router, createServerRenderContext } from 'react-router'
import config from './config'
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

const Async = createAsyncComponent({
  resolve: () => import(`./content/foo`),
  Loading: () => <div>~ ~ L O A D I N G ~ ~</div>
})

const renderPage = (uri, urn) => {
  /*const app = (
    <Router location={uri} context={context}>
      <App />
    </Router>
  )*/

  const app = () => (
    <div>

    </div>
  )

  return new Promise((resolve, reject) => {
    withAsyncComponents(app)
      .then(({ appWithAsyncComponents, state, STATE_IDENTIFIER }) => {
        const html = renderToStaticMarkup(
          <Document>
            <div id='app' dangerouslySetInnerHTML={{ __html: render(appWithAsyncComponents) }} />
            <script dangerouslySetInnerHTML={{ __html: `window.${STATE_IDENTIFIER} = ${serialize(state)}` }} />
            <script src='/dist/index.js' />
          </Document>
        )

        resolve({ uri, html })
      })
  })
}

const writePage = (uri, html) => {
  const path = `${pathJoin(config.paths.public, uri)}`
  mkdirp(dirname(path))
  writeFile(path, html, err => {
    if (err) {
      console.error(err)
    }
  })
}

const pages = paths.map(({ uri, urn }) =>
  renderPage(uri, urn))

Promise.all(pages)
  .then(renderedPages => {
    renderedPages.forEach(({ uri, html }) =>
      writePage(uri, html))
  })

renderPage('/', 'index')
  .then(({ html }) => writePage('index', html))
