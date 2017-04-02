import React, { Component, PropTypes } from 'react'
import Route from './route'
import Switch from './switch'
import Content from './content'

export default class Query extends Component {

  render () {
    const { path } = this.props

    if (path) {
      return (
        <Switch>
          {/* <Route path={path} /> */}
          <Route path={`${path}/:urnOrPageNumber`} render={({ location, match }) => (
            <Content pathname={location.pathname} />
          )} />
        </Switch>
      )
    }
  }

}

Query.propTypes = {
  path: Route.propTypes.path,
  limit: PropTypes.number
}
