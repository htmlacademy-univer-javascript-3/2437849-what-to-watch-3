import {JSX} from 'react';
import {Navigate} from 'react-router-dom';


type PrivateRouteProps = {
  children : JSX.Element;
}

export function PrivateRoute({children} : PrivateRouteProps){
  const authorized = false;
  return authorized
    ? children
    : <Navigate to={'/login'}/>;
}
