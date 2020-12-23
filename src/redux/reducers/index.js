import photoReducer from './photosReducer'
import canvasPhotoReducer from './addNewPhotoToCanvasReducer'
import changePhotoReducer from './changePhotoReducer'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    photos: photoReducer,
    canvasPhotos: canvasPhotoReducer,
    changePhotoOption: changePhotoReducer
})

export default rootReducers