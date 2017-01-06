const fetchContent = urn => new Promise((resolve, reject) => {
  System.import(`../content/${urn}`)
    .then(
      module => resolve(module.default),
      reject
    )
})

export default fetchContent
