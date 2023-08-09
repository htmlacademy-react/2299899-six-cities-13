import { createReducer } from '@reduxjs/toolkit';
import * as actions from './action';
import { Offer } from '../types/offer';
import { SORT_OPTIONS, AuthorizationStatus, CITIES } from '../const';
import { Review } from '../types/review';

type InitalState = {
  city: string;
  offers: Offer[];
  currentSort: string;
  authorizationStatus: AuthorizationStatus;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  offer: Offer | null;
  reviews: Review[];
  nearOffers: Offer[];
};

const initialState: InitalState = {
  city: CITIES[0],
  offers: [],
  currentSort: SORT_OPTIONS[0],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersLoading: false,
  isOfferLoading: false,
  offer: null,
  reviews: [],
  nearOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(actions.loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(actions.requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(actions.setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(actions.setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(actions.loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(actions.loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(actions.loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    });
});

export { reducer };
