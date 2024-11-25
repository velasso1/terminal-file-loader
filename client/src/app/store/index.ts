import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { museumApi } from './api/museum-api';

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import categoriesSlice from './slices/categories';

const rootReducer = combineReducers({
  categoriesSlice: categoriesSlice,
  [museumApi.reducerPath]: museumApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(museumApi.middleware),
});

export default store;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
