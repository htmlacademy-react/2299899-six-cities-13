import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offer';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { Review } from '../types/review';

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  return data;
});

export const fetchOfferAction = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer', async (id, { extra: api }) => {
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReviews', async (id, { extra: api }) => {
  const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
  return data;
});

export const fetchNearOffersAction = createAsyncThunk<
  Offer[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearOffers', async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(
    `${APIRoute.Offers}/${id}${APIRoute.NearOffers}`
  );
  return data;
});

export const fetchFavoritesAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Favorites);
  return data;
});

export const toggleFavoriteAction = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/toggleFavorite', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(
    `${APIRoute.Favorites}/${offerId}/${status}`
  );
  return data;
});

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const data = (await api.get(APIRoute.Login)).data as UserData;
  return data;
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
    dispatch(redirectToRoute(AppRoute.Main));
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
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});

export const postNewCommentAction = createAsyncThunk<
  Review,
  { offerId: string; comment: string; rating: number },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'data/postNewComment',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const data = (
      await api.post(`${APIRoute.Reviews}/${offerId}`, {
        comment,
        rating,
      })
    ).data as Review;
    return data;
  }
);
