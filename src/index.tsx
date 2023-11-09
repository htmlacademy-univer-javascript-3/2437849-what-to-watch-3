import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App mainParams={{
      film: {
        name: 'The Grand Budapest Hotel',
        image: 'img/bg-the-grand-budapest-hotel.jpg',
        genre: 'Drama',
        date: new Date('02.06.2014')
      }
    }}
    />
  </React.StrictMode>
);
