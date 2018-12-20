import React, { Component } from 'react';
import '../styles/App.css';
import Header from './Header';
import CatList from './CatList';
import FavList from './FavList';

import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <CatList />
          <Route exact path="/f/" component={FavList} />
        </div>
      </Router>
    );
  }
}

export default App;