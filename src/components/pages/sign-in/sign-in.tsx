import {FormEvent, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

import {useAppSelector} from '../../../store/hooks/use-app-selector';
import {useAppDispatch} from '../../../store/hooks/use-app-dispatch';
import {login} from '../../../store/api-actions';
import {getAuthError, getAuthorizationStatus} from '../../../store/reducers-selectors';
import {setAuthError} from '../../../store/auth-reducer';

import {Header} from '../../header/header';
import {Footer} from '../../footer/footer';

import {AppRoute} from '../../../types/app-routes';
import {AuthorizationStatus} from '../../../types/auth-status';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const error = useAppSelector(getAuthError);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(setAuthError(null));
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Authorized) {
    return <Navigate to={AppRoute.Main}/>;
  }

  function handleAuthorizationFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password || isDisabled){
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
    if (!emailRegex.test(email)){
      dispatch(setAuthError('Incorrect email'));
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/g;
    if (!passwordRegex.test(password)){
      dispatch(setAuthError('The password must contain one letter and one digit'));
      return;
    }

    setIsDisabled(true);
    dispatch(login({email, password})).then(() => {
      setIsDisabled(false);
    }).catch(() => {
      setIsDisabled(false);
    });
  }

  return (
    <div className="user-page">
      <Header/>

      <div className="sign-in user-page__content">
        <form action="src/components/pages#" className="sign-in__form" onSubmit={handleAuthorizationFormSubmit}>
          {error && (
            <div className="sign-in__message">
              <p>{error}</p>
            </div>)}

          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" id="user-email" placeholder="Email address" name="user-email"
                value={email} required onChange={(event) => setEmail(event.target.value)}
              />

              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>

            <div className="sign-in__field">
              <input className="sign-in__input" type="password" id="user-password" placeholder="Password" name="user-password"
                required value={password} onChange={(event) => setPassword(event.target.value)}
              />

              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>

          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" disabled={isDisabled}>Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
}
