import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  table: require('./table.js').default,
})

export default rootReducer
