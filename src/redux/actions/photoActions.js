import * as actions from './actionTypes'
import axios from 'axios'

export const fetchPhotoRequest = () => {
    return {
        type: actions.FETCH_PHOTO_REQUEST
    }
}

export const fetchPhotoSuccess = photos => {
    return {
        type: actions.FETCH_PHOTO_SUCCESS,
        payload: photos
    }
}

export const fetchPhotoFailure = error => {
    return {
        type: actions.FETCH_PHOTO_FAILURE,
        payload: error
    }
}

export const fetchPhotos = () => {
    return (dispatch) => {
        dispatch(fetchPhotoRequest);
        axios.get('https://www.breakingbadapi.com/api/characters?limit=20')
            .then(response => {
                const photos = response.data
                dispatch(fetchPhotoSuccess(photos))
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(fetchPhotoFailure(errorMessage))
            })
    }
}
