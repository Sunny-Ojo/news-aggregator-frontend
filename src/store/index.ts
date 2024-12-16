import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice.ts';
import newsReducer from '../features/news/newsSlice.ts';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,

  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  news: newsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
