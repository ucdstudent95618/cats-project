import React, { Component } from 'react';

import Card from './Card';
import Section from './Section';


class CatDetail extends Component 
{
  state = {
    click: false,
    icon: "far fa-star"
  }
  
  handleClick = () => {
    console.log("it has been clicked");
  }
  favorite = () => {

    if (!this.state.click) {
      this.setState({click: true});
      this.setState({icon: "fas fa-star"});
      const data = {
        fact: this.props.fact,
        url: this.props.url
      };
      this.props.favorites(data);
    } 
  }

  render() {
    return (
      <Card>
        <Section name="pin-text">
          {this.props.fact}
        </Section>
        <Section name="pin-image">
          <img src={this.props.url} alt="Cat" />
        </Section> 
        <Section>
          <button onClick={this.handleClick} style={{float: "left"}}> View </button>
          <button onClick={this.favorite} style={{float: "right"}}><i className={this.state.icon}></i></button>
        </Section>
      </Card>
    );
  }
}



export default CatDetail;