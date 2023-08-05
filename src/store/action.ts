import { createAction } from '@reduxjs/toolkit';
import { City } from '../mocks/city';
import { Offer } from '../mocks/offer';

export const updateCity = createAction<City>('updateCity');

export const updateOffers = createAction<Offer[]>('updateoffers');
