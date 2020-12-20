import * as actions from './actionTypes'

export const addNewPhotoToCanvas = (imgSrc) => {
    return {
        type: actions.ADD_NEW_PHOTO_TO_CANVAS,
        payload: {
            imgSrc
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

