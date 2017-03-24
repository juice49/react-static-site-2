import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout'

const Index = ({ fetching }) => (
  <Layout fetching={fetching}>
    <h2>Posts</h2>
    {/* <Query source='posts' /> */}
    <ul>
      <li><Link to='/posts/hello-world/'>Hello, World!</Link></li>
      <li><Link to='/posts/foo/'>Foo</Link></li>
      <li><Link to='/posts/markdown/'>Markdown</Link></li>
    </ul>
  </Layout>
)

export default Index
