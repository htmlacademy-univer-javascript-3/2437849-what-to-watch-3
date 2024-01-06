import {Film} from '../../mocks/films';
import {Details} from '../../mocks/details';

export type PropsSimilarMovies = {
  genre: string;
  filmId: string;
  films: Film[];
}

export function getSimilarMovies({genre, filmId, films}: PropsSimilarMovies) {
  const similarFilms = films.filter((film) =>
    Details.find((detailInDetails) => detailInDetails.filmId === film.id)?.genre === genre && film.id !== filmId);

  if (similarFilms.length > 4) {
    return similarFilms.slice(0, 4);
  }

  return similarFilms;
}
