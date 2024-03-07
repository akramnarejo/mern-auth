import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/user"
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; 

const rootReducer = combineReducers({user: userSlice})
const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
    whitelist: ['user'], // In this example, we persist the 'user' reducer
  };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store)
