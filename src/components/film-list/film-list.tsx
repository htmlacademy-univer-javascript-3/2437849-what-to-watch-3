import {useCallback, useState} from 'react';

import {FilmCardList} from '../film-card/film-card';
import {ShowMoreButton} from '../show-more/show-more';

import {Film} from '../../types/film';

const INIT_FILMS_COUNT = 8;
const FILMS_PAGE_COUNT = 8;

type FilmListProps = {
  films: Array<Film>;
}

export function FilmList({films}: FilmListProps) {
  const [showLimit, setShowLimit] = useState(INIT_FILMS_COUNT);
  const handleShowMoreClick = useCallback(() => {
    setShowLimit((prevState) => prevState + FILMS_PAGE_COUNT);
  }, []);

  return (
    <>
      <FilmCardList films={films.slice(0, showLimit)}/>
      {showLimit < films.length && <ShowMoreButton action={handleShowMoreClick}/>}
    </>
  );
}
