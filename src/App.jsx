import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.module.css';
import Board from './components/board/board';
import Discuss from './components/discuss/discuss';
import Dish from './components/dish/dish';
import Login from './components/login/login';
import Main from './components/main/main';
import Popular from './components/popular/popular';

function App({ firebaseAuth }) {

  return (
      <BrowserRouter basename="/seouldae-ipgu">
        <Switch>
          <Route path="/" exact>
            <Login 
                firebaseAuth={firebaseAuth}
              />
          </Route>
          <Route path="/main">
            <Main 
              firebaseAuth={firebaseAuth}
            />
          </Route>
          <Route path="/popular">
            <Popular
              firebaseAuth={firebaseAuth}
            />
          </Route>
          <Route path="/board">
            <Board
              firebaseAuth={firebaseAuth}
            />
          </Route>
          <Route path="/discuss">
            <Discuss
            firebaseAuth={firebaseAuth}
            />
          </Route>
          <Route path="/dish">
            <Dish
            firebaseAuth={firebaseAuth}
            />
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
