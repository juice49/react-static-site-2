const initialState = {
  url: null,
  previousUrl: null
}

const TRANSITION = 'kalopsia/app/TRANSITION'

export default function reducer (state = initialState, action) {
  console.log(action.type, action.payload)
  switch (action.type) {
    case TRANSITION:
      return {
        ...state,
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
