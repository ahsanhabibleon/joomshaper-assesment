import photoReducer from './photosReducer'
import canvasPhotoReducer from './addNewPhotoToCanvasReducer'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    photos: photoReducer,
    canvasPhotos: canvasPhotoReducer
})

export default rootReducers