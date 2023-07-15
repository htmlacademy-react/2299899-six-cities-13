import { Offer } from '../types/offer';
import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Review } from '../types/review';

export const updateCity = createAction('updateCity');

export const updateOffers = createAction('updateOffers');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOffer = createAction<Offer>('data/loadOffer');

export const loadReviews = createAction<Review[]>('data/loadReviews');

export const loadNearOffers = createAction<Offer[]>('data/loadNearOffers');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const setError = createAction<string | null>('data/setError');

export const setOffersLoadingStatus = createAction<boolean>(
  'data/setOffersLoadingStatus'
);

export const setOfferLoadingStatus = createAction<boolean>(
  'data/setOfferLoadingStatus'
);
