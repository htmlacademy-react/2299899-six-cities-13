import { Offer } from '../../types/offer';

export const sortPriceLowToHigh = (offerA: Offer, offerB: Offer) =>
  offerA.price - offerB.price;

export const sortPriceHighToLow = (offerA: Offer, offerB: Offer) =>
  offerB.price - offerA.price;

export const sortTop = (offerA: Offer, offerB: Offer) =>
  offerB.rating - offerA.rating;
