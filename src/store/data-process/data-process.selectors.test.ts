import { describe } from 'vitest';
import {
  selectFavorites,
  selectFilteredOffers,
  selectGroupedFavorites,
  selectIsOffersLoading,
  selectNearOffers,
  selectOffer,
  selectOffers,
  selectReviews,
  selectSortedOffers,
  sortFunctionMap,
} from './data-process.selectors';
import { CITIES, NameSpace } from '../../const';
import { makeFakeState } from '../../utils/test-mocks';
import { GroupedOffers } from '../../types/grouped-offers';

describe('DataProcess selectors', () => {
  const state = makeFakeState();

  it('should return "offers" from state', () => {
    const { offers } = state[NameSpace.Data];

    const result = selectOffers(state);

    expect(result).toEqual(offers);
  });

  it('should return "isOffersLoading" from state', () => {
    const { isOffersLoading } = state[NameSpace.Data];

    const result = selectIsOffersLoading(state);

    expect(result).toBe(isOffersLoading);
  });

  it('should return "offer" from state', () => {
    const { offer } = state[NameSpace.Data];

    const result = selectOffer(state);

    expect(result).toEqual(offer);
  });

  it('should return "isOfferLoading" from state', () => {
    const { isOfferLoading } = state[NameSpace.Data];

    const result = selectIsOffersLoading(state);

    expect(result).toBe(isOfferLoading);
  });

  it('should return "reviews" from state', () => {
    const { reviews } = state[NameSpace.Data];

    const result = selectReviews(state);

    expect(result).toEqual(reviews);
  });

  it('should return "nearOffers" from state', () => {
    const { nearOffers } = state[NameSpace.Data];

    const result = selectNearOffers(state);

    expect(result).toEqual(nearOffers);
  });

  it('should return "isPosted" from state', () => {
    const { isPosted } = state[NameSpace.Data];

    const result = selectIsOffersLoading(state);

    expect(result).toBe(isPosted);
  });

  it('should return "favorites" from state', () => {
    const { favorites } = state[NameSpace.Data];

    const result = selectFavorites(state);

    expect(result).toEqual(favorites);
  });

  it('should return "filteredOffers" based on "offers" and "currentCity" from state', () => {
    const currentCity = state[NameSpace.App].currentCity;
    const expected = state[NameSpace.Data].offers.filter(
      (offer) => offer.city.name === currentCity
    );

    const result = selectFilteredOffers(state);

    expect(result).toEqual(expected);
  });

  it('should return "sortedOffers" based on "filteredOffers" and "currentSort" from state', () => {
    const currentCity = state[NameSpace.App].currentCity;
    const filteredOffers = state[NameSpace.Data].offers.filter(
      (offer) => offer.city.name === currentCity
    );
    const currentSort = state[NameSpace.App].currentSort;
    const expected = filteredOffers.sort(sortFunctionMap[currentSort]);

    const result = selectSortedOffers(state);

    expect(result).toEqual(expected);
  });

  it('should return "groupedOffers" based on "favorites" from state', () => {
    const groupedOffers: GroupedOffers = CITIES.reduce(
      (object, city) => ({ ...object, [city]: [] }),
      {}
    );
    state[NameSpace.Data].favorites.forEach((offer) => {
      groupedOffers[offer.city.name].push(offer);
    });

    const result = selectGroupedFavorites(state);

    expect(result).toEqual(groupedOffers);
  });
});
