
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/types';
import { AppDispatch } from '../store';
import { offers } from '../mocks/offers';
import { AuthorizationStatus } from '../const';


export type SortOption = string;//'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type InitialState = {
  currentCity: string;
  offers: Offer[];
  sortOption: SortOption;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [{id: '', title: '', type: 'type', price: 0, previewImage: '',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {latitude: 0, longitude: 0, zoom: 0}, isFavorite: false, isPremium: false, rating: 0
  },],
  sortOption: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
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
  }
});

export const { setCurrentCity, setOffers, setSortOption} = rentalSlice.actions;

export const rentalReducer = rentalSlice.reducer;

export const loadOffers = () => (dispatch: AppDispatch) => { // func для загрузки моковых данных в store
  dispatch(setOffers(offers));
};
