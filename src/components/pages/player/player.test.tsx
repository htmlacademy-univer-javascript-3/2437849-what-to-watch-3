import {Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

import {Player} from './player';
import {withStore, withRouter, getTestFilm} from '../../../mocks/mocks';

describe('Player component', () => {
  it('Should render page correctly', () => {
    const film = getTestFilm();

    const store = withStore(
      withRouter(
        <Routes>
          <Route path="/:id" element={<Player/>}/>
        </Routes>,
        ['/1']
      )
    );
    render(store.component);

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
