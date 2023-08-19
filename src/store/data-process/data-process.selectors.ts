import { CITIES, NameSpace, SORT_OPTIONS } from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { createSelector } from 'reselect';
import {
  selectCurrentCity,
  selectCurrentSort,
} from '../app-process/app-process.selectors';
import * as options from './sort-options';
import { GroupedOffers } from '../../types/grouped-offers';

export const selectOffers = (state: Pick<State, NameSpace.Data>): Offer[] =>
  state[NameSpace.Data].offers;
export const selectIsOffersLoading = (
  state: Pick<State, NameSpace.Data>
): boolean => state[NameSpace.Data].isOffersLoading;
export const selectOffer = (state: Pick<State, NameSpace.Data>): Offer | null =>
  state[NameSpace.Data].offer;
export const selectIsOfferLoading = (
  state: Pick<State, NameSpace.Data>
): boolean => state[NameSpace.Data].isOfferLoading;
export const selectReviews = (state: Pick<State, NameSpace.Data>): Review[] =>
  state[NameSpace.Data].reviews;
export const selectNearOffers = (state: Pick<State, NameSpace.Data>): Offer[] =>
  state[NameSpace.Data].nearOffers;
export const selectIsPosted = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isPosted;
export const selectFavorites = (state: Pick<State, NameSpace.Data>): Offer[] =>
  state[NameSpace.Data].favorites;

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, currentCity) =>
    offers.filter((offer) => offer.city.name === currentCity)
);

const sortFunctionMap = {
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
