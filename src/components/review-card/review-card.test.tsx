import {render, screen} from '@testing-library/react';

import {ReviewCard} from './review-card';
import {getTestReviews} from '../../mocks/mocks';

describe('Review card component', () => {
  it('Should render component correctly', () => {
    const review = getTestReviews()[0];
    render(<ReviewCard review={review}/>);

    expect(screen.getByText(review.user)).toBeInTheDocument();
    expect(screen.getByText(review.rating)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });
});
