import userReducers from './userReducer'
import photoReducer from './photosReducer'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    users: userReducers,
    photos: photoReducer
})

export default rootReducers