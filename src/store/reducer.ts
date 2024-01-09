import {combineReducers} from '@reduxjs/toolkit';

import {filmReducer} from './film-reducer';
import {authReducer} from './auth-reducer';

import {ReducerType} from '../types/reducer-types';

export const reducer = combineReducers({
  [ReducerType.Film]: filmReducer.reducer,
  [ReducerType.Auth]: authReducer.reducer,
});
