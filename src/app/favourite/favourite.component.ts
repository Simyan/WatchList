import { Component, OnInit, NgZone } from '@angular/core';
import { Favourite } from '../favourite';
import {FavouriteService} from '../favourite.service';
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  errorMessage = '';
  fav : Favourite;
  favourites: Favourite[] = [];
  //favouriteList: Favourite[] = [];
 

favouriteList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private favouriteService : FavouriteService) {}

  ngOnInit(): void {
    //this.fav = {Id: 1, Genre: "Satire", Name: "Jojo Rabbit", Rating: 8.5, IsMovie: true};
    //this.favourites.push(this.fav);
    console.log("[OnInit]");
    this.favouriteService.getFavourites().subscribe({
      next: favourites => {
        //this.favourites = favourites;
        //this.favourites = [...this.favourites, ...favourites];
        this.favourites = favourites;
        this.favouriteList.next(favourites);
        console.log("A:" + JSON.stringify(this.favourites));
      },
      error: err => this.errorMessage = err
    });
  }

  trackFavourites(index : number, fav : Favourite) : number
  { 
    console.log("I:" + index + "F:" + fav.id); 
    //return `${index}-${fav.id}`; 
    return fav ? fav.id : null
  }



}
