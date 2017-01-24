import React from 'react'
import Post from '../components/post'

export default () => (
  <Post title='Markdown' tags={[ 'markdown', 'test' ]} markdown>
    Hello, I am markdown.
  </Post>
)
