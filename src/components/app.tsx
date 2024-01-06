import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Main, MainProps} from './pages/main';
import {SignIn} from './pages/sign-in';
import {MyList} from './pages/my-list';
import {MoviePage} from './pages/movie-page';
import {AddReview} from './pages/add-review';
import {Player} from './pages/player';
import {NotFound} from './pages/not-found';
import {PrivateRoute} from './routes/private-route';

export enum AppRoute {
  MainPage = '/',
  LoginPage = '/login',
  MyListPage = '/mylist',
  FilmPage = '/films/:id',
  ReviewPage = '/films/:id/review',
  PlayerPage = '/player/:id',
  NotFoundPage = '*',
}

type AppProps = {
  mainParams: MainProps;
}

export function App({mainParams}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MainPage} element={<Main {...mainParams}/>} />
        <Route path={AppRoute.LoginPage} element={<SignIn />} />
        <Route path={AppRoute.MyListPage} element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.FilmPage} element={<MoviePage />} />
        <Route path={AppRoute.ReviewPage} element={
          <AddReview />
        }
        />
        <Route path={AppRoute.PlayerPage} element={<Player />} />
        <Route path={AppRoute.NotFoundPage} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
