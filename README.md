# Daily Harvest Product Lookup

This is a React front-end project to display a list of products provided a specific ingredient. The results are limited to the API endpoints below:
- https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/products.json
- https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/ingredients.json

This app will fetch the JSON data from above on initial mount and then filter the results based on user search input.

## Get started

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

Install the dependencies. From within the project directory..

```bash
npm install
```

...then start the local server

```bash
npm start
```

To run the test suite via cypress

```bash
npm run test
```

Navigate to [localhost:3000](http://localhost:3000). You should see the app running.


## Building and running in production mode

To create an optimized version of the app:

```bash
npm run build
```