import React, { Component } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import convert from 'xml-js';

import CatDetail from './CatDetail';

const masonryOptions = {
  transitionDuration: 0
};


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

    axios.all([
      axios.get('https://cors-anywhere.herokuapp.com/http://thecatapi.com/api/images/get?format=xml&results_per_page=25'),
      axios.get('https://cors-anywhere.herokuapp.com/https://catfact.ninja/facts?limit=25')
    ])
    .then(axios.spread((catRes, factRes) => {

      /* cat response */
      

      /* fact response */

    })

  }

  renderList() {
    const { cats, facts} = this.state;
    return cats.map( (cat,index) => 
      <CatDetail key={cat.id._text} id={cat.id._text} fact={facts[index]} url={cat.url} />
    )
  }


  render() {
    return (
      <Masonry
        options={masonryOptions} 
        disableImagesLoaded={false} 
        updateOnEachImageLoad={false} 
      >
        {this.renderList()}
      </Masonry>

    );
  }


}

export default CatList;
