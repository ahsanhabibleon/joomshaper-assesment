import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './redux/store/store'
import { Provider } from 'react-redux'
import './index.scss';

const unsubscribe = Store.subscribe(() => {
  console.log('Store has changed!', Store.getState())
})
unsubscribe()
ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

