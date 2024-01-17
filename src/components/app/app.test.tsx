import {render, screen} from '@testing-library/react';

import {App} from './app';
import {withStore, withRouter, getTestFilm, getRootState} from '../../mocks/mocks';
import {AuthorizationStatus} from '../../types/auth-status';

const film = getTestFilm();

describe('App component if logged', () => {
  const state = getRootState(AuthorizationStatus.Authorized);
  const routes = ['/'];
  const store = withStore(withRouter(<App/>, routes), state);

  it('Should render main if /', () => {
    render(store.component);

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('Should render main if /login', () => {
    routes.push('/login');
    render(store.component);

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('Should render movie if /films/:id', () => {
    routes.push('/films/1');
    render(store.component);

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('Should render player if /player/:id', () => {
    routes.push('/player/1');
    render(store.component);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });

  it('Should render review form if /films/:id/review', () => {
    routes.push('/films/1/review');
    render(store.component);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('Should render my list if /mylist', () => {
    routes.push('/mylist');
    render(store.component);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('Should render not found if *', () => {
    routes.push('/some_wrong_route');
    render(store.component);

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });
});

describe('App component if not logged', () => {
  const state = getRootState(AuthorizationStatus.NoAuthorized);
  const routes = ['/'];
  const store = withStore(withRouter(<App/>, routes), state);

  it('Should render main if /', () => {
    render(store.component);

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('Should render login if /login', () => {
    routes.push('/login');
    render(store.component);

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('Should render movie if /films/:id', () => {
    routes.push('/films/1');
    render(store.component);

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('Should render player if /player/:id', () => {
    routes.push('/player/1');
    render(store.component);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });

  it('Should render login if /films/:id/review', () => {
    routes.push('/films/1/review');
    render(store.component);

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('Should render login if /mylist', () => {
    routes.push('/mylist');
    render(store.component);

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('Should render not found if *', () => {
    routes.push('/some_wrong_route');
    render(store.component);

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });
});
