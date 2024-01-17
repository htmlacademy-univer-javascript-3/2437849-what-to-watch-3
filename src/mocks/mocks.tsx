import {JSX} from 'react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {InitialEntry} from '@remix-run/router';

import {createAPI} from '../store/api';
import {RootState} from '../store';
import {ALL_GENRES} from '../store/film-reducer';

import {Film} from '../types/film';
import {Review} from '../types/review';
import {User} from '../types/user';
import {AuthorizationStatus} from '../types/auth-status';
import {ReducerType} from '../types/reducer-types';
import {AuthorizationReducerState} from '../types/auth-reducer-state';
import {FilmReducerState} from '../types/film-reducer-state';

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const getTestFilm = (): Film => ({
  id: '1',
  name: 'First film',
  genre: 'Drama',
  posterImage: 'img/first-film.jpg',
  backgroundImage: 'img/first-film.jpg',
  videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  released: 2001,
  isFavorite: false,
  backgroundColor: '#000000',
  description: 'Some description',
  rating: 4.2,
  scoresCount: 5000,
  director: 'Director',
  starring: ['First actor', 'Second actor', 'Third actor'],
  runTime: 120,
  previewImage: 'img/bg-first-film.jpg',
  previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
});

export const getTestFilms = (): Film[] => [
  {
    id: '1',
    name: 'First film',
    genre: 'Drama',
    posterImage: 'img/first-film.jpg',
    backgroundImage: 'img/first-film.jpg',
    videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    released: 2001,
    isFavorite: false,
    backgroundColor: '#000000',
    description: 'Some description',
    rating: 4.2,
    scoresCount: 5000,
    director: 'Director',
    starring: ['First actor', 'Second actor', 'Third actor'],
    runTime: 120,
    previewImage: 'img/bg-first-film.jpg',
    previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  },
  {
    id: '2',
    name: 'Second film',
    genre: 'Fantasy',
    posterImage: 'img/second-film.jpg',
    backgroundImage: 'img/second-film.jpg',
    videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    released: 2002,
    isFavorite: false,
    backgroundColor: '#ccccff',
    description: 'Another description',
    rating: 8.8,
    scoresCount: 42000,
    director: 'Another director',
    starring: ['Another actor', 'And another actor', 'And another one'],
    runTime: 90,
    previewImage: 'img/bg-second-film.jpg',
    previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  }
];

export const getTestReviews = (): Review[] => [
  {
    id: '1',
    user: 'First user',
    date: '2005-11-11T12:34:56.789Z',
    rating: 6.6,
    comment: 'Some review'
  },
  {
    id: '2',
    user: 'Second user',
    date: '2006-10-10T21:43:05:667Z',
    rating: 7.1,
    comment: 'Another review'
  },
  {
    id: '3',
    user: 'Third user',
    date: '2006-12-12T01:02:03:495Z',
    rating: 3.4,
    comment: 'Maybe review, maybe not'
  }
];

export const getTestUser = (): User => ({
  name: 'My name',
  email: 'e@mail.ru',
  avatarUrl: 'avatar/url/a.jpg',
  token: 'user_token'
});

export const getRootState = (authorizationStatus: AuthorizationStatus): RootState => (
  {
    [ReducerType.Auth]:
      {
        authorizationStatus: authorizationStatus,
        authorizationError: null,
        user: null
      },
    [ReducerType.Film]:
      {
        isLoading: false,
        films: [],
        promo: getTestFilm(),
        selectedFilm: getTestFilm(),
        selectedGenre: ALL_GENRES,
        selectedGenreFilms: [],
        selectedGenreFilmsCount: 0,
        similarFilms: [],
        reviews: [],
        favoriteFilms: [],
        genres: [ALL_GENRES]
      }
  }
);

type ComponentWithMockStore = {
  component: JSX.Element;
  mockStore: MockStore;
  mockApi: MockAdapter;
}

type PartialStore = {
  [ReducerType.Auth]?: Partial<AuthorizationReducerState>;
  [ReducerType.Film]?: Partial<FilmReducerState>;
};

export function withStore(component: JSX.Element, initialState: PartialStore = {}): ComponentWithMockStore {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);

  const store = getRootState(AuthorizationStatus.NoAuthorized);
  if (initialState[ReducerType.Auth]) {
    store[ReducerType.Auth] = {
      ...store[ReducerType.Auth],
      ...initialState[ReducerType.Auth]
    };
  }
  if (initialState[ReducerType.Film]) {
    store[ReducerType.Film] = {
      ...store[ReducerType.Film],
      ...initialState[ReducerType.Film]
    };
  }

  const mockStore = mockStoreCreator(store);
  return ({
    component: <Provider store={mockStore}>{component}</Provider>,
    mockStore: mockStore,
    mockApi: mockApi,
  });
}

export function withRouter(component: JSX.Element, entries?: InitialEntry[]): JSX.Element {
  return (
    <MemoryRouter initialEntries={entries}>
      {component}
    </MemoryRouter>
  );
}
