import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState, store } from '.';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { saveToken, dropToken } from '../services/token';
import { addReviews, requireAuthorization, setAuthorizationUser, setCurrentOffer, setCurrentOfferLoadingStatus, setError, setOffers, setOffersDataLoadingStatus, setOffersNearby, setOffersNearbyLoadingStatus, setReviews, setReviewsLoadingStatus, setReviewsUploadingStatus } from '../features/sorting-offers-by-cities';
import { AuthData, AuthorizationUser, FullOffer, Message, Offer, UserData, userReview, userReviews } from '../types/types';

export const clearErrorAction = createAsyncThunk(
  '/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/offers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

export const fetchFullOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  }>(
    '/offer/:id',
    async (offerId, {dispatch, extra: api}) => {
      dispatch(setCurrentOfferLoadingStatus(true));
      const {data} = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setCurrentOfferLoadingStatus(false));
      dispatch(setCurrentOffer(data));
    },
  );

export const fetchOffersNearbyAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
    }>(
      '/offer/:id/nearby',
      async (offerId, {dispatch, extra: api}) => {
        dispatch(setOffersNearbyLoadingStatus(true));
        const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
        dispatch(setOffersNearbyLoadingStatus(false));
        dispatch(setOffersNearby(data));
      },
    );

export const fetchReviewsAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
    }>(
      '/comments/:id',
      async (offerId, {dispatch, extra: api}) => {
        dispatch(setReviewsLoadingStatus(true));
        const {data} = await api.get<userReviews>(`${APIRoute.Comments}/${offerId}`);
        dispatch(setReviewsLoadingStatus(false));
        dispatch(setReviews(data));
      },
    );

export const addReviewsAction = createAsyncThunk<void, Message, {
      dispatch: AppDispatch;
      state: RootState;
      extra: AxiosInstance;
      }>(
        '/comments/:id',
        async ({ offerId, data}, {dispatch, extra: api}) => {
          dispatch(setReviewsUploadingStatus(true));
          const {data: newComment} = await api.post<userReview>(`${APIRoute.Comments}/${offerId}`, data);
          dispatch(setReviewsUploadingStatus(false));

          dispatch(addReviews(newComment));
        },
      );

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<AuthorizationUser>(APIRoute.Login);
      dispatch(setAuthorizationUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
