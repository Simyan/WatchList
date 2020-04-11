import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FavouriteComponent} from './favourite/favourite.component'
import {FavouriteDetailComponent} from './favourite-detail/favourite-detail.component'

const appRoutes : Routes = [
    {path: 'favourite/list' , component: FavouriteComponent},
    {path: 'favourite/detail/:id' , component: FavouriteDetailComponent},
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { } 