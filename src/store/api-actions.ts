import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { loadComments, loadCurrentOffer, loadFavoriteOffers, loadNearestOffers, loadNewComment, loadOffers, loadUserData, redirectToRoute, requireAuthorization, setError, setOffersDataLoadingStatus } from './action';
import { CurrentOffer, Offer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';
import { Comment, CommentToSend } from '../types/comments';
import { useNavigate } from 'react-router-dom';

export const APIAction = {
  FETCH_OFFERS: 'FETCH_OFFERS',
  FETCH_FAVORITE_OFFERS: 'FETCH_FAVORITE_OFFERS',
  FETCH_CURRENT_OFFER: 'FETCH_CURRENT_OFFER',
  FETCH_NEAREST_OFFERS: 'FETCH_NEAREST_OFFERS',
  FETCH_COMMENTS: 'FETCH_COMMENTS',
  POST_COMMENT: 'POST_COMMENT',
  UPDATE_OFFER_FAVORITE_STATUS: 'UPDATE_OFFER_FAVORITE_STATUS',
  CHECK_AUTH: 'CHECK_AUTH',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

export const clearErrorAction = createAsyncThunk(
  APIAction.CLEAR_ERROR,
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_OFFERS,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_OFFERS,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadFavoriteOffers(data));
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_CURRENT_OFFER,
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersDataLoadingStatus(true));
      const { data } = await api.get<CurrentOffer>(`${APIRoute.Offers}/${id}`);
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadCurrentOffer(data));
    } catch {
      const navigate = useNavigate();
      navigate('*');
    }
  }
);

export const fetchNearestOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_NEAREST_OFFERS,
  async (id, {dispatch, extra: api}) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadNearestOffers(data));
  }
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_COMMENTS,
  async (id, {dispatch, extra: api}) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadComments(data));
  }
);

export const postCommentAction = createAsyncThunk<Comment | void, CommentToSend, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  APIAction.POST_COMMENT,
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});
      return data;
    } catch {
      dispatch(loadNewComment(null));
    }
  }
);

export const updateOfferFavoriteStatusAction = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.UPDATE_OFFER_FAVORITE_STATUS,
  async ({isFavorite, id}, {extra: api}) => {
    const status = isFavorite ? 0 : 1;
    await api.post(`${APIRoute.Favorite}/${id}/${status}`);
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.CHECK_AUTH,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.LOGIN,
  async ({email, password}, {dispatch, extra: api}) => {
    const { data: { token }, data } = await api.post<UserData>(APIRoute.Login, {email, password});
    dispatch(loadUserData(data));
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.LOGOUT,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);
