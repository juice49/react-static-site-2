import React from 'react'
import Layout from './layout'

const NotFound = ({ fetching }) => (
  <Layout fetching={fetching}>
    <h2>Sorry, that doesn't seem to exist</h2>
  </Layout>
)

export default NotFound
