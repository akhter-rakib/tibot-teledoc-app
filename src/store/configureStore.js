import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import authReducer from '../reducers/authReducer'
import uiReducer from '../reducers/uiReducer'

export default () => {
  const store = createStore(combineReducers({
    authReducer,
    uiReducer
  }), composeWithDevTools())
  return store
}
