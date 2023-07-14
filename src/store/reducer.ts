import { createReducer } from '@reduxjs/toolkit';
import * as actions from './action';
import { CITY } from '../mocks/city';
import { MOCK_OFFERS } from '../mocks/offers';
import { Offer } from '../mocks/offer';

const initialState = {
  city: { title: 'Paris', lat: 59, lng: 10 },
  offers: [] as Offer[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateCity, (state) => {
      state.city = CITY;
    })
    .addCase(actions.updateOffers, (state) => {
      state.offers = MOCK_OFFERS;
    });
});

export { reducer };
