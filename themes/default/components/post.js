import React from 'react'
import Layout from './layout'

const Post = ({ title, tags, children }) => (
  <Layout>
    <article style={style}>
      <h2>{title}</h2>
      {children}
      <Tags>{tags}</Tags>
    </article>
  </Layout>
)

export default Post

const style = {
  maxWidth: '34em'
}

const Tags = ({ children }) => children
  ? (
    <small>
      Tags:
      <ul>
        {children.map(tag =>
          <li key={tag}>{tag}</li>)}
      </ul>
    </small>
  )
  : null
