import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offer';
import * as actions from './action';
import { APIRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { Review } from '../types/review';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/loadOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(actions.setOffersLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(actions.setOffersLoadingStatus(false));
  dispatch(actions.loadOffers(data));
});

export const fetchOfferAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/loadOffer', async (id, { dispatch, extra: api }) => {
  dispatch(actions.setOfferLoadingStatus(true));
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
  dispatch(actions.setOfferLoadingStatus(false));
  dispatch(actions.loadOffer(data));
});

export const fetchReviewsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/loadReviews', async (id, { dispatch, extra: api }) => {
  // dispatch(actions.setOffersDataLoadingStatus(true));
  const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
  // dispatch(actions.setOffersDataLoadingStatus(false));
  dispatch(actions.loadReviews(data));
});

export const fetchNearOffersAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/loadNearOffers', async (id, { dispatch, extra: api }) => {
  // dispatch(actions.setOffersDataLoadingStatus(true));
  const { data } = await api.get<Offer[]>(
    `${APIRoute.Offers}/${id}${APIRoute.NearOffers}`
  );
  // dispatch(actions.setOffersDataLoadingStatus(false));
  dispatch(actions.loadNearOffers(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(actions.requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(actions.requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(actions.requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(actions.requireAuthorization(AuthorizationStatus.NoAuth));
});
