import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addReview, FullOffer, Offer, SortOption, userReview, userReviews } from '../types/types';
import { AuthorizationStatus } from '../const';

type InitialState = {
  currentCity: string;
  offers: Offer[];
  offersNearby: Offer[];
  isOffersNearbyLoadingStatus: boolean;
  currentOffer: FullOffer | null;
  reviews: userReviews;
  isCurrentOfferLoadingStatus: boolean;
  isReviewsLoadingStatus: boolean;
  sortOption: SortOption;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  offersNearby: [],
  isOffersNearbyLoadingStatus: true,
  currentOffer: null,
  reviews: [],
  isCurrentOfferLoadingStatus: true,
  isReviewsLoadingStatus: true,
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
    setCurrentOffer: (state, action: PayloadAction<FullOffer>) => {
      state.currentOffer = action.payload;
    },
    setCurrentOfferLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isCurrentOfferLoadingStatus = action.payload;
    },
    setReviews: (state, action: PayloadAction<userReviews>) => {
      state.reviews = action.payload;
    },
    addReviews: (state, action: PayloadAction<userReview | addReview>) => {
      state.reviews.push(action.payload);
    },
    setReviewsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isReviewsLoadingStatus = action.payload;
    },
    setOffersNearby: (state, action: PayloadAction<Offer[]>) => {
      state.offersNearby = action.payload;
    },
    setOffersNearbyLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersNearbyLoadingStatus = action.payload;
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

export const { setCurrentCity, setOffers, setSortOption, requireAuthorization, setError, setOffersDataLoadingStatus,
  setCurrentOffer, setCurrentOfferLoadingStatus, setReviews, addReviews, setReviewsLoadingStatus, setOffersNearby,
  setOffersNearbyLoadingStatus } = rentalSlice.actions;

export const rentalReducer = rentalSlice.reducer;

