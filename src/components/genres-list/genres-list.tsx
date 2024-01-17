import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../store/hooks/use-app-selector';
import {getGenres, getGenre} from '../../store/reducers-selectors';
import {setGenreFilter} from '../../store/film-reducer';

const GENRES_MAX_COUNT = 10;

export function GenresList() {
  const selectedGenre = useAppSelector(getGenre);
  const genres = useAppSelector(getGenres).slice(0, GENRES_MAX_COUNT);

  const dispatch = useDispatch();
  const handleGenreFilterClick = (genre: string) => {
    dispatch(setGenreFilter(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item${selectedGenre === genre ? ' catalog__genres-item--active' : ''}`}>
          <button onClick={() => handleGenreFilterClick(genre)} className="catalog__genres-link"
            data-testid={`button-genre-${genre}`}
          >
            {genre}
          </button>
        </li>
      ))}
    </ul>
  );
}
