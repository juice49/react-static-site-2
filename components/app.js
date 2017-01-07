import React, { Component, PropTypes } from 'react'
import { Match, Miss } from 'react-router'
import { theme } from '../theme-config'
import Content from './content'

const { Index, NotFound } = theme

const initialState = {
  cache: {}
}

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = initialState
    this.cacheContent = this.cacheContent.bind(this)
  }

  cacheContent (urn, content) {
    this.setState(({ cache }) => ({
      cache: {
        ...cache,
        [urn]: content
      }
    }))
  }

  render () {
    return (
      <div>
        <Match pattern='/' exactly component={Index} />
        <Match pattern='/posts/:urn' render={({ params }) => (
          <Content
            cache={this.props.serverCache || this.state.cache}
            urn={params.urn}
            contentDidLoad={this.cacheContent}
          />
        )} />
        <Miss component={NotFound} />
      </div>
    )
  }

}

App.propTypes = {
  serverCache: PropTypes.object
}
