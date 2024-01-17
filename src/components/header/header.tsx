import {JSX} from 'react';
import {Link} from 'react-router-dom';

import {useAppSelector} from '../../store/hooks/use-app-selector';
import {useAppDispatch} from '../../store/hooks/use-app-dispatch';
import {getAuthorizationStatus, getUser} from '../../store/reducers-selectors';
import {logout} from '../../store/api-actions';

import {AppRoute} from '../../types/app-routes';
import {AuthorizationStatus} from '../../types/auth-status';
import {Logo} from '../logo/logo';

type HeaderProps = {
  children?: JSX.Element;
  headerClass?: string;
}

export function Header({children, headerClass}: HeaderProps) {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();
  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <h1 className="visually-hidden">WTW</h1>

      <header className={`page-header ${headerClass}`}>
        <Logo/>

        {children}

        <ul className="user-block">
          {authStatus === AuthorizationStatus.Authorized && user && (
            <>
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <Link to={AppRoute.MyList}>
                    <img src={user.avatarUrl} alt={user.name} width={63} height={63}/>
                  </Link>
                </div>
              </li>

              <li className="user-block__item">
                <Link to={AppRoute.Login} className="user-block__link" onClick={handleLogoutClick}>Sign out</Link>
              </li>
            </>
          )}

          {authStatus === AuthorizationStatus.NoAuthorized &&
            (<Link to={AppRoute.Login} className="user-block__link">Sign in</Link>)}
        </ul>
      </header>
    </>
  );
}
