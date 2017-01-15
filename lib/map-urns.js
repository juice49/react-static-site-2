const mapUrns = () => Promise.resolve([
  {
    uri: '/posts/hello-world',
    urn: 'hello-world'
  },
  {
    uri: '/posts/foo',
    urn: 'foo'
  }
])

module.exports = mapUrns
