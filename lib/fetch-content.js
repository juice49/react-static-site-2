const fetchContent = urn => new Promise((resolve, reject) => {
  import(`../content/${urn}`)
    .then(
      module => resolve(module.default),
      reject
    )
})

export default fetchContent
