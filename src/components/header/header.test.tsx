import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Header} from './header';
import {withRouter, withStore, extractActionsTypes, getTestUser} from '../../mocks/mocks';
import {ReducerType} from '../../types/reducer-types';
import {AuthorizationStatus} from '../../types/auth-status';
import {logout} from '../../store/api-actions';

describe('Header component', () => {
  it('Should render component correctly', () => {
    const store = withStore(withRouter(<Header/>));
    render(store.component);

    expect(screen.queryByText(/sign in/i)).toBeInTheDocument();
  });

  const user = getTestUser();

  it('Should render sign out correctly', () => {
    const store = withStore(
      withRouter(<Header/>),
      {
        [ReducerType.Auth]: {
          authorizationStatus: AuthorizationStatus.Authorized,
          user: user
        }
      }
    );
    render(store.component);

    expect(screen.queryByText(/Sign out/i)).toBeInTheDocument();
  });

  it('Should handle correctly', async () => {
    const store = withStore(
      withRouter(<Header/>),
      {
        [ReducerType.Auth]: {
          authorizationStatus: AuthorizationStatus.Authorized,
          user: user
        }
      }
    );
    render(store.component);

    await userEvent.click(screen.getByText(/sign out/i));

    expect(extractActionsTypes(store.mockStore.getActions())).toEqual([logout.pending.type, logout.rejected.type]);
  });
});
