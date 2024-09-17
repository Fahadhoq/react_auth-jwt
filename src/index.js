import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './app/store';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store} >
        <App />
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
