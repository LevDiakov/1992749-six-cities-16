import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationUser, FullOffer, Offer, SortOption, userReview, userReviews } from '../types/types';
import { AuthorizationStatus } from '../const';

type InitialState = {
  currentCity: string;
  offers: Offer[];
  isOffersDataLoading: boolean;
  favorites: Offer[];
  isFavoritesDataLoading: boolean;
  isFavoriteStatusLoading: boolean;
  offersNearby: Offer[];
  isOffersNearbyLoadingStatus: boolean;
  currentOffer: FullOffer | null;
  reviews: userReviews;
  isCurrentOfferLoadingStatus: boolean;
  isReviewsLoadingStatus: boolean;
  isReviewsUploadingStatus: boolean;
  sortOption: SortOption;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  authorizationUser: AuthorizationUser | null;
}

const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  favorites: [],
  isFavoritesDataLoading: false,
  isFavoriteStatusLoading: true,
  offersNearby: [],
  isOffersNearbyLoadingStatus: true,
  currentOffer: null,
  reviews: [],
  isCurrentOfferLoadingStatus: true,
  isReviewsLoadingStatus: true,
  isReviewsUploadingStatus: false,
  sortOption: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  authorizationUser: null,
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
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    setFavorites: (state, action: PayloadAction<Offer[]>) => {
      state.favorites = action.payload;
    },
    setFavoritesDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isFavoritesDataLoading = action.payload;
    },
    setFavoriteStatus: (state, action: PayloadAction<Offer[]>) => {
      state.favorites = action.payload;
    },
    setFavoriteStatusLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isFavoriteStatusLoading = action.payload;
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
    addReviews: (state, action: PayloadAction<userReview>) => {
      state.reviews.push(action.payload);
    },
    setReviewsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isReviewsLoadingStatus = action.payload;
    },
    setReviewsUploadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isReviewsUploadingStatus = action.payload;
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
    setAuthorizationUser: (state, action: PayloadAction<AuthorizationUser>) => {
      state.authorizationUser = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  }
});

export const { setCurrentCity, setOffers, setSortOption, requireAuthorization, setError, setOffersDataLoadingStatus,
  setCurrentOffer, setCurrentOfferLoadingStatus, setReviews, addReviews, setReviewsLoadingStatus, setOffersNearby,
  setOffersNearbyLoadingStatus, setAuthorizationUser, setReviewsUploadingStatus, setFavorites, setFavoritesDataLoadingStatus,
  setFavoriteStatus, setFavoriteStatusLoadingStatus } = rentalSlice.actions;

export const rentalReducer = rentalSlice.reducer;

