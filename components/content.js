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
    this.fetchContent(this.props.urn)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.urn !== this.props.urn) {
      this.fetchContent(nextProps.urn)
    }
  }

  fetchContent (urn) {
    const { cache, contentDidLoad } = this.props
    const cached = cache[urn]

    if (cached) {
      return Promise.resolve(cached)
    }

    this.setState({ fetching: true })

    return fetchContent(urn)
      .then(
        Content => contentDidLoad(urn, Content),
        () => contentDidLoad(urn, NotFound)
      )
      .then(() => this.setState({
        fetching: false
      }))
  }

  render () {
    const { cache, urn } = this.props
    const Content = cache[urn] || Loading
    return <Content />
  }

}

Content.propTypes = {
  urn: PropTypes.string.isRequired,
  cache: PropTypes.object.isRequired,
  contentDidLoad: PropTypes.func.isRequired,
  Content: PropTypes.element
}
