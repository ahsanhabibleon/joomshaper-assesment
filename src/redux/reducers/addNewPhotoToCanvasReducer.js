import * as actions from '../actions/actionTypes'
const canvasPhotoReducer = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_NEW_PHOTO_TO_CANVAS:
            return [
                ...state,
                {
                    id: new Date().getTime(),
                    imgSrc: action.payload.imgSrc,
                    imgIndex: action.payload.imgIndex,
                    filterSettings: {
                        invert: '0',
                        contrast: '100',
                        brightness: '1',
                        grayscale: '1'
                    }
                },
            ]
        case actions.CHANGE_FILTER:
            return state.map((item, index) => (
                action.payload.imgIndex === index ? (
                    action.payload.filterType === 'invert' ? {
                        ...item,
                        filterSettings: {
                            ...item.filterSettings,
                            invert: action.payload.payload
                        }
                    } : action.payload.filterType === 'contrast' ? {
                        ...item,
                        filterSettings: {
                            ...item.filterSettings,
                            contrast: action.payload.payload
                        }
                    } : action.payload.filterType === 'brightness' ? {
                        ...item,
                        filterSettings: {
                            ...item.filterSettings,
                            brightness: action.payload.payload
                        }
                    } : action.payload.filterType === 'grayscale' ? {
                        ...item,
                        filterSettings: {
                            ...item.filterSettings,
                            grayscale: action.payload.payload
                        }
                    } : item
                ) : item
            ))

        case actions.REMOVE_PHOTO_FROM_CANVAS:
            return state.filter(photo => photo.id !== action.payload.id)

        case actions.REPLACE_IMG_SRC:
            return state.map(item => (
                item.imgSrc === action.payload.targetImgUrl ? {
                    ...item,
                    imgSrc: action.payload.srcImgUrl
                } : item
            ))

        default:
            return state
    }
}

export default canvasPhotoReducer

