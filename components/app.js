import React, { Component, PropTypes } from 'react'
import { Route, Switch } from 'react-router-dom'
import isNumber from 'is-number'
import { theme } from '../theme-config'
import Content from './content'
import List from './list'

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
      <div>
        <Route path='/' render={({ location }) => (
          <div>Path: {location.pathname}</div>
        )} />
        <Switch>
          <Route path='/' exact render={({ match }) => (
            <Content
              cache={this.state.cache}
              pathname='/'
              component={Index}
              contentDidLoad={this.contentDidLoad}
            />
          )} />
          { /*<Route path='/:collection/tags' exact render={({ location, match }) => {
            return (
              <div>Tags for {match.params.collection}.</div>
            )
          }} />
          <Route path='/:collection/tags/:urnOrPageNumber' render={({ location, match }) => {
            if (isNumber(match.params.urnOrPageNumber)) {
              return (
                <div>Tags for {match.params.collection}. Page {match.params.urnOrPageNumber}.</div>
              )
            }
            return (
              <Switch>
                <Route path={match.url} exact render={({ location }) => (
                  <PostsByTag
                    tag={match.params.urnOrPageNumber}
                    collection={match.params.collection}
                    pathname={location.pathname}
                    cache={this.state.cache}
                    contentDidLoad={this.contentDidLoad}
                  />
                )} />
                <Route path={`${match.url}/:pageNumber`} exact render={({ match: subMatch, location }) => (
                  <PostsByTag
                    tag={match.params.urnOrPageNumber}
                    collection={match.params.collection}
                    pageNumber={subMatch.params.pageNumber}
                    pathname={location.pathname}
                    cache={this.state.cache}
                    contentDidLoad={this.contentDidLoad}
                  />
                )} />
              </Switch>
            )
          }} />
          <Route path='/:collection/:urnOrPageNumber' render={({ location, match }) => {
            return (
              <Content
                cache={this.state.cache}
                pathname={location.pathname}
                contentDidLoad={this.contentDidLoad}
              />
            )
          }} />
          <Route component={NotFound} />*/ }
        </Switch>
      </div>
    )
  }

}

App.propTypes = {
  cache: PropTypes.object
}

const PostsByTag = ({ tag, collection, pageNumber, pathname, cache, contentDidLoad }) => (
  <div>
    hello
    <Content
      cache={cache}
      pathname={pathname}
      component={() => <List title={`Posts tagged with ${tag} in ${collection}. Page ${pageNumber}.`} />}
      contentDidLoad={contentDidLoad}
      list
    />
  </div>
)

PostsByTag.defaultProps = {
  pageNumber: 1
}
