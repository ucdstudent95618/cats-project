import React from 'react';


const Card = (props) => {
    return (
        <div className="Card"> 
          {props.children}
        </div>
    );
}

export default Card;