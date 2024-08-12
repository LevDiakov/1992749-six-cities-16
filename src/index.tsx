import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { offers } from './mocks/offers';
import { setOffers } from './features/sorting-offers-by-cities';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction } from './store/api-actions';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
store.dispatch(setOffers(offers));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
