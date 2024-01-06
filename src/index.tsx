import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './components/app';
import store from './store/index';
import {Films} from './mocks/films';
import {Details} from './mocks/details';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App mainParams={{
        film: Films[0],
        detail: Details[0]
      }}
      />
    </Provider>
  </React.StrictMode>
);
