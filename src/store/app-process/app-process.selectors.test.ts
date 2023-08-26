import { describe } from 'vitest';
import {
  AuthorizationStatus,
  CITIES,
  NameSpace,
  SORT_OPTIONS,
} from '../../const';
import {
  selectCardUnderMouse,
  selectCurrentCity,
  selectCurrentSort,
} from './app-process.selectors';

describe('AppProcess selectors', () => {
  const state = {
    [NameSpace.Data]: {
      offers: [],
      offer: null,
      reviews: [],
      nearOffers: [],
      isOffersLoading: false,
      isOfferLoading: false,
      isPosted: false,
      favorites: [],
    },
    [NameSpace.App]: {
      currentSort: SORT_OPTIONS[0],
      currentCity: CITIES[0],
      cardUnderMouse: undefined,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      currentUser: null,
    },
  };

  it('should return "currentSort" from state', () => {
    const expected = SORT_OPTIONS[0];
    const result = selectCurrentSort(state);
    expect(result).toBe(expected);
  });

  it('should return "city" from state', () => {
    const expected = CITIES[0];
    const result = selectCurrentCity(state);
    expect(result).toBe(expected);
  });

  it('should return "cardUnderMouse" from state', () => {
    const expected = undefined;
    const result = selectCardUnderMouse(state);
    expect(result).toBe(expected);
  });
});
