import React from 'react'
import { Link } from 'react-router'
import Post from '../components/post'

export default () => (
  <Post title='Foo' tags={[ 'test', 'foo' ]}>
    <p>Foo foo foo foo foo foo bar.</p>
    <p><Link to='/posts/hello-world'>Hello, World!</Link></p>
  </Post>
)
