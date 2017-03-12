import React from 'react'
import { Link } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

const Layout = ({ children, fetching }) => (
  <div>
    <h1><Link to='/'>Ash</Link></h1>
    {children}
    <footer>
      <small>Thanks for reading 😊.</small>
    </footer>
    {fetching && (
      <Loader>Loading &hellip;</Loader>
    )}
  </div>
)

export default Layout

injectGlobal`
  body {
    font-family: -apple-system, BlinkMacSystemFont;
    line-height: 1.45;
  }
`

const Loader = styled.p`
  position: fixed;
  right: 1rem;
  top: 1rem;
`
