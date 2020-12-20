import * as actions from './actionTypes'

export const addNewPhotoToCanvas = (imgSrc, id) => {
    return {
        type: actions.ADD_NEW_PHOTO_TO_CANVAS,
        payload: {
            imgSrc, id
        }
    }
}

export const removePhotoFromCanvas = (id) => {
    return {
        type: actions.REMOVE_PHOTO_FROM_CANVAS,
        payload: {
            id
        }
    }
}

