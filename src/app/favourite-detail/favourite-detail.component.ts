import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import {Favourite} from '../favourite';
import { FavouriteService } from '../favourite.service';
import { Router } from '@angular/router';

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

  constructor(
    private fb : FormBuilder,
    private favouriteService : FavouriteService,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.favouriteForm = this.fb.group({
      Name: ['', [Validators.required]],
      Genre: ['', [Validators.required]],
      Rating: ['', [Validators.min(0), Validators.max(10)]],
      IsMovie: [] 
    });
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

}
