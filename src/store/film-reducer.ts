import {createAction, createSlice} from '@reduxjs/toolkit';

import {addReview, fetchFavoriteFilms, fetchFilm, fetchFilms, fetchPromo, fetchReviews, fetchSimilar,
  setFavoriteStatus} from './api-actions';

import {ReducerType} from '../types/reducer-types';
import {FilmReducerState} from '../types/film-reducer-state';

const ALL_GENRES = 'All genres';

const initialState: FilmReducerState = {
  isLoading: false,
  films: [],
  promo: null,
  selectedFilm: null,
  selectedGenre: ALL_GENRES,
  selectedGenreFilms: [],
  similarFilms: [],
  reviews: [],
  favoriteFilms: [],
  genres: [ALL_GENRES],
};

export const setGenreFilter = createAction('SET_GENRE_FILTER', (genre: string) => ({
  payload: genre
}));

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
      })
      .addCase(fetchFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.selectedFilm = action.payload;
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
