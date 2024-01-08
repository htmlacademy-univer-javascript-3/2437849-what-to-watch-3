import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import {useAppSelector} from '../../../store/hooks/use-app-selector';
import {useAppDispatch} from '../../../store/hooks/use-app-dispatch';
import {fetchFilm, fetchReviews, fetchSimilar} from '../../../store/api-actions';
import {getFilm, getFilmReviews, getLoadingStatus, getSimilarFilms} from '../../../store/film-reducer/film-selectors';
import {getAuthorizationStatus} from '../../../store/auth-reducer/auth-selectors';

import {Header} from '../../header/header';
import {Footer} from '../../footer/footer';
import {AddToMyList} from '../../add-to-my-list/add-to-my-list';
import {Tabs} from '../../tabs/tabs';
import {FilmList} from '../../film-list/film-list';
import {NotFound} from '../../not-found/not-found';
import {Loader} from '../../loader/loader';

import {AuthorizationStatus} from '../../../types/auth-status';

export function Movie() {
  const {id} = useParams();

  const films = useAppSelector(getSimilarFilms);
  const isLoading = useAppSelector(getLoadingStatus);
  const currentFilm = useAppSelector(getFilm);
  const reviews = useAppSelector(getFilmReviews);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
      dispatch(fetchReviews(id));
      dispatch(fetchSimilar(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (<Loader/>);
  }

  if (!currentFilm || !id) {
    return (<NotFound/>);
  }

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm.backgroundImage} alt={currentFilm.name}/>
          </div>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>

              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>

                <span className="film-card__year">{currentFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>

                  <span>Play</span>
                </Link>

                {authorizationStatus === AuthorizationStatus.Authorized &&
                  <AddToMyList filmId={id} status={currentFilm.isFavorite}/>}

                {authorizationStatus === AuthorizationStatus.Authorized &&
                  <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poter film-card__poster--big">
              <img src={currentFilm.posterImage} alt={currentFilm.name} width="218" height="327"/>
            </div>

            <Tabs film={currentFilm} reviews={reviews}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={films.slice(0, 4)}/>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}
