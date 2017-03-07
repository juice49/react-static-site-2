import React, { Component, PropTypes } from 'react'
import { theme } from '../theme-config'
import fetchContent from '../lib/fetch-content'
import Loading from './loading'

const { NotFound } = theme
const initialState = { fetching: null }

export default class Content extends Component {

  constructor (props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    if (!isBundled(this.props)) {
      this.fetchContent(this.props.url, this.props.urn)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.url !== this.props.url && !isBundled(nextProps)) {
      this.fetchContent(nextProps.url, nextProps.urn)
    }
  }

  fetchContent (url, urn) {
    const { cache, contentDidLoad } = this.props
    const cached = cache[url]

    if (cached) {
      return Promise.resolve(cached)
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
    const Content = this.props.component || cache[url] || Loading
    return <Content />
  }

}

Content.propTypes = {
  url: PropTypes.string.isRequired,
  urn: PropTypes.string,
  cache: PropTypes.object.isRequired,
  contentDidLoad: PropTypes.func.isRequired,
  component: PropTypes.any
}

const isBundled = ({ component }) =>
  typeof component !== 'undefined'
