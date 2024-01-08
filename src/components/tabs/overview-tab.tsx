import React from 'react';

import {Film} from '../../types/film';

function getRatingDescription(rating: number) {
  switch (true) {
    case (rating >= 0 && rating < 3):
      return 'Bad';

    case (rating >= 3 && rating < 5):
      return 'Normal';

    case (rating >= 5 && rating < 8):
      return 'Good';

    case (rating >= 8 && rating < 10):
      return 'Very good';

    case (rating === 10):
      return 'Awesome';

    default:
      return 'Invalid rating';
  }
}

type OverviewTabProps = {
  film: Film;
}

export function OverviewTab({film}: OverviewTabProps){
  return (
    <React.Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>

        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingDescription(film.rating)}</span>

          <span className="film-rating__count">{film.scoresCount}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring">
          <strong>
            {film.starring.slice(0, 3).join(', ')} {film.starring.length > 3 && 'and more'}
          </strong>
        </p>
      </div>
    </React.Fragment>
  );
}
