import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {App} from './components/app/app';
import {store} from './store';
import {checkAuth, fetchFavoriteFilms, fetchFilms, fetchPromo} from './store/api-actions';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilms());
store.dispatch(fetchPromo());
store.dispatch(checkAuth());
store.dispatch(fetchFavoriteFilms());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
