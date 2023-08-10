import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

// @Injectable()
// export class RecipeResolverService implements Resolve<Recipe[]>{
//   constructor(private dataStorageService: DataStorageService) { }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.dataStorageService.fetchRecipes()
//   }
// }
export const RecipeResolverService: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] => {
  const recipeService: RecipeService = inject(RecipeService);
  const dataStorageService: DataStorageService = inject(DataStorageService);
  const recipes: Recipe[] = recipeService.getRecipes();
  if (recipes.length === 0) {
    return dataStorageService.fetchRecipes();
  } else {
    return recipes;
  }
};


