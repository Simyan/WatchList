import { Component, OnInit } from '@angular/core';
import { Favourite } from '../favourite';
import {FavouriteService} from '../favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  errorMessage = '';
  fav : Favourite;
  favourites = [];

  constructor(private favouriteService : FavouriteService) { }

  ngOnInit(): void {
    //this.fav = {Id: 1, Genre: "Satire", Name: "Jojo Rabbit", Rating: 8.5, IsMovie: true};
    //this.favourites.push(this.fav);
    console.log("[OnInit]");
    this.favouriteService.getFavourites().subscribe({
      next: favourites => {
        this.favourites = favourites;
      },
      error: err => this.errorMessage = err
    });
  }



}
