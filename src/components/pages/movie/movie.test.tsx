import {Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

import {Movie} from './movie';
import {withStore, withRouter, getTestFilm} from '../../../mocks/mocks';

describe('Movie component', () => {
  it('Should render page correctly', () => {
    const film = getTestFilm();

    const store = withStore(withRouter(
      <Routes>
        <Route path="/:id" element={<Movie/>}/>
      </Routes>, ['/1']));
    render(store.component);

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
  });
});
