import {render, screen} from '@testing-library/react';

import {Tabs} from './tabs';
import{getTestFilm, getTestReviews} from '../../mocks/mocks';

describe('Tabs component', () => {
  it('Should render component correctly', () => {
    const film = getTestFilm();
    const reviews = getTestReviews();
    render(<Tabs film={film} reviews={reviews}/>);

    expect(screen.getByText(film.description)).toBeInTheDocument();
    expect(screen.getByText(film.rating)).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });
});
