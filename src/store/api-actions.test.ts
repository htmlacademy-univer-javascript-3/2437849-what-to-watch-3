import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';

import {createAPI} from './api';
import {
  checkAuth, login, logout, fetchFilm, fetchPromo, fetchFilms, fetchSimilar, setFavoriteStatus, fetchFavoriteFilms,
  fetchReviews, addReview
} from './api-actions';
import {RootState} from './index';

import {AuthorizationData} from '../types/auth-data';

import {getTestFilm, getTestFilms, getTestReviews, AppThunkDispatch, extractActionsTypes} from '../mocks/mocks';

describe('async actions', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);

  const film = getTestFilm();
  const films = getTestFilms();
  const reviews = getTestReviews();
  const authorizationData: AuthorizationData = {
    email: 'e@mail.ru',
    password: 's0mego2dpAs2W0rd'
  };

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  it('Should set authorized when response code is 200', async () => {
    mockApi.onGet('/login').reply(200);
    await store.dispatch(checkAuth());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([checkAuth.pending.type, checkAuth.fulfilled.type]);
  });

  it('Should set no authorized when response code is 400', async () => {
    mockApi.onGet('/login').reply(400);
    await store.dispatch(checkAuth());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([checkAuth.pending.type, checkAuth.rejected.type]);
  });

  it('Should dispatch login when post login', async () => {
    mockApi.onPost('/login').reply(200);
    await store.dispatch(login(authorizationData));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([login.pending.type, login.fulfilled.type]);
  });

  it('Should dispatch logout when delete logout', async () => {
    mockApi.onDelete('/logout').reply(204);
    await store.dispatch(logout());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([logout.pending.type, logout.fulfilled.type]);
  });

  it('Should dispatch film when get film by id and response code is 200', async () => {
    mockApi.onGet('/films/1').reply(200, film);
    await store.dispatch(fetchFilm('1'));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchFilm.pending.type, fetchFilm.fulfilled.type]);
  });

  it('Should dispatch film when get film by id and response code is 400', async () => {
    mockApi.onGet('/films/1').reply(400, film);
    await store.dispatch(fetchFilm('1'));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchFilm.pending.type, fetchFilm.rejected.type]);
  });

  it('Should dispatch promo when get promo and response code is 200', async () => {
    mockApi.onGet('/promo').reply(200, film);
    await store.dispatch(fetchPromo());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchPromo.pending.type, fetchPromo.fulfilled.type]);
  });

  it('Should dispatch promo when get promo and response code is 400', async () => {
    mockApi.onGet('/promo').reply(400, film);
    await store.dispatch(fetchPromo());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchPromo.pending.type, fetchPromo.rejected.type]);
  });

  it('Should dispatch films when get films and response code is 200', async () => {
    mockApi.onGet('/films').reply(200, films);
    await store.dispatch(fetchFilms());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchFilms.pending.type, fetchFilms.fulfilled.type]);
  });

  it('Should dispatch films when get films and response code is 400', async () => {
    mockApi.onGet('/films').reply(400, films);
    await store.dispatch(fetchFilms());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchFilms.pending.type, fetchFilms.rejected.type]);
  });

  it('Should dispatch similar films when get similar and response code is 200', async () => {
    mockApi.onGet('films/1/similar').reply(200, films);
    await store.dispatch(fetchSimilar('1'));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchSimilar.pending.type, fetchSimilar.fulfilled.type]);
  });

  it('Should dispatch similar films when get similar and response code is 400', async () => {
    mockApi.onGet('films/1/similar').reply(400, films);
    await store.dispatch(fetchSimilar('1'));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchSimilar.pending.type, fetchSimilar.rejected.type]);
  });

  it('Should dispatch favorite films when get favorite and response code is 200', async () => {
    mockApi.onGet('/favorite').reply(200, films);
    await store.dispatch(fetchFavoriteFilms());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchFavoriteFilms.pending.type, fetchFavoriteFilms.fulfilled.type]);
  });

  it('Should dispatch favorite films when get favorite and response code is 400', async () => {
    mockApi.onGet('/favorite').reply(400, films);
    await store.dispatch(fetchFavoriteFilms());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchFavoriteFilms.pending.type, fetchFavoriteFilms.rejected.type]);
  });

  it('Should set favorite status when post status and response code is 200', async () => {
    const statusData = {
      filmId: '1',
      status: true
    };
    mockApi.onPost('/favorite/1/1').reply(200);
    await store.dispatch(setFavoriteStatus(statusData));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([setFavoriteStatus.pending.type, setFavoriteStatus.fulfilled.type]);
  });

  it('Should set favorite status when post status and response code is 400', async () => {
    const statusData = {
      filmId: '1',
      status: true
    };
    mockApi.onPost('/favorite/1/1').reply(400);
    await store.dispatch(setFavoriteStatus(statusData));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([setFavoriteStatus.pending.type, setFavoriteStatus.rejected.type]);
  });

  it('Should dispatch reviews when get comments and response code is 200', async () => {
    mockApi.onGet('/comments/1').reply(200, reviews);
    await store.dispatch(fetchReviews('1'));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchReviews.pending.type, fetchReviews.fulfilled.type]);
  });

  it('Should dispatch reviews when get comments and response code is 400', async () => {
    mockApi.onGet('/comments/1').reply(400, reviews);
    await store.dispatch(fetchReviews('1'));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchReviews.pending.type, fetchReviews.rejected.type]);
  });

  it('Should post review when response code is 200', async () => {
    const reviewData = {
      filmId: '1',
      comment: reviews[0].comment,
      rating: reviews[0].rating,
    };
    mockApi.onPost(`/comments/${reviewData.filmId}`).reply(200);
    await store.dispatch(addReview(reviewData));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([addReview.pending.type, addReview.fulfilled.type]);
  });

  it('Should post review when response code is 400', async () => {
    const reviewData = {
      filmId: '1',
      comment: reviews[0].comment,
      rating: reviews[0].rating,
    };
    mockApi.onPost(`/comments/${reviewData.filmId}`).reply(400);
    await store.dispatch(addReview(reviewData));
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([addReview.pending.type, addReview.rejected.type]);
  });
});
