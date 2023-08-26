import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import {
  fetchFavoritesAction,
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  postNewCommentAction,
  toggleFavoriteAction,
} from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  offer: null,
  reviews: [],
  nearOffers: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isPosted: false,
  favorites: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setIsPosted: (state, action: PayloadAction<boolean>) => {
      state.isPosted = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOfferLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(postNewCommentAction.fulfilled, (state, action) => {
        state.reviews = [...state.reviews, action.payload];
        state.isPosted = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        state.offers = state.offers.map((offer) =>
          offer.id === action.payload.id ? action.payload : offer
        );

        const otherFavoriteOffers = state.favorites.filter(
          (offer) => offer.id !== action.payload.id
        );

        state.favorites = action.payload.isFavorite
          ? [...otherFavoriteOffers, action.payload]
          : otherFavoriteOffers;
      });
  },
});

export const { setIsPosted } = dataProcess.actions;
