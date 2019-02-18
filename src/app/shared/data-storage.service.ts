import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ClientResponse } from 'http';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }
    
    storeRecipes() {
        return this.http.put('https://recipe-book-51132.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get<any[]>('https://recipe-book-51132.firebaseio.com/recipes.json')
            .subscribe(
                (response) => {
                    console.log(response)
                    const recipes: Recipe[] = response;
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}