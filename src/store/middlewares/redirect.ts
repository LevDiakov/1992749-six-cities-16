import {PayloadAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';

import browserHistory from '../../browser-history/browser-history';
import { rentalReducer } from '../../features/sorting-offers-by-cities';

type Reducer = ReturnType<typeof rentalReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'rental/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

