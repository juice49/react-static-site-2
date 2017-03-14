const fetchContent = urn => new Promise((resolve, reject) => {
  import(`../content/posts/${urn}`)
    .then(
      module => resolve(module.default),
      reject
    )
})

export default fetchContent
