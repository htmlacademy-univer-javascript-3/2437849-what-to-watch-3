import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {GenresList} from './genres-list';
import {ALL_GENRES, setGenreFilter} from '../../store/film-reducer';
import {withStore, extractActionsTypes, getTestFilm} from '../../mocks/mocks';
import {ReducerType} from '../../types/reducer-types';

describe('Genres list component', () => {
  const film = getTestFilm();

  it('Should render component correctly', () => {
    const store = withStore(
      <GenresList/>,
      {
        [ReducerType.Film] : {
          genres: [ALL_GENRES, film.genre]
        }
      }
    );
    render(store.component);

    expect(screen.getByText(ALL_GENRES)).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
  });

  it('Should handle correctly', async () => {
    const store = withStore(
      <GenresList/>,
      {
        [ReducerType.Film] : {
          genres: [ALL_GENRES, film.genre]
        }
      }
    );
    render(store.component);

    await userEvent.click(screen.getByTestId(`button-genre-${film.genre}`));
    const actions = store.mockStore.getActions();

    expect(extractActionsTypes(actions)).toEqual([setGenreFilter.type]);
    expect((actions.at(0) as ReturnType<typeof setGenreFilter>).payload).toBe(film.genre);
  });
});
