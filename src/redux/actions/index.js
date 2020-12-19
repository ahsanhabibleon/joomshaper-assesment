import * as actions from './actionTypes'
import axios from 'axios'
export const increment = (payload) => {
    return {
        type: actions.INCREMENT,
        payload: payload
    }
}
export const decrement = (payload) => {
    return {
        type: actions.DECREMENT,
        payload: payload
    }
}
export const setLoggedInStatus = () => {
    return {
        type: actions.SIGNED_IN
    }
}

export const addTodo = (description) => {
    return {
        type: actions.ADD_ITEM,
        payload: {
            description
        }
    }
}

export const removeTodo = (id) => {
    return {
        type: actions.REMOVE_ITEM,
        payload: {
            id
        }
    }
}

export const taskCompleted = (id) => {
    return {
        type: actions.TASK_COMPLETED,
        payload: {
            id
        }
    }
}

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
