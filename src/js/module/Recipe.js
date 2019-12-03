

export default class Recipe {
    constructor(id) {
        this.id = id;

    }

    getRecipe() {
        //console.log(state.search.result[id-1].recipe;);
        this.title = result[id - 1];
        console.log(this.title);
        this.author = state.recipe[id - 1].recipe.publisher;
        console.log(this.author);
        this.img = state.recipe[id - 1].recipe.image;
        console.log(this.img);
        this.url = state.recipe[id - 1].recipe.url;
        console.log(this.url);
        this.ingredients = state.recipe[id - 1].recipe.ingredients.forEach(function (item, index, array) {
            return console.log(item[text]);
        });
        console.log(this.ingredients);

    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const intisShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, intisShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

            // 3) Parse ingredients into count, unit and ingredient
            return ingredient;

        });
        this.ingredients = newIngredients;
    }
}