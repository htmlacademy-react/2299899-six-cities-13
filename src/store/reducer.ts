import { createReducer } from '@reduxjs/toolkit';
import * as actions from './action';
import { CITIES, City } from '../mocks/city';
import { Offer } from '../types/offer';
import { SORT_OPTIONS, AuthorizationStatus } from '../const';

type InitalState = {
  city: City;
  offers: Offer[];
  currentSort: string;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isQuestionsDataLoading: boolean;
};

const initialState: InitalState = {
  city: CITIES[0],
  offers: [],
  currentSort: SORT_OPTIONS[0],
  authorizationStatus: AuthorizationStatus.Auth,
  error: null,
  isQuestionsDataLoading: false,
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
    .addCase(actions.setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(actions.setOffersDataLoadingStatus, (state, action) => {
      state.isQuestionsDataLoading = action.payload;
    });
});

export { reducer };
