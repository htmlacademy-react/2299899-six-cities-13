import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import {
  fetchFavoritesAction,
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  postNewReviewAction,
  toggleFavoriteAction,
} from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  offer: null,
  reviews: [],
  nearOffers: [],
  isLoading: false,
  isReviewPosting: false,
  isReviewPosted: null,
  favorites: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setIsReviewPosting: (state, action: PayloadAction<boolean>) => {
      state.isReviewPosting = action.payload;
    },
    setIsReviewPosted: (state, action: PayloadAction<boolean | null>) => {
      state.isReviewPosted = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(postNewReviewAction.rejected, (state) => {
        state.isReviewPosting = false;
        state.isReviewPosted = false;
      })
      .addCase(postNewReviewAction.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(postNewReviewAction.fulfilled, (state, action) => {
        state.isReviewPosting = false;
        state.reviews = [...state.reviews, action.payload];
        state.isReviewPosted = true;
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

export const { setIsReviewPosting, setIsReviewPosted } = dataProcess.actions;
