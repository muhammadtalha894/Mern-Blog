import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  verssion: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});

export default store;

export const persistor = persistStore(store);
