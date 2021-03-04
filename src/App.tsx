/* eslint-disable no-magic-numbers */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PointForm from './components/PointForm';
import { Home } from './pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/new-project" component={ Home } />
        <Route path="/:project/points/:id" component={ Home } />
        <Route path="/:project/points/:id" component={ Home } />
        <Route path="/:project/points" component={ Home } />
      </Switch>
      <PointForm />
    </div>
  );
}

export default App;
