import React, { Component, PropTypes } from 'react'
import { Route, Switch } from 'react-router-dom'
import { theme } from '../theme-config'
import Content from './content'

const { Index, NotFound } = theme
const initialState = { cache: {} }

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = initialState
    this.contentDidLoad = this.contentDidLoad.bind(this)
    this.appendCache = this.appendCache.bind(this)
  }

  componentWillMount () {
    this.mergeCache(this.props.cache)
  }

  contentDidLoad (url, content) {
    this.appendCache(url, content)
  }

  mergeCache (nextCache) {
    this.setState(({ cache }) => ({
      cache: {
        ...cache,
        ...nextCache
      }
    }))
  }

  appendCache (url, content) {
    this.setState(({ cache }) => ({
      cache: {
        ...cache,
        [url]: content
      }
    }))
  }

  render () {
    return (
      <Switch>
        {/* <Route path='/' exact component={Index} /> */}
        <Route path='/' exact render={({ match }) => (
          <Content
            cache={this.state.cache}
            url={match.url}
            component={Index}
            contentDidLoad={this.contentDidLoad}
          />
        )} />
        <Route path='/posts/:urn' render={({ match }) => (
          <Content
            cache={this.state.cache}
            url={match.url}
            urn={match.params.urn}
            contentDidLoad={this.contentDidLoad}
          />
        )} />
        <Route component={NotFound} />
      </Switch>
    )
  }

}

App.propTypes = {
  cache: PropTypes.object
}
