import React, { Component } from 'react';
import '../styles/App.css';
import CatList from './CatList';


class App extends Component {
  render() {
    return (
        <div className="App">
          <CatList />
        </div>
    );
  }
}

export default App;