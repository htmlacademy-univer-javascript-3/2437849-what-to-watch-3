import React from 'react';
import {Link} from 'react-router-dom';

import {useAppSelector} from '../../../store/hooks/use-app-selector';
import {getLoadingStatus, getPromo, getFilmsByGenre, getFilmsCount} from '../../../store/reducers-selectors';
import {getAuthorizationStatus} from '../../../store/reducers-selectors';

import {Header} from '../../header/header';
import {Footer} from '../../footer/footer';
import {AddToMyList} from '../../add-to-my-list/add-to-my-list';
import {FilmList} from '../../film-list/film-list';
import {GenresList} from '../../genres-list/genres-list';
import {Loader} from '../../loader/loader';
import {ShowMoreButton} from '../../show-more/show-more';

import {AuthorizationStatus} from '../../../types/auth-status';

export function Main() {
  const isLoading = useAppSelector(getLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const promo = useAppSelector(getPromo);
  const selectedGenreFilms = useAppSelector(getFilmsByGenre);
  const selectedGenreFilmsCount = useAppSelector(getFilmsCount);

  if (isLoading || promo === null) {
    return (<Loader/>);
  }

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promo.backgroundImage} alt={promo.name}/>
        </div>

        <Header headerClass={'film-card__head'}/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promo.posterImage} alt={promo.name} width={218} height={327}/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promo.name}</h2>

              <p className="film-card__meta">
                <span className="film-card__genre">{promo.genre}</span>

                <span className="film-card__year">{promo.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${promo.id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s"/>
                  </svg>

                  <span>Play</span>
                </Link>

                {authorizationStatus === AuthorizationStatus.Authorized &&
                  <AddToMyList filmId={promo.id} status={promo.isFavorite}/>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList/>

          <FilmList films={selectedGenreFilms.slice(0, selectedGenreFilmsCount)}/>

          {selectedGenreFilmsCount !== selectedGenreFilms.length && <ShowMoreButton/>}
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}
