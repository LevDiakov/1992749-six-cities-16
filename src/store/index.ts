import { configureStore } from '@reduxjs/toolkit';
import { rentalReducer } from '../features/sorting-offers-by-cities';
import { createAPI } from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    rental: rentalReducer, //rental: rentalReducer, другие редюсеры также через свойство добавлять в объект
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

