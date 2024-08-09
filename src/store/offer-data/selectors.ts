import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getOffers = (state: State) =>
  state[NameSpace.Offers].offers;
export const getFavoriteOffers = (state: State) =>
  state[NameSpace.Offers].favoriteOffers;
export const getCurrentOffer = (state: State) =>
  state[NameSpace.Offers].currentOffer;
export const getNearestOffers = (state: State) =>
  state[NameSpace.Offers].nearestOffers;

export const getOffersDataLoadingStatus = (state: State) =>
  state[NameSpace.Offers].isOffersDataLoading;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
