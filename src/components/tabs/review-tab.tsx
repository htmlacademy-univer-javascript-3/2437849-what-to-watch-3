import {ReviewCard} from '../review-card/review-card';

import {Review} from '../../types/review';

type ReviewsTabProps = {
  reviews: Array<Review>;
}

export function ReviewsTab({reviews}:ReviewsTabProps) {
  const halfReviewsCount = (reviews.length + 1) / 2;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(0, halfReviewsCount).map((review) => <ReviewCard key={review.id} review={review}/>)}
      </div>

      <div className="film-card__reviews-col">
        {reviews.slice(halfReviewsCount).map((review) => <ReviewCard key={review.id} review={review}/>)}
      </div>
    </div>
  );
}
