import {useMemo} from 'react';

import {Review} from '../../types/review';

type ReviewProps = {
  review: Review;
}

export function ReviewCard({review}: ReviewProps) {
  const formattedReviewDate = useMemo(() => {
    const date = new Date(review.date);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }, [review]);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user}</cite>

          <time className="review__date" dateTime={review.date}>{formattedReviewDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}
