import { describe } from 'vitest';
import { dataProcess, setIsPosted } from './data-process.slice';
import {
  fetchFavoritesAction,
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  postNewCommentAction,
  toggleFavoriteAction,
} from '../api-actions';
import { Offer } from '../../types/offer';
import { makeFakeOffer, makeFakeReview } from '../../utils/test-mocks';
import { datatype } from 'faker';

describe('DataProcess slice', () => {
  const initialState = {
    offers: [],
    offer: null,
    reviews: [],
    nearOffers: [],
    isOffersLoading: false,
    isOfferLoading: false,
    isPosted: false,
    favorites: [],
  };
  const offerTest = makeFakeOffer();
  const reviewTest = makeFakeReview();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = dataProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };

    const result = dataProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set "isPosted" in state', () => {
    const expected = datatype.boolean();

    const result = dataProcess.reducer(undefined, setIsPosted(expected));

    expect(result.isPosted).toBe(expected);
  });

  it('should set "isOffersLoading" to "true" with "fetchOffersAction.pending"', () => {
    const expected = true;

    const result = dataProcess.reducer(undefined, fetchOffersAction.pending);

    expect(result.isOffersLoading).toBe(expected);
  });

  it('should set "isOffersLoading" to "false", "offers" to payload with "fetchOffersAction.fulfilled"', () => {
    const expected = {
      ...initialState,
      isOffersLoading: false,
      offers: [offerTest],
    };

    const result = dataProcess.reducer(
      undefined,
      fetchOffersAction.fulfilled([offerTest], '', undefined)
    );

    expect(result).toEqual(expected);
  });

  it('should set "isOfferLoading" to "true" with "fetchOfferAction.pending"', () => {
    const expected = true;

    const result = dataProcess.reducer(undefined, fetchOfferAction.pending);

    expect(result.isOfferLoading).toBe(expected);
  });

  it('should set "isOfferLoading" to "false", "offer" to payload with "fetchOfferAction.fulfilled"', () => {
    const expected = {
      ...initialState,
      isOfferLoading: false,
      offer: offerTest,
    };

    const result = dataProcess.reducer(
      undefined,
      fetchOfferAction.fulfilled(offerTest, '', offerTest.id)
    );

    expect(result).toEqual(expected);
  });

  it('should set "reviews" to payload with "fetchReviewsAction.fulfilled"', () => {
    const expected = [reviewTest];

    const result = dataProcess.reducer(
      undefined,
      fetchReviewsAction.fulfilled([reviewTest], '', offerTest.id)
    );

    expect(result.reviews).toEqual(expected);
  });

  it('should set "nearOffers" to payload with "fetchNearOffersAction.fulfilled"', () => {
    const expected = [offerTest];

    const result = dataProcess.reducer(
      undefined,
      fetchNearOffersAction.fulfilled([offerTest], '', offerTest.id)
    );

    expect(result.nearOffers).toEqual(expected);
  });

  it('should add new review to "reviews", set "isPosted" to "true" with "postNewCommentAction.fulfilled"', () => {
    const expected = {
      ...initialState,
      reviews: [...initialState.reviews, reviewTest],
      isPosted: true,
    };

    const result = dataProcess.reducer(
      undefined,
      postNewCommentAction.fulfilled(reviewTest, '', {
        offerId: offerTest.id,
        comment: '',
        rating: 5,
      })
    );

    expect(result).toEqual(expected);
  });

  it('should set "favorites" to payload with "fetchFavoritesAction.fulfilled"', () => {
    const expected = [offerTest];

    const result = dataProcess.reducer(
      undefined,
      fetchFavoritesAction.fulfilled([offerTest], '', undefined)
    );

    expect(result.favorites).toEqual(expected);
  });

  it('should toggle "isFavorite" payload "offer" with "toggleFavoriteAction.fulfilled"', () => {
    const expected: Offer[] = [];

    const result = dataProcess.reducer(
      undefined,
      toggleFavoriteAction.fulfilled(offerTest, '', {
        offerId: offerTest.id,
        status: Number(!offerTest.isFavorite),
      })
    );

    expect(result.offers).toEqual(expected);
  });
});
