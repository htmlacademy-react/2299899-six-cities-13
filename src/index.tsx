import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { MOCK_OFFERS } from './mocks/offers';
import { CITY } from './mocks/city';

const MOCK_OFFERS_COUNT = 313;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={MOCK_OFFERS_COUNT} offers={MOCK_OFFERS} city={CITY} />
  </React.StrictMode>
);
