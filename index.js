'use strict'

import { Bar } from './components'

System.import('./foo')
  .then(foo => console.log(foo.default()))
