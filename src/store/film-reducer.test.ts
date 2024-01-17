import {filmReducer, setGenreFilter, ALL_GENRES} from './film-reducer';
import {fetchFilm, fetchPromo, fetchFilms, fetchSimilar, fetchFavoriteFilms, fetchReviews} from './api-actions';

import {FilmReducerState} from '../types/film-reducer-state';

import {getTestFilm, getTestFilms, getTestReviews} from '../mocks/mocks';

const film = getTestFilm();
const films = getTestFilms();
const genres = [ALL_GENRES, ...new Set(films.map((item) => item.genre))];
const reviews = getTestReviews();

describe('Film reducer slice', () => {
  let initialState: FilmReducerState;

  beforeEach(() => {
    initialState = {
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
      genres: [ALL_GENRES]
    };
  });

  it('Should return initial state without parameters', () => {
    const action = {type: ''};
    const result = filmReducer.reducer(void (0), action);
    expect(result).toEqual(initialState);
  });

  it('Should set genre', () => {
    const action = {type: setGenreFilter.type, payload: film.genre};
    const result = filmReducer.reducer(initialState, action);
    expect(result.selectedGenre).toEqual(film.genre);
  });

  it('Should set selected genre films', () => {
    initialState.selectedGenreFilms = films;
    const action = {type: setGenreFilter.type, payload: film.genre};
    const result = filmReducer.reducer(initialState, action);
    expect(result.selectedGenreFilms).toEqual([]);
  });

  it('Should loading with pending action', () => {
    const action = {type: fetchFilm.pending.type, payload: film};
    const result = filmReducer.reducer(initialState, action);
    expect(result.isLoading).toEqual(true);
  });

  it('Should not loading with fulfilled action', () => {
    const action = {type: fetchFilm.fulfilled.type, payload: film};
    const result = filmReducer.reducer(initialState, action);
    expect(result.isLoading).toEqual(false);
  });

  it('Should set film with fulfilled action', () => {
    const action = {type: fetchFilm.fulfilled.type, payload: film};
    const result = filmReducer.reducer(initialState, action);
    expect(result.selectedFilm).toEqual(film);
  });

  it('Should set promo with fulfilled action', () => {
    const action = {type: fetchPromo.fulfilled.type, payload: film};
    const result = filmReducer.reducer(initialState, action);
    expect(result.promo).toEqual(film);
  });

  it('Should loading with pending action', () => {
    const action = {type: fetchFilms.pending.type, payload: films};
    const result = filmReducer.reducer(initialState, action);
    expect(result.isLoading).toEqual(true);
  });

  it('Should not loading with fulfilled action', () => {
    const action = {type: fetchFilms.fulfilled.type, payload: films};
    const result = filmReducer.reducer(initialState, action);
    expect(result.isLoading).toEqual(false);
  });

  it('Should set films with fulfilled action', () => {
    const action = {type: fetchFilms.fulfilled.type, payload: films};
    const result = filmReducer.reducer(initialState, action);
    expect(result.films).toEqual(films);
  });

  it('Should set genres list with fulfilled action', () => {
    const action = {type: fetchFilms.fulfilled.type, payload: films};
    const result = filmReducer.reducer(initialState, action);
    expect(result.genres).toEqual(genres);
  });

  it('Should set selected genre films with fulfilled action', () => {
    const action = {type: fetchFilms.fulfilled.type, payload: films};
    const result = filmReducer.reducer(initialState, action);
    expect(result.selectedGenreFilms).toEqual(films);
  });

  it('Should set similar films with fulfilled action', () => {
    const action = {type: fetchSimilar.fulfilled.type, payload: films};
    const result = filmReducer.reducer(initialState, action);
    expect(result.similarFilms).toEqual(films);
  });

  it('Should set favorite films with fulfilled action', () => {
    const action = {type: fetchFavoriteFilms.fulfilled.type, payload: films};
    const result = filmReducer.reducer(initialState, action);
    expect(result.favoriteFilms).toEqual(films);
  });

  it('Should drop favorite films with rejected action', () => {
    initialState.favoriteFilms = films;
    const action = {type: fetchFavoriteFilms.rejected.type, payload: films};
    const result = filmReducer.reducer(initialState, action);
    expect(result.favoriteFilms).toEqual([]);
  });

  it('Should set review with fulfilled action', () => {
    const action = {type: fetchReviews.fulfilled.type, payload: reviews};
    const result = filmReducer.reducer(initialState, action);
    expect(result.reviews).toEqual(reviews);
  });
});
