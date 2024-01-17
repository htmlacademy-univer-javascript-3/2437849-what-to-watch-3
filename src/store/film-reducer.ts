import {createAction, createSlice} from '@reduxjs/toolkit';

import {fetchFilm, fetchPromo, fetchFilms, fetchSimilar, setFavoriteStatus, fetchFavoriteFilms,
  fetchReviews, addReview} from './api-actions';

import {ReducerType} from '../types/reducer-types';
import {FilmReducerState} from '../types/film-reducer-state';

export const ALL_GENRES = 'All genres';
const FILMS_PAGE_COUNT = 8;

const initialState: FilmReducerState = {
  isLoading: false,
  films: [],
  promo: null,
  selectedFilm: null,
  selectedGenre: ALL_GENRES,
  selectedGenreFilms: [],
  selectedGenreFilmsCount: 0,
  similarFilms: [],
  reviews: [],
  favoriteFilms: [],
  genres: [ALL_GENRES],
};

export const setGenreFilter = createAction('main/setGenreFilter', (genre: string) => ({
  payload: genre
}));
export const setFilmsCount = createAction('main/setFilmsCount');

// noinspection TypeScriptValidateTypes
export const filmReducer = createSlice({
  name: ReducerType.Film,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setGenreFilter, (state, {payload}) => {
        state.selectedGenre = payload;
        state.selectedGenreFilms = state.films.filter((film) => state.selectedGenre === ALL_GENRES || film.genre === state.selectedGenre);
        state.selectedGenreFilmsCount = Math.min(state.selectedGenreFilms.length, FILMS_PAGE_COUNT);
      })
      .addCase(setFilmsCount, (state) => {
        state.selectedGenreFilmsCount = Math.min(state.selectedGenreFilms.length,
          state.selectedGenreFilmsCount + FILMS_PAGE_COUNT);
      })
      .addCase(fetchFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.selectedFilm = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFilm.rejected, (state) => {
        state.selectedFilm = null;
        state.isLoading = false;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.selectedGenreFilms = state.films.filter((film) => state.selectedGenre === ALL_GENRES || film.genre === state.selectedGenre);
        state.selectedGenreFilmsCount = Math.min(state.films.length, FILMS_PAGE_COUNT);
        state.genres = [ALL_GENRES, ...new Set(state.films.map((film) => film.genre))];
        state.isLoading = false;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(setFavoriteStatus.fulfilled, (state, {payload}) => {
        state.selectedFilm = payload;
        if (payload.isFavorite) {
          state.favoriteFilms.push(payload);
        } else {
          state.favoriteFilms = state.favoriteFilms.filter((film) => film.id !== payload.id);
        }

        if (state.promo?.id === payload.id){
          state.promo = payload;
        }
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, {payload}) => {
        state.favoriteFilms = payload;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.favoriteFilms = [];
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addReview.fulfilled, (state, {payload}) => {
        state.reviews = state.reviews.concat(payload);
      });
  },
});
