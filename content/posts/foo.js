import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../../components/post'

export default () => (
  <Post title='Foo' tags={[ 'test', 'foo' ]}>
    <p>Foo bar.</p>
    <p><Link to='/posts/hello-world/'>Hello, World!</Link></p>
  </Post>
)
