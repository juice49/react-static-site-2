import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../../components/post'

export default () => (
  <Post title='Hello, World!' tags={[ 'react', 'blog' ]}>
    <h2>Loading Content</h2>
    <p>
      Loading content is remarkably easy thanks to webpack's implementation of
      the upcoming JavaScript `import()` function—a way to dynamically
      import modules.
    </p>
    <p>
      This can be used both on the server and the client, providing a
      universal way to fetch the component needed to render a page.
    </p>
    <p>
      For a while I battled a problem with prerendering lazy components.
    </p>
    <p>
      Posts and pages are lazily loaded using `import()`, but I wanted the
      the server rendered page to include the post. So the server loads the
      lazy component before rendering it to HTML.
    </p>
    <p>
      The problem is that when React renders on the client, the lazy component
      has not yet loaded, and so the HTML output does not match the prerendered
      HTML.
    </p>
    <p>
      I spent some time trying to figure out how to serialize the component and
      pass it to the client in a script tag to no avail. I thought I might have
      to create a bundle for every entrypoint.
    </p>
    <p>
      Another possible solution was to grab the rendered HTML from the DOM and
      pass it back through the React component, but this didn't really work.
    </p>
    <p>
      I found the solution in a React Router example, and it was simpler than I
      had imagined. The React app must wait for its lazy dependencies to load
      before it renders, so that when it does render, its output matches that
      of the server.
    </p>
    <p>
      In the React Router example, a check for a dynamic router is executed
      outside of the React app using the `match()` function. This would require
      that I duplicate routing logic. Instead I flagged this pages using a
      global variable inserted into a script tag to indicate the lazy component
      required to render the page.
    </p>
    <p><Link to='/posts/foo/'>Foo</Link></p>
  </Post>
)
