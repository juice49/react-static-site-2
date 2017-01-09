import React, { Component, PropTypes } from 'react'
import isNode from 'detect-node'
import { theme } from '../theme-config'
import fetchContent from '../lib/fetch-content'
import Loading from './loading'

const { NotFound } = theme

export default class Content extends Component {

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

    /* if (!isNode && window.prerendered && window.prerendered === urn) {
      return Promise.resolve()
    } */

    if (cached) {
      return Promise.resolve(cached)
    }

    return fetchContent(urn)
      .then(
        Content => contentDidLoad(urn, Content),
        () => contentDidLoad(urn, NotFound)
      )
  }

  render () {
    const Content = this.props.cache[this.props.urn] || Loading
    //return <Content />

    // Let's try and work around the "Warning: React attempted to reuse markup in a container but the checksum was invalid." problem.
    // This way we still get the warning, but we do avoid the app re-entering the
    // loading state when it mounts in the browser.
    //
    // This doesn't actually work, because React doesn't rehydrate content set
    // using dangerouslySetInnerHTML. For example, event listeners won't be added.
    //
    // We need a way to actually ready the cache with the loaded component...
    //
    // Each endpoint might need its own bundle to achieve this, because attempts
    // at assigning the cache to window have been unsuccessful. This cache
    // can't access the internal module vars created by webpack.

    /* if (isNode) {
      return (
        <div id='js-prerendered-content'>
          <Content />
        </div>
      )
    }

    const prerendered = document.getElementById('js-prerendered-content')

    if (prerendered) {
      console.log('prerendered', prerendered.innerHTML)
      return (
        <div id='js-prerendered-content' dangerouslySetInnerHTML={{ __html: prerendered.innerHTML }} />
      )
    } */

    return <Content />
  }

}

Content.propTypes = {
  urn: PropTypes.string.isRequired,
  cache: PropTypes.object.isRequired,
  contentDidLoad: PropTypes.func.isRequired,
  Content: PropTypes.element
}
