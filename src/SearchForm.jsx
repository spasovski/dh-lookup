import React, { useState } from 'react';
import { throttle } from 'throttle-debounce';
import Suggestions from './Suggestions';


const SEARCH_SUGGESTIONS_THROTTLE_DELAY = 300;
let input;

export default ({ingredients, doLookup, doShowSuggestions, resetSuggestions}) => {
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientId, setIngredientId] = useState(-1);

  const handleSetSearchTerm = ({id, name}) => {
    setIngredientName(name);
    setIngredientId(id);
    resetSuggestions();
  }

  return (
    <>
      <form className="search-form" onSubmit={(evt) => {
        evt.preventDefault();
        doLookup(ingredientId, ingredientName);
      }}>
        <label htmlFor="search">Product Lookup by Ingredient</label>
        <input
          type="search"
          id="search"
          autoComplete="off"
          value={ingredientName}
          onChange={evt => {
            setIngredientName(evt.target.value);
            setIngredientId(-1); // we don't know the ingredient ID anymore
            throttle(SEARCH_SUGGESTIONS_THROTTLE_DELAY, () => doShowSuggestions(input.value), false)();
          }}
          ref={node => {input = node}}
        />
        <button type="submit">search</button>
        <div className="suggestions-container">
          <Suggestions ingredients={ingredients} doSetSearchTerm={handleSetSearchTerm} />
        </div>
      </form>
    </>
  );
}
