import { describe } from 'vitest';
import { dataProcess, setIsReviewPosted } from './data-process.slice';
import {
  fetchFavoritesAction,
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  postNewReviewAction,
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
    isLoading: false,
    isReviewPosting: false,
    isReviewPosted: null,
    favorites: [],
  };
  const mockOffer = makeFakeOffer();
  const mockReview = makeFakeReview();

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

    const result = dataProcess.reducer(undefined, setIsReviewPosted(expected));

    expect(result.isReviewPosted).toBe(expected);
  });

  it('should set "isOffersLoading" to "true" with "fetchOffersAction.pending"', () => {
    const expected = true;

    const result = dataProcess.reducer(undefined, fetchOffersAction.pending);

    expect(result.isLoading).toBe(expected);
  });

  it('should set "isLoading" to "false", "offers" to payload with "fetchOffersAction.fulfilled"', () => {
    const expected = {
      ...initialState,
      isLoading: false,
      offers: [mockOffer],
    };

    const result = dataProcess.reducer(
      undefined,
      fetchOffersAction.fulfilled([mockOffer], '', undefined)
    );

    expect(result).toEqual(expected);
  });

  it('should set "isLoading" to "false" with "fetchOffersAction.rejected"', () => {
    const expected = {
      ...initialState,
      isLoading: false,
    };

    const result = dataProcess.reducer(
      undefined,
      fetchOffersAction.rejected(null, '', undefined)
    );

    expect(result).toEqual(expected);
  });

  it('should set "isLoading" to "true" with "fetchOfferAction.pending"', () => {
    const expected = true;

    const result = dataProcess.reducer(undefined, fetchOfferAction.pending);

    expect(result.isLoading).toBe(expected);
  });

  it('should set "isLoading" to "false", "offer" to payload with "fetchOfferAction.fulfilled"', () => {
    const expected = {
      ...initialState,
      isLoading: false,
      offer: mockOffer,
    };

    const result = dataProcess.reducer(
      undefined,
      fetchOfferAction.fulfilled(mockOffer, '', mockOffer.id)
    );

    expect(result).toEqual(expected);
  });

  it('should set "isLoading" to "false" with "fetchOfferAction.rejected"', () => {
    const expected = {
      ...initialState,
      isLoading: false,
    };

    const result = dataProcess.reducer(
      undefined,
      fetchOfferAction.rejected(null, '', mockOffer.id)
    );

    expect(result).toEqual(expected);
  });

  it('should set "reviews" to payload with "fetchReviewsAction.fulfilled"', () => {
    const expected = [mockReview];

    const result = dataProcess.reducer(
      undefined,
      fetchReviewsAction.fulfilled([mockReview], '', mockOffer.id)
    );

    expect(result.reviews).toEqual(expected);
  });

  it('should set "nearOffers" to payload with "fetchNearOffersAction.fulfilled"', () => {
    const expected = [mockOffer];

    const result = dataProcess.reducer(
      undefined,
      fetchNearOffersAction.fulfilled([mockOffer], '', mockOffer.id)
    );

    expect(result.nearOffers).toEqual(expected);
  });

  it('should add new review to "reviews", set "isReviewPosted" to "true" with "postNewReviewAction.fulfilled"', () => {
    const expected = {
      ...initialState,
      reviews: [...initialState.reviews, mockReview],
      isReviewPosted: true,
    };

    const result = dataProcess.reducer(
      undefined,
      postNewReviewAction.fulfilled(mockReview, '', {
        offerId: mockOffer.id,
        comment: '',
        rating: 5,
      })
    );

    expect(result).toEqual(expected);
  });

  it('should set "favorites" to payload with "fetchFavoritesAction.fulfilled"', () => {
    const expected = [mockOffer];

    const result = dataProcess.reducer(
      undefined,
      fetchFavoritesAction.fulfilled([mockOffer], '', undefined)
    );

    expect(result.favorites).toEqual(expected);
  });

  it('should toggle "isFavorite" payload "offer" with "toggleFavoriteAction.fulfilled"', () => {
    const expected: Offer[] = [];

    const result = dataProcess.reducer(
      undefined,
      toggleFavoriteAction.fulfilled(mockOffer, '', {
        offerId: mockOffer.id,
        status: Number(!mockOffer.isFavorite),
      })
    );

    expect(result.offers).toEqual(expected);
  });
});
