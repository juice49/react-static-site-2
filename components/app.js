import React, { Component } from 'react'
import { BrowserRouter as Router, Match, Miss } from 'react-router'
import { theme } from '../theme-config'
import Content from './content'

const { Index: IndexTheme } = theme

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
      <Router>
        <div>
          <Match pattern='/' exactly component={IndexTheme} />
          <Match pattern='/posts/:urn' render={({ params }) => (
            <Content
              cache={this.state.cache}
              urn={params.urn}
              contentDidLoad={this.cacheContent}
            />
          )} />
          <Miss render={() => <div>not found</div>} />
        </div>
      </Router>
    )
  }

}
