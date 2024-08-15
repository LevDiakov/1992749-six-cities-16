import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, SortOption } from '../types/types';
import { AppRoute, AuthorizationStatus } from '../const';

type InitialState = {
  currentCity: string;
  offers: Offer[];
  sortOption: SortOption;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  redirectToRoute: AppRoute;
}

const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  sortOption: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  redirectToRoute: AppRoute.Main,
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
    redirectToRoute: (state, action: PayloadAction<AppRoute>) => {
      state.redirectToRoute = action.payload;
    },
  }
});

export const { setCurrentCity, setOffers, setSortOption, requireAuthorization, setError, setOffersDataLoadingStatus, redirectToRoute } = rentalSlice.actions;

export const rentalReducer = rentalSlice.reducer;

