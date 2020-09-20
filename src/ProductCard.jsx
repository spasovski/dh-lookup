import React from 'react';


export default ({product}) => {
  return (
    <div className="product">
      <h2>{product.name} <span className="collection">{product.collection}</span></h2>
      <img src={product.image.url} alt={`${product.name} ${product.collection} preview`} />
    </div>
  );
}
