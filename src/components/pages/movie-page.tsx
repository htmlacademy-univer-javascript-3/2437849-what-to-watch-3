import React, {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {AppRoute} from '../app';
import {FilmCards} from '../film-card';
import {TabsNavigation} from '../tabs-navigation';
import {DetailsTab} from '../tabs-details';
import {OverviewTab} from '../tabs-overviews';
import {ReviewsTab} from '../tabs-reviews';
import {Footer} from '../footer';
import {Films} from '../../mocks/films';
import {Details} from '../../mocks/details';
import {Overviews} from '../../mocks/overview';
import {Reviews} from '../../mocks/review';
import {getReviewRoute} from '../functions/get-review-route';
import {getSimilarMovies} from '../functions/get-similar-movies';

export function MoviePage() {
  const { id } = useParams();
  const filmId = id?.split('=')[1];
  const film = Films.find((filmInFilms) => filmInFilms.id === filmId);
  const detail = Details.find((detailInDetails) => detailInDetails.filmId === filmId);
  const overview = Overviews.find((overviewInOverviews) => overviewInOverviews.filmId === filmId);
  const reviews = Reviews.filter((reviewsInReviews) => reviewsInReviews.filmId === filmId);

  const [activeTab, setActiveTab] = useState('Overview');

  const navigate = useNavigate();
  if (!film || !detail || !overview) {
    navigate(AppRoute.NotFoundPage);
    return null;
  }

  return(
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.image} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.MainPage} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{detail.genre}</span>
                <span className="film-card__year">{detail.year.getFullYear()}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={getReviewRoute(film.id)} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.image} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <TabsNavigation setTab={setActiveTab} activeTab={activeTab}/>

              {activeTab === 'Overview' && <OverviewTab overview={overview} />}
              {activeTab === 'Details' && <DetailsTab detail={detail} />}
              {activeTab === 'Reviews' && <ReviewsTab reviews={reviews} />}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmCards films={getSimilarMovies({genre: detail.genre, filmId: film.id, films: Films})}>
          </FilmCards>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}
