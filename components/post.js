import React, { PropTypes } from 'react'
import Markdown from 'react-markdown'
import { theme } from '../theme-config'

const { Post: PostTheme } = theme

const Post = ({ markdown, title, tags, children }) => {
  return (
    <PostTheme {...{ title, tags }}>
      {markdown
        ? <Markdown source={children} />
        : children}
    </PostTheme>
  )
}

Post.propTypes = {
  title: PropTypes.string,
  markdown: PropTypes.bool
}

export default Post
