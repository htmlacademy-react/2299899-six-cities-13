import { createReducer } from '@reduxjs/toolkit';
import * as actions from './action';
import { CITIES } from '../mocks/city';
import { MOCK_OFFERS } from '../mocks/offers';
import { Offer } from '../mocks/offer';

const initialState = {
  city: CITIES[0],
  offers: [] as Offer[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(actions.updateOffers, (state) => {
      state.offers = MOCK_OFFERS;
    });
});

export { reducer };
