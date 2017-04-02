import React, { Component, PropTypes } from 'react'
// import { Link } from 'react-router-dom'
// import isNumber from 'is-number'
import { theme } from '../theme-config'
import Content from './content'
// import List from './list'
import Route from './route'
import Switch from './switch'
import Query from './query'

const { Index, NotFound } = theme

class App extends Component {

  render () {
    return (
      <div>
        <Route path='/' prerender={false} render={({ location }) => (
          <div>
            <p>Path: {location.pathname}</p>
            {/* <p><Link to='/'>Home</Link></p>
            <p><Link to='/foo'>Foo</Link></p>
            <p><Link to='/bar'>Bar</Link></p> */}
          </div>
        )} />
        <Switch>
          <Route path='/' exact render={({ match }) => (
            <Content
              pathname='/'
              component={Index}
            />
          )} />
          <Query path='/posts' source='posts' limit={5} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }

}

export default App
