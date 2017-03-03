import React from 'react'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => (
  <div style={style}>
    <h1><Link to='/'>Ash</Link></h1>
    {children}
    <footer>
      <small>Thanks for reading 😊.</small>
    </footer>
  </div>
)

export default Layout

const style = {
  fontFamily: '-apple-system, BlinkMacSystemFont',
  lineHeight: 1.45
}
