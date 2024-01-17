import {Film} from './film';
import {Review} from './review';

export type FilmReducerState = {
  isLoading: boolean;
  films: Array<Film>;
  promo: Film | null;
  selectedFilm: Film | null;
  selectedGenre: string;
  selectedGenreFilms: Array<Film>;
  selectedGenreFilmsCount: number;
  similarFilms: Array<Film>;
  reviews: Array<Review>;
  favoriteFilms: Array<Film>;
  genres: Array<string>;
};
