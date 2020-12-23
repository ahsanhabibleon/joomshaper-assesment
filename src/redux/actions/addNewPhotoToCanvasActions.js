import * as actions from './actionTypes'

export const addNewPhotoToCanvas = (imgSrc, imgIndex) => {
    return {
        type: actions.ADD_NEW_PHOTO_TO_CANVAS,
        payload: {
            imgSrc, imgIndex
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
export const replaceImgSrc = (targetImgUrl, srcImgUrl) => {
    return {
        type: actions.REPLACE_IMG_SRC,
        payload: {
            targetImgUrl, srcImgUrl
        }
    }
}
export const changeFilter = (payload, filterType, imgIndex) => {
    return {
        type: actions.CHANGE_FILTER,
        payload: {
            payload, filterType, imgIndex
        }
    }
}
export const _handleChangePhoto = (changePhotostatus, imgSrc) => {
    return {
        type: actions.HANDLE_CHANGE_PHOTO,
        payload: {
            status: changePhotostatus,
            imgSrc: imgSrc
        }
    }
}

