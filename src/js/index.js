
import Search from './module/Search';
import * as searchView from './view/searchView';
import { elements } from './view/base';

/* Global state of the app 
    - Search object
    - Current recipe object
    - Liked recipes
*/
const state = {};

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

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        searchView.renderResults(state.search.result);
        console.table(state.search.result);
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

