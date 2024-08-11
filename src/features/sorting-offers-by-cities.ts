
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, SortOption } from '../types/types';
import { AppDispatch } from '../store';
import { offers } from '../mocks/offers';
import { AuthorizationStatus } from '../const';

type InitialState = {
  currentCity: string;
  offers: Offer[];
  sortOption: SortOption;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  sortOption: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  }
});

export const { setCurrentCity, setOffers, setSortOption, requireAuthorization, setError } = rentalSlice.actions;

export const rentalReducer = rentalSlice.reducer;

export const loadOffers = () => (dispatch: AppDispatch) => { // func для загрузки моковых данных в store
  dispatch(setOffers(offers));
};
