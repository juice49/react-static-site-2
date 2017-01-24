import React from 'react'
import { Link } from 'react-router'
import Layout from './layout'

const Index = () => (
  <Layout>
    <h2>Posts</h2>
    <ul>
      <li><Link to='/posts/hello-world'>Hello, World!</Link></li>
      <li><Link to='/posts/foo'>Foo</Link></li>
      <li><Link to='/posts/markdown'>Markdown</Link></li>
    </ul>
  </Layout>
)

export default Index
