import {FormEvent} from 'react';

import {useAppDispatch} from '../../store/hooks/use-app-dispatch';
import {useAppSelector} from '../../store/hooks/use-app-selector';
import {getFavoritesCount} from '../../store/reducers-selectors';
import {setFavoriteStatus} from '../../store/api-actions';

type AddToMyListProps = {
  filmId: string;
  status: boolean;
}

export function AddToMyList({filmId, status}: AddToMyListProps){
  const dispatch = useAppDispatch();
  const favoriteCount = useAppSelector(getFavoritesCount);

  function handleTogglingFavoriteClick(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(setFavoriteStatus({status: !status, filmId: filmId}));
  }

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleTogglingFavoriteClick}>
      {
        status
          ? (<svg viewBox="0 0 19 20" width={19} height={20}><use xlinkHref="#in-list"/></svg>)
          : (<svg viewBox="0 0 19 20" width={19} height={20}><use xlinkHref="#add"/></svg>)
      }
      <span>My list</span>
      <span className="film-card__count">{favoriteCount}</span>
    </button>
  );
}
