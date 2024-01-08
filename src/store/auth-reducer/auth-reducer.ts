import {createAction, createSlice} from '@reduxjs/toolkit';

import {checkAuth, login, logout} from '../api-actions';
import {setToken, removeToken} from '../token';

import {ReducerType} from '../../types/reducer-types';
import {AuthorizationStatus} from '../../types/auth-status';
import {AuthorizationReducerState} from '../../types/auth-reducer-state';

const initialState: AuthorizationReducerState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  authorizationError: null,
};

export const setAuthError = createAction('SET_AUTH_ERROR', (status: string | null) => ({
  payload: status
}));

export const authReducer = createSlice({
  name: ReducerType.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuthorized;
      })
      .addCase(checkAuth.fulfilled, (state, action)=> {
        state.authorizationStatus = AuthorizationStatus.Authorized;
        state.userInfo = action.payload;
        setToken(action.payload.token);
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuthorized;
        state.userInfo = null;
        removeToken();
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Authorized;
        state.userInfo = action.payload;
        setToken(action.payload.token);
      })
      .addCase(login.rejected, (state, action)=> {
        if (action.payload) {
          state.authError = action.payload.details.map((item) => item.messages).join('\n');
        } else {
          state.authError = action.error.message;
        }
      })
      .addCase(setAuthError, (state, {payload}) => {
        state.authError = payload;
      });
  },
});
