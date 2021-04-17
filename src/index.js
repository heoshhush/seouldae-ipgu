import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.css';
import App from './App';
import FirebaseAuth from './services/firebaseAuth';
import Database from './services/database';
import FirebasePopular from './services/firebasePopular';

const firebaseAuth = new FirebaseAuth();
const database = new Database();
const firebasePopular = new FirebasePopular();

ReactDOM.render(
  <React.StrictMode>
    <App 
      firebaseAuth={firebaseAuth}
      database={database}
      firebasePopular={firebasePopular}
    />
  </React.StrictMode>,
  document.getElementById('root')
);