import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {SignIn} from './sign-in';
import {login} from '../../../store/api-actions';
import {withStore, withRouter, extractActionsTypes, getTestUser} from '../../../mocks/mocks';
import {setAuthError} from '../../../store/auth-reducer';

describe('Sign in component', () => {
  it('Should render page correctly', () => {
    const store = withStore(withRouter(<SignIn/>));
    render(store.component);

    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Should display data correctly', async () => {
    const store = withStore(withRouter(<SignIn/>));
    render(store.component);

    await userEvent.type(screen.getByTestId('email'), 'e@mail.ru');
    await userEvent.type(screen.getByTestId('password'), 's0mego2dpAs2W0rd');

    expect(screen.getByDisplayValue(/e@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/s0mego2dpAs2W0rd/i)).toBeInTheDocument();
  });

  it('Should not send invalid request', async () => {
    const store = withStore(withRouter(<SignIn/>));
    render(store.component);

    await userEvent.type(screen.getByTestId('email'), 'wrong_email');
    await userEvent.type(screen.getByTestId('password'), 'wrong_password');
    await userEvent.click(screen.getByRole('button'));

    expect(extractActionsTypes(store.mockStore.getActions())).toEqual([setAuthError.type]);
  });

  it('Should send corrent request', async () => {
    const user = getTestUser();

    const store = withStore(withRouter(<SignIn/>));
    store.mockApi.onPost('/login').reply(200, user);
    render(store.component);

    await userEvent.type(screen.getByTestId('email'), 'e@mail.ru');
    await userEvent.type(screen.getByTestId('password'), 's0mego2dpAs2W0rd');
    await userEvent.click(screen.getByRole('button'));

    expect(extractActionsTypes(store.mockStore.getActions())).toEqual([setAuthError.type, login.pending.type, login.fulfilled.type]);
  });
});
