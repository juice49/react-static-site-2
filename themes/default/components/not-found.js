import isNode from 'detect-node'
import React from 'react'
import Layout from './layout'

let Boot

if (!isNode) {
  console.log(1, window.Boot)
  eval(window.Boot)
  console.log(2, window.b)
  Boot = window.b()()
  console.log(3, Boot)
  console.log('hmmm', Boot)
}

const NotFound = () => (
  <Layout>
    <h2>Sorry, that doesn't seem to exist</h2>
    {!isNode && <Boot />}
  </Layout>
)

export default NotFound
