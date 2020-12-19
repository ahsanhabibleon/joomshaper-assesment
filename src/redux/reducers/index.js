import counterReducer from './counter'
import Todos from './todos'
import Users from './users'
import loggedInReducer from './isLogged'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    counter: counterReducer,
    loggedIn: loggedInReducer,
    todos: Todos,
    users: Users
})

export default rootReducers