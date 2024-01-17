import {render, screen} from '@testing-library/react';

import {FilmList} from './film-list';
import {withRouter, getTestFilms} from '../../mocks/mocks';

describe('Film list component', () => {
  it('Should render component correctly', () => {
    const films = getTestFilms();

    render(withRouter(<FilmList films={films}/>));

    expect(screen.getByText(films[0].name)).toBeInTheDocument();
    expect(screen.getByText(films[1].name)).toBeInTheDocument();
  });
});
