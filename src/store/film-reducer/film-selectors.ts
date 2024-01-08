import {RootState} from '../index';

import {ReducerType} from '../../types/reducer-types';

export const getLoadingStatus = (state: RootState) => state[ReducerType.Film].isLoading;
export const getGenre = (state: RootState) => state[ReducerType.Film].genreFilter;
export const getGenres = (state: RootState) => state[ReducerType.Film].genres;
export const getFilm = (state: RootState) => state[ReducerType.Film].selectedFilm;
export const getPromo = (state: RootState) => state[ReducerType.Film].promoFilm;
export const getFilmsByGenre = (state: RootState) => state[ReducerType.Film].genreFilteredFilms;
export const getFilmReviews = (state: RootState) => state[ReducerType.Film].reviews;
export const getFavorites = (state: RootState) => state[ReducerType.Film].favoriteFilms;
export const getFavoritesCount = (state: RootState): number => state[ReducerType.Film].favoriteFilms.length;
export const getSimilarFilms = (state: RootState) => state[ReducerType.Film].similarFilms;
