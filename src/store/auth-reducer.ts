import {createAction, createSlice} from '@reduxjs/toolkit';

import {checkAuth, login, logout} from './api-actions';
import {setToken, removeToken} from './token';

import {ReducerType} from '../types/reducer-types';
import {AuthorizationStatus} from '../types/auth-status';
import {AuthorizationReducerState} from '../types/auth-reducer-state';

const initialState: AuthorizationReducerState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationError: null,
  user: null
};

export const setAuthError = createAction('SET_AUTH_ERROR',
  (status: string | null) => ({payload: status}));

// noinspection TypeScriptValidateTypes
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
        state.user = action.payload;
        setToken(action.payload.token);
      })
      .addCase(setAuthError, (state, {payload}) => {
        state.authorizationError = payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Authorized;
        state.user = action.payload;
        setToken(action.payload.token);
      })
      .addCase(login.rejected, (state, action)=> {
        if (action.payload) {
          state.authorizationError = action.payload.details.map((item) => item.messages).join('\n');
        } else {
          state.authorizationError = action.error.message;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuthorized;
        state.user = null;
        removeToken();
      });
  },
});
