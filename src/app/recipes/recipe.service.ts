import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
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

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}
