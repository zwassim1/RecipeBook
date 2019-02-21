import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
} 

const initialState: State = {
    recipes: [
        new Recipe(
          'Plat',
          'Delcious plat',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLlV8i4fkHWAY16plSbhC2vs5Bqm59Sbl8ecb6Yvcflanrmt1UAg',
          [new Ingredient('Felfel', 360), new Ingredient('spaghetti', 60)]
        ),
        new Recipe(
          'Pizza',
          'Delcious pizza',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLlV8i4fkHWAY16plSbhC2vs5Bqm59Sbl8ecb6Yvcflanrmt1UAg',
          [new Ingredient('tomato', 360), new Ingredient('Thon', 60)]
        )
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case RecipeActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
}