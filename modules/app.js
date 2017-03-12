const initialState = {
  url: null,
  previousUrl: null
}

const TRANSITION = 'reactStaticSite/app/TRANSITION'

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case TRANSITION:
      return {
        previousUrl: state.url,
        url: action.payload
      }
  }
  return state
}

export const transition = url => ({
  type: TRANSITION,
  payload: url
})
