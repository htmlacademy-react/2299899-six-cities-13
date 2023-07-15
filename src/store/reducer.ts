import { createReducer } from '@reduxjs/toolkit';
import * as actions from './action';
import { CITY, City } from '../mocks/city';
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
  city: { title: 'Paris', lat: 59, lng: 10 },
  offers: [],
  currentSort: SORT_OPTIONS[0],
  authorizationStatus: AuthorizationStatus.Auth,
  error: null,
  isQuestionsDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateCity, (state) => {
      state.city = CITY;
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
