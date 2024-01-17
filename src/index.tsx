import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';

import {App} from './components/app/app';
import {store} from './store';
import {checkAuth, fetchFavoriteFilms, fetchPromo, fetchFilms} from './store/api-actions';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(checkAuth());
store.dispatch(fetchFavoriteFilms());
store.dispatch(fetchPromo());
store.dispatch(fetchFilms());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer/>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
