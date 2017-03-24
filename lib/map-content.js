import { join } from 'path'
import klaw from 'klaw'
import through2 from 'through2'
import isJS from './is-js'

const mapContent = path => callback => {
  const dirname = join(process.cwd(), path)

  return klaw(path)
    .pipe(through2.obj(function (chunk, enc, next) {
      if (isJS(chunk.path)) {
        chunk.path = chunk.path.replace(dirname, '')
        chunk.path = chunk.path.replace('.js', '/')
        this.push(chunk)
      }
      next()
    }))
    .on('data', callback)
}

export default mapContent
