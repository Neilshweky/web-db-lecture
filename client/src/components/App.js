import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Todos from './Todos';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/home' render={() => <Home />} />
            <Route exact path='/todos' render={() => <Todos />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
