import React from 'react';
import ProductCard from './ProductCard';


export default ({searchTerm, products, searchError}) => {
  if (searchError) {
    return <p className="error">{searchError}</p>;
  } else if (!products.length) {
    return null;
  }

  return (
    <>
      <p>We found {products.length} items with {searchTerm}.</p>
      <ul className="search-results">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </ul>
    </>
  );
}
