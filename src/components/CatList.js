import React, { Component } from 'react';
import CatDetail from './CatDetail';


class CatList extends Component {

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

  ComponentWillMount() {

    axios

  }

  renderList() {
    const { cats, facts} = this.state;
    return cats.map({(cat,index) => 
      <CatDetail key={cat.id._text} id={cat.id._text}   />
    })
  }


  render() {
    return (


    );
  }


}

export default CatList;