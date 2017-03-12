'use strict'

import { readdir, writeFile } from 'fs'
import { join as pathJoin, dirname } from 'path'
import mkdirp from 'mkdirp'
import React from 'react'
import { renderToString as render, renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter as Router } from 'react-router-dom'
import { styleSheet } from 'styled-components'
import config from './config'
import fetchContent from './lib/fetch-content'
import { theme } from './theme-config'
import App from './components/app'

const { Document } = theme

const paths = [
  {
    uri: '/posts/hello-world/',
    urn: 'hello-world'
  },
  {
    uri: '/posts/foo/',
    urn: 'foo'
  },
  {
    uri: '/posts/markdown/',
    urn: 'markdown'
  }
]

const fetchContentAndRenderPage = (uri, urn) => fetchContent(urn)
  .then(Content => renderPage(uri, urn, Content))

const renderPage = (uri, urn, Content) => {
  const cache = { [uri]: Content }

  const app = render(
    <Router initialEntries={[ uri ]} initialIndex={0}>
      <App cache={cache} />
    </Router>
  )

  let prerendered

  if (Content) {
    prerendered = <script dangerouslySetInnerHTML={{ __html: `window.prerendered = ${JSON.stringify({ url: uri, urn })}` }} />
  }

  const html = renderToStaticMarkup(
    <Document>
      <style>
        {styleSheet.getCSS()}
      </style>
      <div id='app' dangerouslySetInnerHTML={{ __html: app }} />
      {prerendered}
      <script src='/dist/index.js' />
    </Document>
  )

  return Promise.resolve({ uri, html })
}

const writePage = (uri, html) => {
  const dirname = uri === 'index'
    ? config.paths.public
    : pathJoin(config.paths.public, uri)

  const path = pathJoin(dirname, 'index.html')

  mkdirp(dirname, err => {
    if (err) {
      console.log(err)
      return
    }

    writeFile(path, html, err => {
      if (err) {
        console.log(err)
      }
    })
  })
}

const pages = paths.map(({ uri, urn }) =>
  fetchContentAndRenderPage(uri, urn))

Promise.all(pages)
  .then(renderedPages => {
    renderedPages.forEach(({ uri, html }) =>
      writePage(uri, html))
  })

renderPage('/')
  .then(({ html }) => writePage('index', html))
