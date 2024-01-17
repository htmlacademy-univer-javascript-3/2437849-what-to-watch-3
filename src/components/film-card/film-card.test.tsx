import {render, screen} from '@testing-library/react';

import {FilmCard} from './film-card';
import {withRouter, getTestFilm} from '../../mocks/mocks';

describe('Film card component', () => {
  it('Should render component correctly', () => {
    const film = getTestFilm();

    render(withRouter(<FilmCard film={film}/>));

    expect(screen.getByText(film.name)).toBeInTheDocument();
  });
});
