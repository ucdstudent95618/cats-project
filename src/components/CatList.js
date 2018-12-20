import React, { Component } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import convert from 'xml-js';

import CatDetail from './CatDetail';

const masonryOptions = {
  transitionDuration: 0
};


class CatList extends Component {

  state = {
    cats: [ ],
    facts: [ ],
    fav: [ ]
  }


  componentWillMount() {

    axios.all([
      axios.get('https://cors-anywhere.herokuapp.com/http://thecatapi.com/api/images/get?format=xml&results_per_page=25'),
      axios.get('https://cors-anywhere.herokuapp.com/https://catfact.ninja/facts?limit=25')
    ])
    .then(axios.spread((catRes, factRes) => {

      /* cat response */
      const js_xml = convert.xml2js(catRes.data, {compact: true, spaces: 4});

      this.setState({ cats: js_xml.response.data.images.image });

      /* fact response */
      const factData = factRes.data;

      this.setState({ facts: factData.data });
    }));

  }

  myCallback = (data) => {
    this.setState({fav: data});
  }

  renderList() {
    // eslint-disable-next-line
    const { cats, facts } = this.state;

    if (facts.length > 0)
    { 
      return cats.map((cat,index) => 
        <CatDetail 
        key={cat.id._text} 
        id={cat.id._text} 
        url={cat.url._text}  
        fact={facts[index].fact}
        callbackFromParent={this.myCallback} />
      )
    }
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
