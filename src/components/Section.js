import React from 'react';

const Section = props => {
  return (
    <div className={props.name}>
      {props.children}
    </div>
  );
}


export default Section;