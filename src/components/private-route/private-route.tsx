import {JSX} from 'react';
import {Navigate} from 'react-router-dom';

import {useAppSelector} from '../../store/hooks/use-app-selector';
import {getAuthorizationStatus} from '../../store/reducers-selectors';

import {AppRoute} from '../../types/app-routes';
import {AuthorizationStatus} from '../../types/auth-status';

type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRoute({children} : PrivateRouteProps) {
  return useAppSelector(getAuthorizationStatus) !== AuthorizationStatus.NoAuthorized
    ? children
    : <Navigate to={AppRoute.Login}/>;
}
