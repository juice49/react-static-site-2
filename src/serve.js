'use strict'

import { createServer } from 'http'
import { createReadStream } from 'fs'
import { join as pathJoin } from 'path'
import st from 'st'
import config from '../config'

const port = process.env.PORT || 1337
const publicPath = pathJoin('.', config.paths.public)
const indexPath = pathJoin(publicPath, 'index')

console.log(__dirname, publicPath, indexPath)

const mount = st({
  path: publicPath,
  url: '/',
  index: 'index',
  passthrough: true,
  cache: false // TODO: Only disbale in dev
})

createServer((req, res) => {
  mount(req, res, () => {
    const miss = createReadStream(indexPath)
    miss.pipe(res)
  })
}).listen(port)

console.log(`> Server listening at http://localhost:${port}`)
