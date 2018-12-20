import React, { Component } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import convert from 'xml-js';

import CatDetail from './CatDetail';
import Header from './Header';

const masonryOptions = {
  transitionDuration: 0
};


class CatList extends Component {

  state = {
    cats: [],
    fav: [],
    singleView: false,
    favView: false
  }


  componentWillMount() {

    axios.all([
      axios.get('https://cors-anywhere.herokuapp.com/http://thecatapi.com/api/images/get?format=xml&results_per_page=25'),
      axios.get('https://cors-anywhere.herokuapp.com/https://catfact.ninja/facts?limit=25')
    ])
    .then(axios.spread((catRes, factRes) => {

      /* cat response */
      const js_xml = convert.xml2js(catRes.data, {compact: true, spaces: 4});

      const catData = js_xml.response.data.images.image;
      //this.setState({ c: catData });

      /* fact response */
      const factData = factRes.data.data;
      

      const arr = [];
       for ( var i = 0; i < catData.length; i++) {
          const obj = {
            id: catData[i].id._text,
            url: catData[i].url._text,
            fact: factData[i].fact
          }
          arr.push(obj);
       }

      this.setState({ cats: arr }, function() {
        console.log(this.state.cats);
      });
    }));
  }

  favoritesCallback = (data) => {
    const arr = [...this.state.fav, data]


    this.setState({fav: arr}, function() {
      console.log(this.state.fav);
    });
  }

  singleView = (data) => {

  }

  /* callback function from header */

  headerCallback = (data) => {
     /* sort cards by last letter in fact */

    if (data === "sort"){
      const newArr = [...this.state.cats];

      newArr.sort(function (a, b){
        /* get last word a */
        const split_a = a.fact.split(" ");
        const a_word = split_a[split_a.length - 1].toLowerCase();
        /* get last word b */
        const split_b = b.fact.split(" ");
        const b_word = split_b[split_b.length - 1].toLowerCase();
        
        if (a_word < b_word) 
          return -1;
        if (a_word > b_word)
          return 1;
        
        return 0;
      })

      console.log(newArr);
      this.setState({cats: newArr});

    }
    if (data === "favorites"){
      console.log("favorites");
    }
  }



  renderList() {
    // eslint-disable-next-line
    const { cats } = this.state;

    if (cats.length > 0)
    {
      
      return cats.map((cat,index) => 
        <CatDetail 
        key={cat.id} 
        id={cat.id} 
        url={cat.url}  
        fact={cat.fact}
        favorites={this.favoritesCallback} 
        singleView={this.singleView}/>
      )
    }
  }

  render() {
    return (
      <div>
        <Header callbackfunctionParent={this.headerCallback}/>
          <Masonry
          options={masonryOptions} 
          disableImagesLoaded={false} 
          updateOnEachImageLoad={false} 
          >
          {this.renderList()}
        </Masonry>
      </div>
      
    );
  }


}

export default CatList;
