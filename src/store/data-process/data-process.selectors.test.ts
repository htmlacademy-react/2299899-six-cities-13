import { describe } from 'vitest';
import {
  selectFavorites,
  selectFilteredOffers,
  selectGroupedFavorites,
  selectIsLoading,
  selectIsReviewPosted,
  selectIsReviewPosting,
  selectNearOffers,
  selectOffer,
  selectOffers,
  selectReviews,
  selectSortedOffers,
  selectRandomNearOffers,
  sortFunctionMap,
} from './data-process.selectors';
import { CITIES, NameSpace, OFFER_MAX_NEARBY_OFFERS_SHOWN } from '../../const';
import { makeFakeOffer, makeFakeState } from '../../utils/test-mocks';
import { GroupedOffers } from '../../types/grouped-offers';
import { State } from '../../types/state';

describe('DataProcess selectors', () => {
  let mockState: State;

  beforeEach(() => {
    mockState = makeFakeState();
  });

  it('should return "offers" from state', () => {
    const { offers } = mockState[NameSpace.Data];

    const result = selectOffers(mockState);

    expect(result).toEqual(offers);
  });

  it('should return "offer" from state', () => {
    const { offer } = mockState[NameSpace.Data];

    const result = selectOffer(mockState);

    expect(result).toEqual(offer);
  });

  it('should return "isLoading" from state', () => {
    const { isLoading } = mockState[NameSpace.Data];

    const result = selectIsLoading(mockState);

    expect(result).toBe(isLoading);
  });

  it('should return "reviews" from state', () => {
    const { reviews } = mockState[NameSpace.Data];

    const result = selectReviews(mockState);

    expect(result).toEqual(reviews);
  });

  it('should return "nearOffers" from state', () => {
    const { nearOffers } = mockState[NameSpace.Data];

    const result = selectNearOffers(mockState);

    expect(result).toEqual(nearOffers);
  });

  it('should return "isReviewPosting" from state', () => {
    const { isReviewPosting } = mockState[NameSpace.Data];

    const result = selectIsReviewPosting(mockState);

    expect(result).toBe(isReviewPosting);
  });

  it('should return "isReviewPosted" from state', () => {
    const { isReviewPosted } = mockState[NameSpace.Data];

    const result = selectIsReviewPosted(mockState);

    expect(result).toBe(isReviewPosted);
  });

  it('should return "favorites" from state', () => {
    const { favorites } = mockState[NameSpace.Data];

    const result = selectFavorites(mockState);

    expect(result).toEqual(favorites);
  });

  it('should return "filteredOffers" based on "offers" and "currentCity" from state', () => {
    const currentCity = mockState[NameSpace.App].currentCity;
    const expected = mockState[NameSpace.Data].offers.filter(
      (offer) => offer.city.name === currentCity
    );

    const result = selectFilteredOffers(mockState);

    expect(result).toEqual(expected);
  });

  it('should return "sortedOffers" based on "filteredOffers" and "currentSort" from state', () => {
    const currentCity = mockState[NameSpace.App].currentCity;
    const filteredOffers = mockState[NameSpace.Data].offers.filter(
      (offer) => offer.city.name === currentCity
    );
    const currentSort = mockState[NameSpace.App].currentSort;
    const expected = filteredOffers.sort(sortFunctionMap[currentSort]);

    const result = selectSortedOffers(mockState);

    expect(result).toEqual(expected);
  });

  it('should return "groupedOffers" based on "favorites" from state', () => {
    const groupedOffers: GroupedOffers = CITIES.reduce(
      (object, city) => ({ ...object, [city]: [] }),
      {}
    );
    mockState[NameSpace.Data].favorites.forEach((offer) => {
      groupedOffers[offer.city.name].push(offer);
    });

    const result = selectGroupedFavorites(mockState);

    expect(result).toEqual(groupedOffers);
  });

  it('should return "randomNearOffers" based on "nearOffers" from state in amount of "OFFER_MAX_NEARBY_OFFERS_SHOWN"', () => {
    const nearOffers = [];
    for (let i = 0; i <= 4; i++) {
      nearOffers.push(makeFakeOffer());
    }
    mockState[NameSpace.Data].nearOffers = nearOffers;

    const result = selectRandomNearOffers(mockState);

    expect(result.length).toBe(OFFER_MAX_NEARBY_OFFERS_SHOWN);
  });
});
