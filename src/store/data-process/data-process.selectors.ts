import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] =>
  state[NameSpace.Data].offers;
export const getIsOffersLoading = (state: State): boolean =>
  state[NameSpace.Data].isOffersLoading;
export const getOffer = (state: State): Offer | null =>
  state[NameSpace.Data].offer;
export const getIsOfferLoading = (state: State): boolean =>
  state[NameSpace.Data].isOfferLoading;
export const getReviews = (state: State): Review[] =>
  state[NameSpace.Data].reviews;
export const getNearOffers = (state: State): Offer[] =>
  state[NameSpace.Data].nearOffers;
export const getIsPosted = (state: State): boolean =>
  state[NameSpace.Data].isPosted;
