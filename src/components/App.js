import React, { Component } from 'react';
import '../styles/App.css';
import Header from './Header';
import CatList from './CatList';
import FavList from './FavList';

import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {

  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);

    this.state = {
      loaded: false,
      cats: [],
      facts: [],
      fav: []
    }
  }

  /* this function sets the state for the app */
  handler (cats,facts) {
    const catData = [...cats];
    const factData = [...facts];
    this.setState({cats: catData});
    this.setState({facts: factData});
    this.setState({loaded: true});
  }

  render() {
    const { loaded, cats, facts } = this.state;
    return (
      <Router>
        <div className="App">
          <Header/>
          <Route exact path="/" component={() => <CatList loaded={loaded} cats={cats} facts={facts} handler={this.handler}/>} />
          <Route exact path="/f/" component={FavList} />
        </div>
      </Router>
    );
  }
}

export default App;