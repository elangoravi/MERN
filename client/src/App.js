import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavComponent from './Components/NavComponent';
import Registration from './Components/Registration'
import Profile from './Components/Profile';

function App() {
  return (
    <Router>
      <div>
        <NavComponent />
        <Switch>
          <Route path="/Registration">
            <Registration />
          </Route>
          <Route path="/Profile/update">
            <Profile type="update" />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
