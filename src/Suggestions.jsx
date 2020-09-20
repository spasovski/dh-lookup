import React from 'react';


export default ({ingredients, doSetSearchTerm}) => {
  if (!ingredients || !ingredients.length) return null;

  return (
    <ul className="search-suggestions">
      {ingredients.map(ing => <li onClick={() => doSetSearchTerm(ing)} key={ing.id}>{ing.name}</li>)}
    </ul>
  );
}
