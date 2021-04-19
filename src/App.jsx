import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.module.css';
import Board from './components/board/board';
import View from './components/board/view/view';
import Discuss from './components/discuss/discuss';
import Dish from './components/dish/dish';
import Login from './components/login/login';
import Main from './components/main/main';
import Popular from './components/popular/popular';

function App({ firebaseAuth, database, firebasePopular, imageUploader }) {

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
              firebasePopular={firebasePopular}
              ImageUploader={imageUploader}
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
              database={database}
              imageUploader={imageUploader}
            />
          </Route>
          <Route path="/discuss">
            <Discuss
            firebaseAuth={firebaseAuth}
            database={database}
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
