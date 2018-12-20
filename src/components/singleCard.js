import React from 'react';

import CatDetail from './CatDetail';

const singleCard = ({fact, url}) => {
  return (
    <div>
      <CatDetail fact={fact} url={url}/>
    </div>
  )
}

export default singleCard;