import {Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

import {AddReview} from './add-review-page';
import {withStore, withRouter, getTestFilm} from '../../../mocks/mocks';
import {ReducerType} from '../../../types/reducer-types';

describe('Add review component', () => {
  it('Should render page correctly', () => {
    const film = getTestFilm();

    const store = withStore(
      withRouter(
        <Routes>
          <Route path="/:id" element={<AddReview/>}/>
        </Routes>,
        ['/1']),
      {
        [ReducerType.Film]: {
          selectedFilm: film
        }
      }
    );
    render(store.component);

    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByTestId('stars-component')).toBeInTheDocument();
  });
});
