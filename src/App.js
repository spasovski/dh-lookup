import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';


// These often belong to something like constants.js or config.js
const PRODUCTS_ENDPOINT = 'https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/products.json';
const INGREDIENTS_ENDPOINT = 'https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/ingredients.json';
const SEARCH_ERROR_MESSAGE = 'Oops! It seems the ingredient you want is not available in any of our foods. Please feel free to send it as a suggestion.';
const SUGGESTIONS_TRIGGER_LENGTH = 3; // at which search term length do we start showing suggestions

class App extends React.Component {
  state = {
    allProducts: [], // from initial app mount fetch
    allIngredients: [], // from initial app mount fetch
    products: [], // filtered by search input value
    ingredients: [], // filtered by search input value
    searchError: ''
  }
  currentSearchTerm = '';

  filterProductsByIngredientId = id => {
    const results = this.state.allProducts.filter(prod => {
      return prod.ingredientIds.indexOf(id) > -1;
    });
    if (results.length) {
      this.resetError();
      this.setState({products: results}, this.resetSuggestions);
    } else {
      this.showErrorMessage();
    }

  }

  handleLookup = (id, searchTerm) => {
    this.resetSearchResults();
    this.currentSearchTerm = searchTerm;
    if (id === -1 && !searchTerm) {
      return;
    } else if (id > -1) {
      this.filterProductsByIngredientId(id);
    } else {
      const ingreds = this.state.ingredients.filter(ing => ing.name.toLowerCase() === searchTerm.toLowerCase());

      if (!ingreds.length) {
        this.showErrorMessage();
      } else {
        this.filterProductsByIngredientId(ingreds[0].id);
      }
    }
  }

  resetSearch = () => {
    this.resetSuggestions();
    this.resetSearchResults();
  }

  resetError = () => {
    this.setState({searchError: ''});
  }

  resetSuggestions = () => {
    this.setState({ingredients: []});
  }

  resetSearchResults = () => {
    this.setState({products: []});
    this.currentSearchTerm = '';
  }

  showErrorMessage = () => {
    this.setState({
      searchError: SEARCH_ERROR_MESSAGE
    });
  }

  handleShowSuggestions = (searchTerm) => {
    if (!searchTerm || searchTerm.length < SUGGESTIONS_TRIGGER_LENGTH) {
      this.resetSuggestions();
      return;
    }
    const ingreds = this.state.allIngredients.filter(
      ingr => ingr.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ingredients: ingreds});
  }

  async componentDidMount() {
    const ingredientsResponse = await fetch(INGREDIENTS_ENDPOINT);
    const allIngredients = await ingredientsResponse.json();
    const productsResponse = await fetch(PRODUCTS_ENDPOINT);
    const allProducts = await productsResponse.json();
    this.setState({allIngredients, allProducts});
  }

  render() {
    return (
      <>
        <header className="global-header">
          <h1>Daily Harvest: Find Products by Ingredient</h1>
        </header>
        <main>
          <SearchForm
            ingredients={this.state.ingredients}
            doLookup={this.handleLookup}
            doShowSuggestions={this.handleShowSuggestions}
            resetSuggestions={this.resetSuggestions}
          />
          <SearchResults
            searchTerm={this.currentSearchTerm}
            products={this.state.products}
            searchError={this.state.searchError}
          />
        </main>
      </>
    );
  }
}

export default App;
