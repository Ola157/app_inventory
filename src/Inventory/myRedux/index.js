import { applyMiddleware, createStore } from 'redux'
import myReducer from './reducer'
import thunk from 'redux-thunk'
let inventory = createStore(myReducer, applyMiddleware(thunk))
export default inventory;