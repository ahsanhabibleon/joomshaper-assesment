import * as actions from './actionTypes'
import axios from 'axios'

export const fetchUsersRequest = () => {
    return {
        type: actions.FETCH_USERS_REQUEST
    }
}
export const fetchUsersSuccess = users => {
    return {
        type: actions.FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersFailure = err => {
    return {
        type: actions.FETCH_USERS_FAILURE,
        payload: err
    }
}

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest)
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data
                dispatch(fetchUsersSuccess(users))
            })
            .catch(err => {
                const errMessage = err.message
                dispatch(fetchUsersFailure(errMessage))
            })
    }
}
