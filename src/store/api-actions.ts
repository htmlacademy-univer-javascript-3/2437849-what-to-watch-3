import {AxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch, RootState} from './index';

import {User} from '../types/user';
import {AuthorizationData} from '../types/auth-data';
import {ValidationError} from '../types/error';
import {Film} from '../types/film';
import {Review} from '../types/review';
import {Comment} from '../types/comment';

export const checkAuth = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<User>('/login');
    return data;
  },
);

export const login = createAsyncThunk<User, AuthorizationData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  rejectValue: ValidationError;
}>(
  '/login',
  async ({email, password}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<User>('/login', {email, password});
      return data;
    } catch (err) {
      const error: AxiosError<ValidationError> = err as AxiosError<ValidationError>;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/logout',
  async (_arg, {extra: api}) => {
    await api.delete('/logout');
  },
);

export const fetchFilms = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>('/films');
    return data;
  },
);

export const fetchFilm = createAsyncThunk<Film, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/films/id',
  async (filmId: string, {extra: api}) => {
    const {data} = await api.get<Film>(`/films/${filmId}`);
    return data;
  },
);

export const fetchPromo = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/promo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film>('/promo');
    return data;
  },
);

export const fetchReviews = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/reviews',
  async (filmId: string, {extra: api}) => {
    const {data} = await api.get<Review[]>(`/comments/${filmId}`);
    return data;
  },
);

export const addReview = createAsyncThunk<Review, Comment, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/comments/id',
  async ({comment, rating, filmId}, {extra: api}) => {
    const {data} = await api.post<Review>(`/comments/${filmId}`, {comment, rating});
    return data;
  },
);

export const fetchSimilar = createAsyncThunk<Film[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/films/id/similar',
  async (filmId: string, {extra: api}) => {
    const {data} = await api.get<Film[]>(`/films/${filmId}/similar`);
    return data;
  },
);

export const setFavoriteStatus = createAsyncThunk<Film, {status: boolean; filmId: string}, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/favorite/id/status',
  async ({status, filmId}, {extra: api}) => {
    const {data} = await api.post<Film>(`/favorite/${filmId}/${status ? 1 : 0}`);
    return data;
  },
);

export const fetchFavoriteFilms = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/favorite',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>('/favorite');
    return data;
  },
);
