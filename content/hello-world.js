import React from 'react'
import { Link } from 'react-router'
import Post from '../components/post'

export default () => (
  <Post title='Hello, World!' tags={[ 'react', 'blog' ]}>
    <p>Lorem ipsum dolor sit amet.</p>
    <p><Link to='/posts/foo'>Foo</Link></p>
  </Post>
)
