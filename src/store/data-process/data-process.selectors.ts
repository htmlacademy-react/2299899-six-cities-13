import { CITIES, NameSpace, SORT_OPTIONS } from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { createSelector } from 'reselect';
import {
  selectCurrentCity,
  selectCurrentSort,
} from '../app-process/app-process.selectors';
import * as options from '../../utils/sort-options';
import { GroupedOffers } from '../../types/grouped-offers';
import { random } from 'faker';

export const selectOffers = (state: Pick<State, NameSpace.Data>): Offer[] =>
  state[NameSpace.Data].offers;
export const selectIsLoading = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isLoading;
export const selectOffer = (state: Pick<State, NameSpace.Data>): Offer | null =>
  state[NameSpace.Data].offer;
export const selectReviews = (state: Pick<State, NameSpace.Data>): Review[] =>
  state[NameSpace.Data].reviews;
export const selectNearOffers = (state: Pick<State, NameSpace.Data>): Offer[] =>
  state[NameSpace.Data].nearOffers;
export const selectIsReviewPosting = (
  state: Pick<State, NameSpace.Data>
): boolean => state[NameSpace.Data].isReviewPosting;
export const selectIsReviewPosted = (
  state: Pick<State, NameSpace.Data>
): boolean | null => state[NameSpace.Data].isReviewPosted;
export const selectFavorites = (state: Pick<State, NameSpace.Data>): Offer[] =>
  state[NameSpace.Data].favorites;

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, currentCity) =>
    offers.filter((offer) => offer.city.name === currentCity)
);

export const sortFunctionMap = {
  [SORT_OPTIONS[1]]: options.sortPriceLowToHigh,
  [SORT_OPTIONS[2]]: options.sortPriceHighToLow,
  [SORT_OPTIONS[3]]: options.sortTop,
};
export const selectSortedOffers = createSelector(
  [selectFilteredOffers, selectCurrentSort],
  (offers, currentSort) => [...offers].sort(sortFunctionMap[currentSort])
);

export const selectGroupedFavorites = createSelector(
  selectFavorites,
  (offers) => {
    const groupedOffers: GroupedOffers = CITIES.reduce(
      (object, city) => ({ ...object, [city]: [] }),
      {}
    );
    offers.forEach((offer) => {
      groupedOffers[offer.city.name].push(offer);
    });
    return groupedOffers;
  }
);

export const selectThreeRandomNearOffers = createSelector(
  selectNearOffers,
  (offers) => {
    if (offers.length <= 3) {
      return offers;
    }
    return random.arrayElements(offers, 3);
  }
);
