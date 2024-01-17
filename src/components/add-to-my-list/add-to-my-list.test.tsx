import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {AddToMyList} from './add-to-my-list';
import {setFavoriteStatus} from '../../store/api-actions';
import {withStore, extractActionsTypes, getTestFilm, getTestFilms} from '../../mocks/mocks';
import {ReducerType} from '../../types/reducer-types';

const film = getTestFilm();
const films = getTestFilms();

describe('Add to my list component', () => {
  it('Should render component correctly', () => {
    const store = withStore(<AddToMyList filmId={film.id} status={film.isFavorite}/>);
    render(store.component);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeInTheDocument();
  });

  it('Should render in my list correctly', () => {
    const store = withStore(
      <AddToMyList filmId={film.id} status />,
      {
        [ReducerType.Film]: {
          favoriteFilms: [film]
        }
      });
    render(store.component);
    expect(screen.getByTestId('in-list')).toBeInTheDocument();
  });

  it('Should display films count correctly', () => {
    const store = withStore(
      <AddToMyList filmId={film.id} status={film.isFavorite}/>,
      {
        [ReducerType.Film]: {
          favoriteFilms: films
        }
      }
    );
    render(store.component);

    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });

  it('Should handle correctly', async () => {
    const store = withStore(<AddToMyList filmId={film.id} status={film.isFavorite} />);
    store.mockApi.onPost('/favorite/1/0').reply(200, {...film, isFavorite: true});
    store.mockApi.onPost('/favorite/1/1').reply(200, {...film, isFavorite: true});
    render(store.component);

    expect(screen.getByTestId('add')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(store.mockStore.getActions());

    expect(actions).toEqual([setFavoriteStatus.pending.type, setFavoriteStatus.fulfilled.type]);
  });
});
