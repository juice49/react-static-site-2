import React, { Component, PropTypes } from 'react'
import { theme } from '../theme-config'
import fetchContent from '../lib/fetch-content'
import Loading from './loading'

const { NotFound } = theme

const initialState = {
  fetching: false,
  previousUrl: null,
  url: null
}

export default class Content extends Component {

  constructor (props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    this.fetchContent(this.props.url, this.props.urn, this.props.component)
    this.onTransition(this.props.url)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.url !== this.props.url) {
      this.onTransition(nextProps.url)
    }

    if (nextProps.url !== this.props.url) {
      this.fetchContent(nextProps.url, nextProps.urn, nextProps.component)
    }
  }

  onTransition (url) {
    this.setState(state => ({
      previousUrl: state.url,
      url
    }))
  }

  fetchContent (url, urn, component) {
    const { cache, contentDidLoad } = this.props
    const cached = cache[url]

    if (cached) {
      return Promise.resolve(cached)
    }

    if (isBundled(component)) {
      contentDidLoad(url, component)
      return Promise.resolve(component)
    }

    this.setState({ fetching: true })

    return fetchContent(urn)
      .then(
        Content => contentDidLoad(url, Content),
        () => contentDidLoad(url, NotFound)
      )
      .then(() => this.setState({
        fetching: false
      }))
  }

  render () {
    const { cache, url } = this.props
    const { previousUrl } = this.state
    const Content = this.props.component || cache[url] || cache[previousUrl] || Loading
    return <Content fetching={this.state.fetching} />
  }

}

Content.propTypes = {
  url: PropTypes.string.isRequired,
  urn: PropTypes.string,
  cache: PropTypes.object.isRequired,
  contentDidLoad: PropTypes.func.isRequired,
  component: PropTypes.any
}

const isBundled = component =>
  typeof component !== 'undefined'
