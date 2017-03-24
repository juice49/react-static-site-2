import React, { PropTypes } from 'react'
import { theme } from '../theme-config'

const { Post: PostTheme } = theme

const List = ({ title }) => {
  return (
    <PostTheme title={title} />
  )
}

List.propTypes = {
  title: PropTypes.string
}

export default List
