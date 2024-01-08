import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../store/hooks/use-app-selector';
import {getGenres, getGenre} from '../../store/film-reducer/film-selectors';
import {setGenreFilter} from '../../store/film-reducer/film-reducer';

export function GenresList(){
  const selectedGenre = useAppSelector(getGenre);
  const genres = useAppSelector(getGenres);
  const dispatch = useDispatch();

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item${selectedGenre === genre ? ' catalog__genres-item--active' : ''}`}>
          <button onClick={() => dispatch(setGenreFilter(genre))} className="catalog__genres-link">{genre}</button>
        </li>
      ))}
    </ul>
  );
}
