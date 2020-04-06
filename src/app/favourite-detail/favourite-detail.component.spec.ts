import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteDetailComponent } from './favourite-detail.component';

describe('FavouriteDetailComponent', () => {
  let component: FavouriteDetailComponent;
  let fixture: ComponentFixture<FavouriteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
