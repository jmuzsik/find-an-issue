import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from '../reuseable/AppliedRoute';
import NotFound from '../reuseable/NotFound';
import Home from '../home/Home';

import './App.css';

import About from '../about/About';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <AppliedRoute exact path="/" component={Home} />
        <AppliedRoute exact path="/about" component={About} />
        <AppliedRoute component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
