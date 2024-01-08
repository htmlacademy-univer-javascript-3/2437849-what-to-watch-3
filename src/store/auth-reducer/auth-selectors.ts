import {RootState} from '../index';
import {ReducerType} from '../../types/reducer-types';

export const getUser = (state: RootState) => state[ReducerType.Auth].user;
export const getAuthError = (state: RootState) => state[ReducerType.Auth].authorizationError;
export const getAuthorizationStatus = (state: RootState) => state[ReducerType.Auth].authorizationStatus;
