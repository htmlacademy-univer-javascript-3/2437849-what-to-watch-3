import {MouseEvent} from 'react';

import {useAppDispatch} from '../../store/hooks/use-app-dispatch';
import {setFilmsCount} from '../../store/film-reducer';

export function ShowMoreButton() {
  const dispatch = useAppDispatch();
  const handleShowMoreClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setFilmsCount());
  };

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
    </div>
  );
}
