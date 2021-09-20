import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/sign-in" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
