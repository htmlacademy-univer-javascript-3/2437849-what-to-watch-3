import {AuthorizationStatus} from './auth-status';
import {User} from './user';

export type AuthorizationReducerState = {
  authorizationStatus: AuthorizationStatus;
  authorizationError: string | null | undefined;
  user: User | null;
};
