import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { UserEdit } from './pages/UserEdit'

import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route path="/users/:userId" component={UserEdit} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
