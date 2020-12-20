import * as actions from '../actions/actionTypes'
const canvasPhotoReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_NEW_PHOTO_TO_CANVAS:
            return [
                ...state,
                {
                    id: action.payload.id,
                    imgSrc: action.payload.imgSrc
                }
            ]

        case actions.REMOVE_PHOTO_FROM_CANVAS:
            return state.filter(photo => photo.id !== action.payload.id)

        default:
            return state
    }
}

export default canvasPhotoReducer