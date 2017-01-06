import React, { Component, PropTypes } from 'react'
import fetchContent from '../lib/fetch-content'

export default class Content extends Component {

  componentWillMount () {
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

    return fetchContent(urn)
      .then(
        Content => contentDidLoad(urn, Content),
        () => contentDidLoad(urn, () => <div>NOT FOUND</div>)
      )
  }

  render () {
    const Content = this.props.cache[this.props.urn] || Loading
    return <Content />
  }

}

Content.propTypes = {
  urn: PropTypes.string.isRequired,
  cache: PropTypes.object.isRequired,
  contentDidLoad: PropTypes.func.isRequired,
  Content: PropTypes.element
}

const Loading = () => (
  <p>Loading&hellip;</p>
)
