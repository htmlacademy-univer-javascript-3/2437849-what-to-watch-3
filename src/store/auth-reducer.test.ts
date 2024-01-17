import {authReducer, setAuthError} from './auth-reducer';
import {checkAuth, login, logout} from './api-actions';

import {AuthorizationStatus} from '../types/auth-status';
import {AuthorizationReducerState} from '../types/auth-reducer-state';

import {getTestUser} from '../mocks/mocks';

const user = getTestUser();
const errorMessage = 'Some error message';

describe('Auth reducer slice', () => {
  let initialState: AuthorizationReducerState;

  beforeEach(() => {
    initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authorizationError: null,
      user: null
    };
  });

  it('Should return initial state without parameters', () => {
    const action = {type: ''};
    const result = authReducer.reducer(void (0), action);
    expect(result).toEqual(initialState);
  });

  it('Should set authorized with fulfilled action', () => {
    const action = {type: login.fulfilled.type, payload: user};
    const result = authReducer.reducer(initialState, action);
    expect(result.authorizationStatus).toEqual(AuthorizationStatus.Authorized);
  });

  it('Should set user information with fulfilled action', () => {
    const action = {type: login.fulfilled.type, payload: user};
    const result = authReducer.reducer(initialState, action);
    expect(result.user).toEqual(user);
  });

  it('Should not set authorized with rejected action', () => {
    const action = {type: login.rejected.type, error: {message: errorMessage}};
    const result = authReducer.reducer(initialState, action);
    expect(result.authorizationStatus).toEqual(AuthorizationStatus.Unknown);
  });

  it('Should set error with rejected action', () => {
    const action = {type: login.rejected.type, error: {message: errorMessage}};
    const result = authReducer.reducer(initialState, action);
    expect(result.authorizationError).toEqual(errorMessage);
  });

  it('Should set user information null with fulfilled action', () => {
    initialState.user = user;
    const action = {type: logout.fulfilled.type};
    const result = authReducer.reducer(initialState, action);
    expect(result.user).toEqual(null);
  });

  it('Should set no authorized with fulfilled action', () => {
    const action = {type: logout.fulfilled.type};
    const result = authReducer.reducer(initialState, action);
    expect(result.authorizationStatus).toEqual(AuthorizationStatus.NoAuthorized);
  });

  it('Should set user information with fulfilled action', () => {
    const action = {type: checkAuth.fulfilled.type, payload: user};
    const result = authReducer.reducer(initialState, action);
    expect(result.user).toEqual(user);
  });

  it('Should set authorized with fulfilled action', () => {
    const action = {type: checkAuth.fulfilled.type, payload: user};
    const result = authReducer.reducer(initialState, action);
    expect(result.authorizationStatus).toEqual(AuthorizationStatus.Authorized);
  });

  it('Should set no authorized with rejected action', () => {
    const action = {type: checkAuth.rejected.type};
    const result = authReducer.reducer(initialState, action);
    expect(result.authorizationStatus).toEqual(AuthorizationStatus.NoAuthorized);
  });

  it('Should set authorization error', () => {
    const action = {type: setAuthError.type, payload: errorMessage};
    const result = authReducer.reducer(initialState, action);
    expect(result.authorizationError).toEqual(errorMessage);
  });

  it('Should clear error', () => {
    const action = {type: setAuthError.type, payload: null};
    const result = authReducer.reducer(initialState, action);
    expect(result.authorizationError).toEqual(null);
  });
});
