

export default class Recipe {
    constructor(id) {
        this.id = id;
         
    }
    
    getRecipe() {
        //console.log(state.search.result[id-1].recipe;);
        this.title = result[id-1];
        this.author = state.recipe[id-1].recipe.publisher;
        this.img = state.recipe[id-1].recipe.image;
        this.url = state.recipe[id-1].recipe.url;
        this.ingredients = state.recipe[id-1].recipe.ingredients;
        
    }

    
}