import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import {Favourite} from './favourite'

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private baseURL = 'api/favourites';
  constructor(private http : HttpClient) { }

  getFavourites(): Observable<Favourite[]> {
    console.log(this.baseURL);
    return this.http.get<Favourite[]>(this.baseURL)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getFavourtie(id : number) : Observable<Favourite> {
    return this.http.get<Favourite>(this.baseURL + '/' + id )
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );      
  }

  addFavourite(body : Favourite): Observable<Favourite>{
    body.id = null;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Favourite>(this.baseURL, body, {headers})
    .pipe(
      tap(data => console.log('In Service:' + JSON.stringify(body))),
      catchError(this.handleError)
    );
  }

  updateFavourite(body : Favourite) : Observable<Favourite> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Favourite>(this.baseURL, body + '/' + body.id, {headers})
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
