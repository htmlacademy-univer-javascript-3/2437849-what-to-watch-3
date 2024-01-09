import {RootState} from './index';

import {ReducerType} from '../types/reducer-types';

export const getUser = (state: RootState) => state[ReducerType.Auth].user;
export const getAuthError = (state: RootState) => state[ReducerType.Auth].authorizationError;
export const getAuthorizationStatus = (state: RootState) => state[ReducerType.Auth].authorizationStatus;

export const getLoadingStatus = (state: RootState) => state[ReducerType.Film].isLoading;
export const getGenre = (state: RootState) => state[ReducerType.Film].selectedGenre;
export const getGenres = (state: RootState) => state[ReducerType.Film].genres;
export const getFilm = (state: RootState) => state[ReducerType.Film].selectedFilm;
export const getPromo = (state: RootState) => state[ReducerType.Film].promo;
export const getFilmsByGenre = (state: RootState) => state[ReducerType.Film].selectedGenreFilms;
export const getFilmReviews = (state: RootState) => state[ReducerType.Film].reviews;
export const getFavorites = (state: RootState) => state[ReducerType.Film].favoriteFilms;
export const getFavoritesCount = (state: RootState): number => state[ReducerType.Film].favoriteFilms.length;
export const getSimilarFilms = (state: RootState) => state[ReducerType.Film].similarFilms;
