const fetchContent = pathname => new Promise((resolve, reject) => {
  import(`../content${pathname.slice(0, -1)}`)
    .then(
      module => resolve(module.default),
      reject
    )
})

export default fetchContent
