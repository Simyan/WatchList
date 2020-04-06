import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import {Favourite} from '../favourite';

@Component({
  selector: 'app-favourite-detail',
  templateUrl: './favourite-detail.component.html',
  styleUrls: ['./favourite-detail.component.css']
})
export class FavouriteDetailComponent implements OnInit {

  favouriteForm : FormGroup;
  displayMessage: { [key: string]: string } = {};

  constructor(
    private fb : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.favouriteForm = this.fb.group({
      favouriteName: ['', [Validators.required]],
      favouriteGenre: ['', [Validators.required]],
      favouriteRating: ['', [Validators.min(0), Validators.max(10)]],
      favouriteIsMovie: [] 
    });
  }

  save() {
    console.log(this.favouriteForm);
    console.log(JSON.stringify(this.favouriteForm.value));
  }

}
