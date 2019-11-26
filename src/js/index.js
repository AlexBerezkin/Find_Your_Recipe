
import Search from './module/Search';
import * as searchView from './view/searchView';
import { elements, renderLoader, clearLoader } from './view/base';

/* Global state of the app 
    - Search object
    - Current recipe object
    - Liked recipes
*/
const state = {};

/* SEARCH CONTROLLER */

const controlSearch = async () => {
    // 1. Get query from a view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            let id = 0;
            state.search.result.forEach((elements) => {
                id++;
                elements.id = id;
            });
            searchView.renderResults(state.search.result);
            console.table(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }

});

/* RECIPE CONTROLLER */

class Recipe {
    constructor(id) {
        this.id = id;
    }
    
    getRecipe() {
        
        const res = state.search.result[this.id-1].recipe;
        //console.log(res.recipe);
        this.title = res.label;
        this.author =res.source;
        this.img = res.image;
        this.url = res.url;
        this.ingredients = res.ingredients;
        
    }
}

const controleRecipe = () => {

    // Get ID
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        //state.recipe = state.search.result[id-1].recipe;
        state.recipe = new Recipe(id);
        state.recipe.getRecipe();

        // Calculate servings and time
        

        // Render the recipe
        console.log(state.recipe);
    }
};

// window.addEventListener('hashchange', controleRecipe);
// window.addEventListener('load', controleRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controleRecipe));