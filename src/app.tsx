import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Main, MainProps} from './pages/main';
import {SignIn} from './pages/sign-in';
import {MyList} from './pages/my-list';
import {MoviePage} from './pages/movie-page';
import {AddReview} from './pages/add-review';
import {Player} from './pages/player';
import {NotFound} from './pages/not-found';
import {PrivateRoute} from './routes/private-route';

type AppProps = {
  mainParams: MainProps;
}

export function App({mainParams}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main {...mainParams}/>}/>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/mylist" element={
          <PrivateRoute>
            <MyList/>
          </PrivateRoute>
        }
        />
        <Route path="/films/:id" element={<MoviePage/>}/>
        <Route path="/films/:id/review" element={<AddReview/>}/>
        <Route path="/player/:id" element={<Player/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
