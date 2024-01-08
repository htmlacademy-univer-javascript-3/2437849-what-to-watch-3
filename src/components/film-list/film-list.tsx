import {useCallback, useState} from 'react';

import {FilmCardList} from '../film-card/film-card';
import {ShowMoreButton} from '../show-more/show-more';

import {Film} from '../../types/film';
import {FILMS_PAGE_SIZE, INIT_FILMS_LIMIT} from '../../consts';

type FilmListProps = {
  films: Array<Film>;
}

export function FilmList({films}: FilmListProps) {
  const [showLimit, setShowLimit] = useState(INIT_FILMS_LIMIT);
  const handleShowMoreClick = useCallback(() => {
    setShowLimit((prevState) => prevState + FILMS_PAGE_SIZE);
  }, []);
  return (
    <>
      <FilmCardList films={films.slice(0, showLimit)}/>
      {showLimit < films.length && <ShowMoreButton action={handleShowMoreClick}/>}
    </>
  );
}
