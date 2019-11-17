import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        //const proxy = 'https://crossorigin.me/';
        //const key = 'c2f0ac9fe3645a73f05bfc99948614c0';  // https://www.food2fork.com/api
        const YOUR_APP_ID = 'c64ae17d';                  // https://api.edamam.com
        const YOUR_APP_KEY = '04cb0198a3e40b424ec63ce77ecfb25d'; //https://api.edamam.com
        //const YOUR_APP_KEY = 'db42dc3d82ed47e79ae07d9d7b7327b1';  //https://api.spoonacular.com

        //const APIPath = `https://www.food2fork.com/api/search?key=${key}&q=${query}`;
        const APIPath = `https://api.edamam.com/search?q=${this.query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
        //const APIPath = `https://api.spoonacular.com/recipes/search?query='pizza'&apiKey=${YOUR_APP_KEY}`;
        try {
            const res = await axios(APIPath);
            this.result = res.data.hits;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }

    }
}




// https://www.food2fork.com/api/search
// c2f0ac9fe3645a73f05bfc99948614c0