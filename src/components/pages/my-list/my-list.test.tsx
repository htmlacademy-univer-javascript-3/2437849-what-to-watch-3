import {render, screen} from '@testing-library/react';

import {MyList} from './my-list';
import {withStore, withRouter, getTestFilms} from '../../../mocks/mocks';
import {ReducerType} from '../../../types/reducer-types';

describe('My list component', () => {
  it('should render correctly', () => {
    const films = getTestFilms();

    const store = withStore(
      withRouter(<MyList/>),
      {
        [ReducerType.Film]: {
          favoriteFilms: films
        }
      }
    );
    render(store.component);

    expect(screen.queryByText(films[0].name)).toBeInTheDocument();
    expect(screen.queryByText(films[1].name)).toBeInTheDocument();
  });
});
