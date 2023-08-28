import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { Offer } from '../types/offer';
import {
  datatype,
  name,
  random,
  address,
  commerce,
  internet,
  date,
} from 'faker';
import { AuthorizationStatus, CITIES, NameSpace, SORT_OPTIONS } from '../const';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { City } from '../types/city';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const makeFakeCity = (): City => ({
  name: random.arrayElement(CITIES),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number({ min: 1, max: 20 }),
  },
});

export const makeFakeOffer = (): Offer => ({
  id: datatype.uuid(),
  title: name.title(),
  type: random.arrayElement(['apartment', 'room']),
  price: datatype.number({ min: 100, max: 2000 }),
  city: makeFakeCity(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number({ min: 1, max: 20 }),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({ min: 1, max: 5 }),
  description: commerce.productDescription(),
  bedrooms: datatype.number({ min: 1, max: 4 }),
  goods: [commerce.product()],
  host: {
    name: name.findName(),
    avatarUrl: internet.url(),
    isPro: datatype.boolean(),
  },
  images: [internet.url()],
  maxAdults: datatype.number(5),
  previewImage: internet.url(),
  children: datatype.number(5),
});

export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  date: date.recent().toString(),
  user: {
    name: name.findName(),
    avatarUrl: internet.url(),
    isPro: datatype.boolean(),
  },
  comment: commerce.productDescription(),
  rating: datatype.number({ min: 1, max: 5 }),
});

export const makeFakeUser = (): UserData => ({
  name: name.findName(),
  avatarUrl: internet.url(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: internet.password(30),
});

export const makeFakeAuthData = (): AuthData => ({
  login: internet.email(),
  password: 'i1',
});

export const makeFakeState = (initialState?: Partial<State>): State => {
  const fakeOffer1 = makeFakeOffer();
  const fakeOffer2 = makeFakeOffer();
  fakeOffer1.isFavorite = true;
  return {
    [NameSpace.Data]: {
      offers: [fakeOffer1, fakeOffer2],
      offer: fakeOffer1,
      reviews: [makeFakeReview()],
      nearOffers: [fakeOffer2],
      isLoading: false,
      isReviewPosting: false,
      isReviewPosted: null,
      favorites: [fakeOffer1],
    },
    [NameSpace.App]: {
      currentSort: random.arrayElement(SORT_OPTIONS),
      currentCity: random.arrayElement(CITIES),
      cardUnderMouse: fakeOffer1.id,
    },
    [NameSpace.User]: {
      authorizationStatus: random.arrayElement(
        Object.values(AuthorizationStatus)
      ),
      currentUser: random.arrayElement([makeFakeUser(), null]),
    },
    ...(initialState ?? {}),
  };
};
