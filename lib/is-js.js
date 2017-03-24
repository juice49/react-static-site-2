import { extname } from 'path'

const isJS = path =>
  extname(path) === '.js'

export default isJS
