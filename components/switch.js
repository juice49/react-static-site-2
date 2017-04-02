import { Switch as ReactRouterSwitch } from 'react-router-dom'

const Switch = process.env.KALOPSIA_INDEX
  ? 'div'
  : ReactRouterSwitch

export default Switch
