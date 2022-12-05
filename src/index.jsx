import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Notification from './components/Elements/Notification';
import reportWebVitals from './helpers/reportWebVitals';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Notification />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
