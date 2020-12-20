import userReducers from './userReducer'
import photoReducer from './photosReducer'
import canvasPhotoReducer from './addNewPhotoToCanvasReducer'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    users: userReducers,
    photos: photoReducer,
    canvasPhotos: canvasPhotoReducer
})

export default rootReducers