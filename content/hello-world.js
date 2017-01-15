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
    <p>I think we're going to need separate bundles to solve this.</p>
    <p>This is a little less convenient than using the `import()` approach, but
      the outcome will be the same: one file that contains most of our app,
      shared by multiple files that represent each URN.</p>
    <p>One nice things is that this allows us to avoid a webpack bug in which
      modules fetched using `import()` do not work with HMR.</p>
  </Post>
)
