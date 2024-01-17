import {render, screen} from '@testing-library/react';

import {Main} from './main';
import {withStore, withRouter, getTestFilm} from '../../../mocks/mocks';

describe('Main component', () => {
  it('Should render page correctly', () => {
    const film = getTestFilm();

    const {component} = withStore(withRouter(<Main/>));
    render(component);

    expect(screen.getAllByText(film.name)[0]).toBeInTheDocument();
    expect(screen.getAllByText(film.genre)[0]).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
