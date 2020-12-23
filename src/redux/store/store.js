import { createStore, compose, applyMiddleware } from 'redux'
import { loadState, saveState } from '../../localStorage/localStorage'
import rootReducers from '../reducers'
import thunk from 'redux-thunk';

const persistedState = loadState();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const myStore = createStore(
    rootReducers,
    persistedState,
    composeEnhancer(applyMiddleware(thunk)),
)

myStore.subscribe(() => {
    saveState({
        canvasPhotos: myStore.getState().canvasPhotos
    })
})

export default myStore