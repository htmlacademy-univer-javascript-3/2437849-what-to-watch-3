import {Film} from './film';
import {Review} from './review';

export type FilmReducerState = {
  isLoading: boolean;
  films: Array<Film>;
  promoFilm: Film | null;
  selectedFilm: Film | null;
  genreFilter: string;
  genreFilteredFilms: Array<Film>;
  similarFilms: Array<Film>;
  reviews: Array<Review>;
  favoriteFilms: Array<Film>;
  genres: Array<string>;
};
