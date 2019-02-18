import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
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
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;    
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())    
  }
}
