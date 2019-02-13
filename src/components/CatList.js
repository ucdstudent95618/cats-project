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
    temp: [],
    fav: [],
    fView: false
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

      /* fact response */
      const factData = factRes.data.data;
      

      const arr = [];
       for ( var i = 0; i < catData.length; i++) {
          const obj = {
            id: catData[i].id._text,
            url: catData[i].url._text,
            fact: factData[i].fact,
            fav: false
          }
          arr.push(obj);
       }

      this.setState({ cats: arr });
    }));
  }

  favoritesCallback = (data) => {
    const { cats } = this.state;
    const arr = [...this.state.fav, data]
    const newArr = cats;

    for (var i = 0; i < cats.length; i++){
      if (data.id === newArr[i].id)
          newArr[i] = data;
    }
    this.setState({cats: newArr}, function(){
      console.log(cats);
    });

    this.setState({fav: arr});
  }

  singleView = (data) => {
    /* not from favs view */
    if (this.state.cats.length > 1 && !this.state.fView) {
      const arr = [data];
      const temp = this.state.cats;
      this.setState({temp});
      this.setState({cats: arr});
    }
    /* from favs view */
    if (this.state.cats.length > 1 && this.state.fView) {
      const arr = [data];
      this.setState({cats: arr});
      this.setState({fView: false});
    }
  }

  /* callback function from header */

  headerCallback = (data) => {
     /* sort cards by last letter in fact */
    console.log(data);
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
      this.setState({cats: newArr});

    }
    if (data === "favorites"){
      /* render favorites */ 
      if (this.state.fav.length < 1 ) {
        alert("You don't have any favorites!");
      } 
      if (this.state.fav.length >= 1 && this.state.cats.length > 1) {
        const temp = this.state.cats;
        this.setState({temp});
        this.setState({cats: this.state.fav});
        this.setState({fView: true});
      } 
      if (this.state.fav.length >=1 && this.state.cats.length === 1) {
        this.setState({cats: this.state.fav});
        this.setState({fView: true});
      }

    }
    if (data === "home" && this.state.temp.length > 0) {
      /* check if we are on favorites */
      if (this.state.fView) {
        this.setState({fView: false});
      }
      const temp = this.state.temp;
      this.setState({cats: temp});
    }
    
  }



  renderList() {
    const { cats } = this.state;

    if (cats.length > 0)
    {
      
      return cats.map((cat,index) => 
        <CatDetail 
        key={cat.id} 
        id={cat.id} 
        url={cat.url}  
        fact={cat.fact}
        fav={cat.fav}
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
                className={'row'}
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
