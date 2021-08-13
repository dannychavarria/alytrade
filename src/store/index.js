import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { DashboardReducer } from '../reducers/DashboardReducer'
import { persistStore, persistReducer, } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const persistedReducer = persistReducer(persistConfig, DashboardReducer)

const store = createStore(persistedReducer, composedEnhancer)
const persistor = persistStore(store)

export {
    store,
    persistor
}