import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.css';
import App from './App';
import FirebaseAuth from './services/firebaseAuth';
import DiscussDatabase from './services/discussDatabase';

const firebaseAuth = new FirebaseAuth();
const discussDatabase = new DiscussDatabase();

ReactDOM.render(
  <React.StrictMode>
    <App 
      firebaseAuth={firebaseAuth}
      discussDatabase={discussDatabase}
    />
  </React.StrictMode>,
  document.getElementById('root')
);