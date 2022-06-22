import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "../src/store";
import { BrowserRouter } from 'react-router-dom';
import {Auth0Provider} from "@auth0/auth0-react"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Auth0Provider  
      domain= "dev-0ugs9570.us.auth0.com" 
      clientId = "3hPnhIlpgERx7128560eXvMKnCNNqumY" 
      redirectUri={window.location.origin}
      audience="https://dev-0ugs9570.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
      <App />
      </Auth0Provider>
      </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
