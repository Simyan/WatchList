import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import {Favourite} from './favourite'

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private baseURL = "api/favourites";
  constructor(private http : HttpClient) { }

  getFavourites(): Observable<Favourite[]> {
    console.log(this.baseURL);
    return this.http.get<Favourite[]>(this.baseURL)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  
  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
