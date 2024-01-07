import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, setDetails, setFilms} from './action';
import {getMoviesByGenre} from '../components/functions/get-movies-by-genre';
import {Film, Films} from '../mocks/films';
import {Detail, Details} from '../mocks/details';

export type AppState = {
  genre: string;
  films: Film[];
  details: Detail[];
  filteredMovies: Film[];
};

export const InitialState: AppState = {
  genre: 'All genres',
  films: Films,
  details: Details,
  filteredMovies: Films
};

export const appReducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      if (state.films && state.details && state.genre) {
        state.filteredMovies = getMoviesByGenre(state.films, state.details, state.genre);
      }
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setDetails, (state, action) => {
      state.details = action.payload;
    });
});
