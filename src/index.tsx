import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { CITY } from './mocks/city';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message/error-message';
import { fetchOffersAction } from './store/api-actions';

// store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const MOCK_OFFERS_COUNT = 313;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App offersCount={MOCK_OFFERS_COUNT} city={CITY} />
    </Provider>
  </React.StrictMode>
);
