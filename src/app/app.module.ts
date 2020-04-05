import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FavouriteData } from './favouriteData';

import { AppComponent } from './app.component';
import { FavouriteComponent } from './favourite/favourite.component';

@NgModule({
  declarations: [
    AppComponent,
    FavouriteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FavouriteData)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
