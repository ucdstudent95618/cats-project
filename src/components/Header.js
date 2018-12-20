import React, { Component } from 'react';

import '../styles/Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {

  goToFavorites = () => {
    this.props.callbackfunctionParent("favorites");
  }
  sort = () => {
    this.props.callbackfunctionParent("sort");
  }
  home = () => {
    this.props.callbackfunctionParent("home");
  }

  render () {
    return (
      <div className="header">
        <div className="button-container">
          <div className="wrapper">
            <button onClick={this.sort} type="button"> Sort </button> 
          </div>
          <div className="wrapper">
            <Link to={`/f/`}> Favorites </Link>
            {/*<button onClick={this.goToFavorites} type="button"> Favorites </button>*/}
          </div>
          <div className="wrapper">
          <Link to={`/`}> Home </Link>
            {/*<button onClick={this.home} type="button"> Home </button> */}
          </div>
        </div>
        
      </div>
    );
  }

};

export default Header;