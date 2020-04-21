import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Favourite } from '../favourite';
import {FavouriteService} from '../favourite.service';
import { BehaviorSubject, Subject, EMPTY } from 'rxjs'
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouriteComponent{

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  fav : Favourite;
  
  favourites$ = this.favouriteService.favouritesWithMedium.pipe(
    
    tap(data => console.log("Invoked favourite$ | " + JSON.stringify(data))),
    catchError( err => 
      {
        console.log("Error in favourite observable" + err);
        this.errorMessageSubject
        return EMPTY;
      })        
   // error: err => this.errorMessage = err
  );

  constructor(private favouriteService : FavouriteService) {}
  
}
