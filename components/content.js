import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { transition } from '../modules/app'
import { theme } from '../theme-config'
import fetchContent from '../lib/fetch-content'
import * as cache from '../lib/cache'
import Loading from './loading'

const { NotFound } = theme

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
    const cached = cache.get(pathname)

    if (cached) {
      return Promise.resolve(cached)
    }

    if (isBundled(component)) {
      cache.set(pathname)(component)
      return Promise.resolve(component)
    }

    this.setState({ fetching: true })

    return fetchContent(pathname)
      .then(
        content => cache.set(pathname)(content),
        () => cache.set(pathname)(NotFound)
      )
      .then(() => this.setState({
        fetching: false
      }))
  }

  render () {
    const { pathname, previousPathname } = this.props
    console.log('cache', cache.get())
    const Content = this.props.component || cache.get(pathname) || cache.get(previousPathname) || Loading
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
