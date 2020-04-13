import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import {Favourite} from '../favourite';
import { FavouriteService } from '../favourite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourite-detail',
  templateUrl: './favourite-detail.component.html',
  styleUrls: ['./favourite-detail.component.css']
})
export class FavouriteDetailComponent implements OnInit {

  favourite : Favourite;  
  favouriteForm : FormGroup;
  displayMessage: { [key: string]: string } = {};
  errorMessage: string;
  private subscription : Subscription;

  constructor(
    private fb : FormBuilder,
    private favouriteService : FavouriteService,
    private route : Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.favouriteForm = this.fb.group({
      Name: ['', [Validators.required]],
      Genre: ['', [Validators.required]],
      Rating: ['', [Validators.min(0), Validators.max(10)]],
      IsMovie: [] 
    });

    this.subscription = this.activatedRoute.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        if(id && id > 0)
        {
          this.getFavourite(id);
        }
      }
    );

  }

  save() {
    console.log(this.favouriteForm);
    console.log(JSON.stringify(this.favouriteForm.value));

    if(this.favouriteForm.valid)
    {
      if(this.favouriteForm.dirty)
      {
        const fav : Favourite = {...this.favourite, ...this.favouriteForm.value};
        
        if(!fav.id || fav.id == 0)
        {
          
          console.log("KUSSSOOO" + JSON.stringify(fav));
          this.favouriteService.addFavourite(fav)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
        else{
          console.log("dUSSSOOO");
          this.favouriteService.updateFavourite(fav)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      }
      else{
        this.onSaveComplete();
      }
    }
    else{
      console.log("Invalid form!");
      this.errorMessage = "Invalid Form";
    }
  }

  onSaveComplete() : void {
    this.favouriteForm.reset();
    this.route.navigate(['/favourite/list']);
  }

  getFavourite(id : number) : void {
    this.favouriteService.getFavourite(id)
      .subscribe({
        next: (favourite : Favourite) => this.displayFavourite(favourite) ,
        error: err => this.errorMessage = err
      });
  }

  displayFavourite(favourite : Favourite ) : void {
    if (this.favouriteForm) {
      this.favouriteForm.reset();
    }

    this.favourite = favourite;

    this.favouriteForm.patchValue({
      id : this.favourite.id,
      Name : this.favourite.Name,
      Genre : this.favourite.Genre,
      Rating : this.favourite.Rating,
      IsMovie : this.favourite.IsMovie
    });
  }

}
