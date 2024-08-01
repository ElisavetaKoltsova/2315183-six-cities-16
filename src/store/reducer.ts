import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities, Sorts } from '../const.ts';
import { changeCity, changeSort, closeSorts, loadOffers, openSorts, requireAuthorization, resetSort, setError, setOffersDataLoadingStatus } from './action.ts';
import { sort } from '../utils/sort.ts';
import { City, Offer } from '../types/offer.ts';

type InitialState = {
  city: City;
  offers: Offer[];
  sort: string;
  isFiltersOpen: boolean;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  city: Cities.PARIS,
  offers: [],
  sort: Sorts.POPULAR,
  isFiltersOpen: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
      state.offers = sort[action.payload]([...state.offers]);
    })
    .addCase(openSorts, (state) => {
      state.isFiltersOpen = true;
    })
    .addCase(closeSorts, (state) => {
      state.isFiltersOpen = false;
    })
    .addCase(resetSort, (state) => {
      state.sort = Sorts.POPULAR;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
