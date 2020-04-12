import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import {
  PreloadSelectedModulesList,
  NetworkAwarePreloadStrategy
} from "./core";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "heroes" },
  {
    path: "heroes",
    loadChildren: "./heroes/heroes.module#HeroesModule"
  },
  {
    path: "villains",
    loadChildren: "./villains/villains.module#VillainsModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // Uncomment the line of code below. Put the Preload Strategy here
      // PreloadAllModules
      // PreloadSelectedModulesList,
      // NetworkAwarePreloadStrategy

      // { preloadStrategy: PreloadAllModules }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
