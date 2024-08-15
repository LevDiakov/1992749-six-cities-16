import { configureStore } from '@reduxjs/toolkit';
import { rentalReducer } from '../features/sorting-offers-by-cities';
import { createAPI } from '../services/api';
// import { redirect } from './middlewares/redirect';

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
    }), //.concat(redirect),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

