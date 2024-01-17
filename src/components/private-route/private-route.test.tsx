import {Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

import {PrivateRoute} from './private-route';
import {withRouter, withStore, getRootState} from '../../mocks/mocks';
import {AuthorizationStatus} from '../../types/auth-status';

const initialEntries = ['/'];

describe('Private route component', () => {
  beforeEach(() => {
    initialEntries.push('/private');
  });

  it('Should render login if not authorized', () => {
    const store = withStore(
      withRouter(
        <Routes>
          <Route path='/login' element={<h1>Public</h1>}/>
          <Route path='/private' element={
            <PrivateRoute >
              <h1>Private</h1>
            </PrivateRoute>
          }
          />
        </Routes>,
        initialEntries
      )
    );
    render(store.component);

    expect(screen.getByText(/public/i)).toBeInTheDocument();
    expect(screen.queryByText(/private/i)).not.toBeInTheDocument();
  });

  it('Should render private if authorized', () => {
    const store = withStore(
      withRouter(
        <Routes>
          <Route path='/login' element={<h1>Public</h1>}/>
          <Route path='/private' element={
            <PrivateRoute >
              <h1>Private</h1>
            </PrivateRoute>
          }
          />
        </Routes>,
        initialEntries
      ),
      getRootState(AuthorizationStatus.Authorized)
    );
    render(store.component);

    expect(screen.queryByText(/public/i)).not.toBeInTheDocument();
    expect(screen.getByText(/private/i)).toBeInTheDocument();
  });
});
