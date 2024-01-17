import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import {useAppSelector} from '../../../store/hooks/use-app-selector';
import {useAppDispatch} from '../../../store/hooks/use-app-dispatch';
import {addReview, fetchFilm} from '../../../store/api-actions';
import {getFilm, getLoadingStatus} from '../../../store/reducers-selectors';

import {Loader} from '../../loader/loader';
import {Header} from '../../header/header';
import {NotFound} from '../../not-found/not-found';

const REVIEW_MIN_LENGTH = 50;
const REVIEW_MAX_LENGTH = 400;

export function AddReview() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [selectedRating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [errorMessage, setError] = useState('');

  const isLoading = useAppSelector(getLoadingStatus);
  const currentFilm = useAppSelector(getFilm);

  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (<Loader/>);
  }

  if (!currentFilm || !id) {
    return (<NotFound/>);
  }

  const isReviewComplete = selectedRating > 0 && reviewText.length >= REVIEW_MIN_LENGTH
    && reviewText.length <= REVIEW_MAX_LENGTH && !isDisabled;

  function handleReviewFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!id || !isReviewComplete) {
      return;
    }

    setIsDisabled(true);

    dispatch(addReview({rating: selectedRating, comment: reviewText, filmId: id}))
      .then((data) => {
        if (!data.payload) {
          throw new Error('Failed to add review');
        }

        setIsDisabled(false);
        navigate(`/films/${id}`);
      })
      .catch((err) => {
        const error = err as Error;

        if (error.message) {
          setError(error.message);
        }

        setIsDisabled(false);
      });
  }

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) =>
    setRating(parseInt(event.target.value, 10));

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm.backgroundImage} alt={currentFilm.name}/>
        </div>

        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${currentFilm.id}`} className="breadcrumbs__link">{currentFilm.name}</Link>
              </li>

              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm.posterImage} alt={currentFilm.name} width={218} height={327}/>
        </div>
      </div>

      <div className="add-review">
        <form action="src/components/pages#" className="add-review__form" onSubmit={handleReviewFormSubmit}>
          <div className="rating">
            <div className="rating__stars" data-testid="stars-component">
              <input className="rating__input" id="star-10" type="radio" name="rating" value={10}
                checked={selectedRating === 10} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-10">Rating 10</label>

              <input className="rating__input" id="star-9" type="radio" name="rating" value={9}
                checked={selectedRating === 9} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-9">Rating 9</label>

              <input className="rating__input" id="star-8" type="radio" name="rating" value={8}
                checked={selectedRating === 8} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-8">Rating 8</label>

              <input className="rating__input" id="star-7" type="radio" name="rating" value={7}
                checked={selectedRating === 7} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-7">Rating 7</label>

              <input className="rating__input" id="star-6" type="radio" name="rating" value={6}
                checked={selectedRating === 6} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-6">Rating 6</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value={5}
                checked={selectedRating === 5} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value={4}
                checked={selectedRating === 4} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value={3}
                checked={selectedRating === 3} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value={2}
                checked={selectedRating === 2} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-1" type="radio" name="rating" value={1}
                checked={selectedRating === 1} onChange={handleRatingChange} disabled={isDisabled}
              />
              <label className="rating__label" htmlFor="star-1">Rating 1</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              placeholder="Review text" maxLength={REVIEW_MAX_LENGTH} disabled={isDisabled}
            >
            </textarea>

            <div className="add-review__submit">
              <button className="add-review__btn" disabled={!isReviewComplete} type="submit">Post</button>
            </div>
          </div>

          <p>{errorMessage}</p>
        </form>
      </div>

    </section>);
}
