import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './Routes'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { DashboardReducer } from './reducers/DashboardReducer'
import { persistStore, persistReducer, } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const persistedReducer = persistReducer(persistConfig, DashboardReducer)

const store = createStore(persistedReducer, composedEnhancer)
const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>  
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
