import dayjs from 'dayjs';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

export const sortPriceLowToHigh = (offerA: Offer, offerB: Offer) =>
  offerA.price - offerB.price;

export const sortPriceHighToLow = (offerA: Offer, offerB: Offer) =>
  offerB.price - offerA.price;

export const sortTop = (offerA: Offer, offerB: Offer) =>
  offerB.rating - offerA.rating;

export const sortReviewsNewToOld = (reviewA: Review, reviewB: Review) =>
  dayjs(reviewB.date).diff(dayjs(reviewA.date));
