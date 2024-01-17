import {render, screen} from '@testing-library/react';

import {ReviewsTab} from './review-tab';
import{getTestReviews} from '../../mocks/mocks';

describe('Tabs component', () => {
  it('Should render component correctly', () => {
    const reviews = getTestReviews();
    render(<ReviewsTab reviews={reviews}/>);

    expect(screen.getByText(reviews[0].user)).toBeInTheDocument();
    expect(screen.getByText(reviews[0].rating)).toBeInTheDocument();
    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(reviews[1].user)).toBeInTheDocument();
    expect(screen.getByText(reviews[1].rating)).toBeInTheDocument();
    expect(screen.getByText(reviews[1].comment)).toBeInTheDocument();
  });
});
