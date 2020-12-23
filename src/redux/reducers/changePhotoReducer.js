import * as actions from '../actions/actionTypes'

const intState = {
    status: false,
    imgSrc: ''
}
const changePhotoReducer = (state = intState, action) => {
    switch (action.type) {
        case actions.HANDLE_CHANGE_PHOTO:
            return {
                status: true,
                imgSrc: action.payload.imgSrc
            }
        default:
            return state
    }
}

export default changePhotoReducer