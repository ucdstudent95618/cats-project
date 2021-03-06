import React, { Component } from 'react';

import Card from './Card';
// import Section from './Section';


class CatDetail extends Component 
{
  
  handleClick = () => {
    const data = {
      id: this.props.id,
      fact: this.props.fact,
      url: this.props.url,
      fav: this.props.fav
    };
    this.props.singleView(data);
  }
  favorite = () => {

    if (!this.props.fav) {
      const data = {
        id: this.props.id,
        fact: this.props.fact,
        url: this.props.url,
        fav: true
      };
      this.props.favorites(data);
    } 
  }

  render() {
    return (
      <Card>
        <div className="pin-text">
          {this.props.fact}
        </div>
        <div className="pin-image">
          <img src={this.props.url} alt="Cat" />
        </div> 
        <div>
          <button onClick={this.handleClick} style={{float: "left"}}> View </button>
          <button onClick={this.favorite} style={{float: "right"}}>
            {this.props.fav ?
              <i className="fas fa-star"></i>
            :
              <i className="far fa-star"></i>
            }
          </button>
        </div>
      </Card>
    );
  }
}



export default CatDetail;