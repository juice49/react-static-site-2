import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { /* cachePush, */ transition } from '../modules/app'
import { theme } from '../theme-config'
import fetchContent from '../lib/fetch-content'
import Loading from './loading'

const { NotFound } = theme
let cache = {}

const initialState = {
  fetching: false,
  previousPathname: null,
  pathname: null
}

class Content extends Component {

  constructor (props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    this.fetchContent(this.props.pathname, this.props.component)
    this.onTransition(this.props.pathname)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.onTransition(nextProps.pathname)
    }

    if (nextProps.pathname !== this.props.pathname) {
      this.fetchContent(nextProps.pathname, nextProps.component)
    }
  }

  onTransition (pathname) {
    this.props.dispatch(transition(pathname))
  }

  fetchContent (pathname, component) {
    const { dispatch/* , cache */ } = this.props
    const cached = cache[pathname]

    if (cached) {
      return Promise.resolve(cached)
    }

    if (isBundled(component)) {
      // dispatch(cachePush(pathname, component))
      cache[pathname] = component
      return Promise.resolve(component)
    }

    this.setState({ fetching: true })

    return fetchContent(pathname)
      .then(
        content => cache[pathname] = content,
        () => cache[pathname] = NotFound
      )
      .then(() => this.setState({
        fetching: false
      }))
  }

  render () {
    const { /* cache, */ pathname, previousPathname } = this.props
    console.log('cache', cache)
    const Content = this.props.component || cache[pathname] || cache[previousPathname] || Loading
    return <Content fetching={this.state.fetching} />
  }

}

Content.propTypes = {
  pathname: PropTypes.string.isRequired,
  component: PropTypes.any
}

const select = ({ previousUrl }) =>
  ({ previousPathname: previousUrl })

export default connect(select)(Content)

const isBundled = component =>
  typeof component !== 'undefined'
