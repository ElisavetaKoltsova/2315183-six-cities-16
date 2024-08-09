import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';
import { fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearestOfferAction, fetchOffersAction } from '../api-actions';

const initialState: OffersData = {
  offers: [],
  favoriteOffers: [],
  currentOffer: null,
  nearestOffers: [],
  isOffersDataLoading: false
};

export const offerData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchNearestOfferAction.fulfilled, (state, action) => {
        state.nearestOffers = action.payload;
      });
  }
});
