import {FilmCard} from '../film-card/film-card';

import {Film} from '../../types/film';

type FilmListProps = {
  films: Array<Film>;
}

export function FilmList({films}: FilmListProps) {
  return (
    <div className="catalog__films-list">
      {films.map((film) => (<FilmCard key={film.id} film={film}/>))}
    </div>
  );
}
