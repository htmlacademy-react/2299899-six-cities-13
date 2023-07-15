import { Offer } from '../types/offer';
import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

export const updateCity = createAction('updateCity');

export const updateOffers = createAction('updateOffers');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const setError = createAction<string | null>('data/setError');

export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus'
);
