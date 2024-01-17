import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';

import {VideoPlayer} from '../video-player/video-player';

import {Film} from '../../types/film';

const PREVIEW_TIMEOUT = 1000;

type CardProps = {
  film: Film;
}

export function FilmCard({film}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => setIsHovered(true), PREVIEW_TIMEOUT);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(false);
  };

  return (
    <Link to={`/films/${film.id}`} className="small-film-card__link small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
    >
      <div className="small-film-card__image">
        {isHovered
          ? (<VideoPlayer src={film.previewVideoLink} muted width={280} height={175} poster={film.previewImage} autoPlay/>)
          : (<img src={film.previewImage} alt={film.name} width={280} height={175}/>)}
      </div>

      <h3 className="small-film-card__title">{film.name}</h3>
    </Link>
  );
}
