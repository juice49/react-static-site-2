import React, { Component, PropTypes } from 'react'
import { Route as ReactRouterRoute } from 'react-router-dom'

export default class Route extends Component {

  constructor (props) {
    super(props)

    if (process.env.KALOPSIA_INDEX && props.prerender && props.path) {
      process.stdout.write(`route: ${props.path}`)
    }
  }

  render () {
    const { prerender, ...props } = this.props

    return (
      <ReactRouterRoute {...props} />
    )
  }

}

Route.propTypes = {
  ...ReactRouterRoute.propTypes,
  prerender: PropTypes.bool
}

Route.defaultProps = {
  prerender: true
}
