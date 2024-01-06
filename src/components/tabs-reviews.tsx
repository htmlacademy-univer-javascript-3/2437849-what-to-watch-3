import {Review} from '../mocks/review';
import {ReviewCards} from './review-card';

type ReviewTabProps = {
  reviews: Review[];
}

export function ReviewsTab({reviews}: ReviewTabProps) {
  const halfLength = Math.ceil(reviews.length / 2);
  return(
    <div className="film-card__reviews film-card__row">
      <ReviewCards reviews={reviews.slice(0, halfLength)}>
      </ReviewCards>
      <ReviewCards reviews={reviews.slice(halfLength, reviews.length)}>
      </ReviewCards>
    </div>
  );
}
