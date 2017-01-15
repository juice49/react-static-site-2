import React from 'react'
import { Link } from 'react-router'
import Post from '../components/post'

export default () => (
  <Post title='Hello, World!' tags={[ 'react', 'blog' ]}>
    <h2>Loading Content</h2>
    <p>Loading content is remarkably easy thanks to webpack's implementation of
      the upcoming JavaScript `import()` function—a way to dynamically
      import modules.</p>
    <p>This can be run both on the server and the client, providing a
      universal way to fetch the component needed to render a page. And it
      seems to work really well... the only problem is, it doesn't.</p>
  </Post>
)
