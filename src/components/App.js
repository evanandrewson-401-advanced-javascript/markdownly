import React from 'react';
import Document from './markdown/Document';
import Header from './header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Document} />
        <Route path="/:id" component={Document} />
      </Switch>
    </Router>
  );
}
