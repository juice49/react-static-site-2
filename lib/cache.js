let _cache = {}

export const concat = cache => {
  _cache = {
    ..._cache,
    ...cache
  }
}

export const set = key => value => {
  _cache[key] = value
}

export const get = key =>
  typeof key === 'undefined'
    ? _cache
    : _cache[key]
