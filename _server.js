'use strict'

import { readdir, writeFile } from 'fs'
import { join as pathJoin, dirname } from 'path'
import mkdirp from 'mkdirp'
import React from 'react'
import { renderToString as render, renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter as Router } from 'react-router-dom'
import { styleSheet } from 'styled-components'
import config from './config'
import mapContent from './lib/map-content'
import fetchContent from './lib/fetch-content'
import { set as cacheSet } from './lib/cache'
import { theme } from './theme-config'
import App from './components/app'
import Store from './components/store'

const { Document } = theme

const fetchContentAndRenderPage = pathname => fetchContent(pathname)
  .then(Content => renderPage(pathname, Content))

const renderPage = (pathname, Content) => {
  cacheSet(pathname)(Content)

  const app = render(
    <Store>
      <Router initialEntries={[ pathname ]} initialIndex={0}>
        <App />
      </Router>
    </Store>
  )

  let prerendered

  if (Content) {
    prerendered = (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.prerendered = ${JSON.stringify({ url: pathname })}`
        }}
      />
    )
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

  return Promise.resolve({ pathname, html })
}

const writePage = (pathname, html) => {
  const dirname = pathname === '/'
    ? config.paths.public
    : pathJoin(config.paths.public, pathname)

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

mapContent(config.paths.content)(item => {
  fetchContentAndRenderPage(item.path)
    .then(({ pathname, html }) => {
      writePage(pathname, html)
    })
})

renderPage('/')
  .then(({ html }) => writePage('/', html))
