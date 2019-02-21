import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {

    @Effect()
    recipeFetch = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(
            (action: RecipeActions.FetchRecipes) => {
                return this.http.get<Recipe[]>('https://recipe-book-51132.firebaseio.com/recipes.json')
            }
        ),
        map(
            (recipes) => {
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                }
            }
        ));
    
    @Effect({dispatch: false})
    recipeStore = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(
            ([action, state]) => {
                return this.http.put('https://recipe-book-51132.firebaseio.com/recipes.json', state.recipes, {
            observe: 'body',
        });
            }
        )
    )

    constructor(private actions$: Actions,
                private http: HttpClient,
                private store: Store<fromRecipe.FeatureState>) {}
}