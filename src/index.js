import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.css';
import App from './App';
import FirebaseAuth from './services/firebaseAuth';

const firebaseAuth = new FirebaseAuth();


ReactDOM.render(
  <React.StrictMode>
    <App 
      firebaseAuth={firebaseAuth}
    />
  </React.StrictMode>,
  document.getElementById('root')
);