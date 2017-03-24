import React, { Component, PropTypes } from 'react'
import { theme } from '../theme-config'
import fetchContent from '../lib/fetch-content'
import Loading from './loading'

const { NotFound } = theme

const initialState = {
  fetching: false,
  previousPathname: null,
  pathname: null
}

export default class Content extends Component {

  constructor (props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    this.fetchContent(this.props.pathname, this.props.component, this.props.list)
    this.onTransition(this.props.pathname)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.onTransition(nextProps.pathname)
    }

    if (nextProps.pathname !== this.props.pathname) {
      this.fetchContent(nextProps.pathname, nextProps.component, nextProps.list)
    }
  }

  onTransition (pathname) {
    this.setState(state => ({
      previousPathname: state.pathname,
      pathname
    }))
  }

  fetchContent (pathname, component, list) {
    const { cache, contentDidLoad } = this.props
    const cached = cache[pathname]

    if (cached) {
      return Promise.resolve(cached)
    }

    if (isBundled(component)) {
      contentDidLoad(pathname, component)
      return Promise.resolve(component)
    }

    this.setState({ fetching: true })

    /* if (list) {
      console.log('fetch list')
      fetchList(pathname)
    } */

    return fetchContent(pathname)
      .then(
        Content => contentDidLoad(pathname, Content),
        () => contentDidLoad(pathname, NotFound)
      )
      .then(() => this.setState({
        fetching: false
      }))
  }

  render () {
    const { cache, pathname } = this.props
    const { previousPathname } = this.state
    const Content = this.props.component || cache[pathname] || cache[previousPathname] || Loading
    return <Content fetching={this.state.fetching} />
  }

}

Content.propTypes = {
  pathname: PropTypes.string.isRequired,
  cache: PropTypes.object.isRequired,
  contentDidLoad: PropTypes.func.isRequired,
  component: PropTypes.any,
  list: PropTypes.bool
}

const isBundled = component =>
  typeof component !== 'undefined'
