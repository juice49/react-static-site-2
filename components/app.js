import React, { Component, PropTypes } from 'react'
import { Match, Miss } from 'react-router'
import { createAsyncComponent } from 'react-async-component'
import { theme } from '../theme-config'
import fetchContent from '../lib/fetch-content'
import Content from './content'

const { Index, NotFound } = theme

const initialState = {
  cache: {}
}

/*const urn = 'hello-world';
const Async = createAsyncComponent({
  resolve: () => import(`../content/${urn}`),
  Loading: () => <div>~ ~ L O A D I N G ~ ~</div>
})*/
const async = urn => createAsyncComponent({
  resolve: () => import(`../content/${urn}`),
  Loading: () => <div>~ ~ L O A D I N G ~ ~</div>
})
const Async = async('foo')

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = initialState
    //this.cacheContent = this.cacheContent.bind(this)
  }

  render () {
    return (
      <div>
        <Match pattern='/' exactly component={Index} />
        <Match pattern='/posts/:urn' component={Async} />
        {/*<Match pattern='/posts/:urn' render={({ params }) => {
          const Async = createAsyncComponent({
            //resolve: () => fetchContent(params.urn)
            //resolve: () => Promise.resolve(() => <div>foo</div>),
            resolve: () => import('../content/foo'),
            Loading: () => <div>~ ~ L O A D I N G ~ ~</div>
          })
          return <Async />
        }} />*/}
        <Miss component={NotFound} />
      </div>
    )
  }

}
