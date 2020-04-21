import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError, Subject, merge, combineLatest } from 'rxjs';
import { catchError, tap, map, concatMap, debounceTime, shareReplay, scan, mergeMap} from 'rxjs/operators';

import {Favourite} from './favourite'
import { Medium } from './medium';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private baseURL = 'api/favourites';
  private mediumBaseURL = 'api/mediums';
  constructor(private http : HttpClient) { }

  // getFavourites(): Observable<Favourite[]> {
  //   console.log(this.baseURL);
  //   return this.http.get<Favourite[]>(this.baseURL)
  //     .pipe(
  //       tap(data => console.log(JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

  favourites$ = this.http.get<Favourite[]>(this.baseURL)
  .pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );

  mediums$ = this.http.get<Medium[]>(this.mediumBaseURL)
  .pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );

  favouritesWithMedium = combineLatest([
    this.favourites$,
    this.mediums$
  ]).pipe(
    tap(data => console.log("favMed [Service]: " + JSON.stringify(data))),
    map(([favourites, mediums]) => 
    {
      let result = favourites.map(favourite => ({
        ...favourite,
        //MediumName: this.findMedium(favourite.MediumId, mediums)
        MediumName: mediums.find(m => favourite.MediumId == m.id).Name,
      }) )
      console.log('Mapped stream [Service]:' + JSON.stringify(result));
      return result;
    }
    ),
    catchError(this.handleError)
  );

  getFavourite(id : number) : Observable<Favourite> {
    return this.http.get<Favourite>(this.baseURL + '/' + id )
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );      
  }

  

  // private favouriteAddSubject = new Subject<Favourite>();
  //  favourtieAddAction$ = this.favouriteAddSubject.asObservable();

  //  favouriteWithAdd$ =
  //  merge(
  //  this.favouritesWithMedium, 
  //  this.favourtieAddAction$.pipe(
  //    tap(data => console.log("Hi!!!")),
  //    concatMap(
  //       newFavorite => {
  //         console.log("Hi about to make post call");
  //         const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //         return this.http.post<Favourite>(this.baseURL, newFavorite, {headers})
  //           .pipe(
  //             tap(result => console.log('New Favourite has been added', JSON.stringify(result))),
  //             catchError(this.handleError)
  //           );
  //       }
         
  //  ))
  //  .pipe(
  //   scan((acc: Favourite[], value: Favourite) => [...acc, value]),
  //  )
  //  );


  addFavourite(body : Favourite): Observable<Favourite>{
    body.id = null;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Favourite>(this.baseURL, body, {headers})
    .pipe(
      tap(data => console.log('Add data [Service]:' + JSON.stringify(body))),
      catchError(this.handleError)
    );
  }

  updateFavourite(body : Favourite) : Observable<Favourite> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseURL}/${body.id}`;
    console.log('Update data [Service]:');

    return this.http.put<Favourite>(url, body, {headers})
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  onAdd(favourite : Favourite) : void {
    console.log("hello from onAdd");
    //this.favouriteAddSubject.next(favourite);
    console.log("After calling fav subject");
  }
 
  
  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error("ERROR:" + err);
    return throwError(errorMessage);
  }
}
