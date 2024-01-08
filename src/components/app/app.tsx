import {Route, Routes} from 'react-router-dom';

import {AppRoute} from '../../types/app-routes';
import {Main} from '../pages/main/main';
import {SignIn} from '../pages/sign-in/sign-in';
import {MyList} from '../pages/my-list/my-list';
import {AddReview} from '../pages/add-review/add-review-page';
import {Movie} from '../pages/movie/movie';
import {Player} from '../pages/player/player';

import {NotFound} from '../not-found/not-found';
import {PrivateRoute} from '../private-route/private-route';

export function App() {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Main/>}/>
      <Route path={AppRoute.Login} element={<SignIn/>}/>
      <Route path={AppRoute.MyList} element={
        <PrivateRoute>
          <MyList/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Film} element={<Movie/>}/>
      <Route path={AppRoute.Review} element={
        <PrivateRoute>
          <AddReview/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Player} element={<Player/>}/>
      <Route path={AppRoute.NotFound} element={<NotFound/>}/>
    </Routes>
  );
}
