import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, SortOption } from '../types/types';
import { AuthorizationStatus } from '../const';

type InitialState = {
  currentCity: string;
  offers: Offer[];
  sortOption: SortOption;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  sortOption: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
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
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
  }
});

export const { setCurrentCity, setOffers, setSortOption, requireAuthorization, setError, setOffersDataLoadingStatus } = rentalSlice.actions;

export const rentalReducer = rentalSlice.reducer;

