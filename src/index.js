import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.css';
import App from './App';
import FirebaseAuth from './services/firebaseAuth';
import Database from './services/database';

const firebaseAuth = new FirebaseAuth();
const database = new Database();

ReactDOM.render(
  <React.StrictMode>
    <App 
      firebaseAuth={firebaseAuth}
      database={database}
    />
  </React.StrictMode>,
  document.getElementById('root')
);