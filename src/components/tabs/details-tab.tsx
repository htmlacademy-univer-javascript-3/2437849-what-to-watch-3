import {Film} from '../../types/film';

type DetailsTabProps = {
  film: Film;
}

export function DetailsTab({film}: DetailsTabProps){
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>

          <span className="film-card__details-value">{film.director}</span>
        </p>

        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>

          <span className="film-card__details-value">
            {film.starring.map((actor) => (<p key={actor}>{actor}</p>))}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>

          <span className="film-card__details-value">{film.runTime}m</span>
        </p>

        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>

          <span className="film-card__details-value">{film.genre}</span>
        </p>

        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>

          <span className="film-card__details-value">{film.released}</span>
        </p>
      </div>
    </div>
  );
}
