import * as actions from '../actions/actionTypes'
const Todos = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_ITEM:
            return [
                ...state,
                {
                    id: new Date().getMilliseconds(),
                    description: action.payload.description,
                    isCompleted: false
                }
            ]
        case actions.REMOVE_ITEM:
            return state.filter(item => item.id !== action.payload.id)

        case actions.TASK_COMPLETED:
            return state.map(item => item.id !== action.payload.id ? item : { ...item, isCompleted: true })

        default:
            return state
    }
}

export default Todos