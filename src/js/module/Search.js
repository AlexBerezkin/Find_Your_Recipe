import axios from 'axios';

import { YOUR_APP_ID, YOUR_APP_KEY } from '../configAPI';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        
        const APIPath = `https://api.edamam.com/search?q=${this.query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=30`;
        
        try {
            const res = await axios.get(APIPath);
            this.result = res.data.hits;
            console.log("this is recipe #2: " + this.result[1].recipe.label);
            
            
        } catch (error) {
            alert(error);
        }

        

    }
}




// https://www.food2fork.com/api/search
// c2f0ac9fe3645a73f05bfc99948614c0