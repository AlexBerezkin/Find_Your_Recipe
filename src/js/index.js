
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
        this.ingredients = res.ingredients.map(el => {
            return el.text;
        });
        
        
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const untisShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, untisShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => untisShort.includes(el2));

            let objIng;

            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2]
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ') 
                }
                
            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
        return objIng;

        });
        this.ingredients = newIngredients;
    }
}

const controleRecipe = () => {

    // Get ID
    const id = window.location.hash.replace('#', '');
    

    if (id) {
        // Prepare UI for changes
        
        // Create new recipe object
        //state.recipe = state.search.result[id-1].recipe;
        state.recipe = new Recipe(id);
        state.recipe.getRecipe();
        state.recipe.parseIngredients();
        // Calculate servings and time
        

        // Render the recipe
        console.log(state.recipe);
        
    }
};

// window.addEventListener('hashchange', controleRecipe);
// window.addEventListener('load', controleRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controleRecipe));