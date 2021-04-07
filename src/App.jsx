import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.module.css';
import Login from './components/login/login';
import Main from './components/main/main';

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
        </Switch>
      </BrowserRouter>
  );
}

export default App;
