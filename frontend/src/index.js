import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import {Provider} from 'react-redux';
import App from './App';
import { store } from './redux/store';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
        domain="henryeraso.us.auth0.com"
        clientId="b7Rk3YaxIypzBNXRaXCCSJexsHLYaZdG"
        redirectUri={window.location.origin}
      >
      {/* <Auth0Provider
    domain="henryeraso.us.auth0.com"
    clientId="YmAgOPliSUN9bqQrUQH9zGoS2lhdyUa8"
    redirectUri={window.location.origin}
  > */}
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </React.StrictMode>
  ,
  document.getElementById('root')
);

