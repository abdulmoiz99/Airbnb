import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AirbnbDataService } from '../airbnb-data.service';
import { Airbnb } from '../airbnbs/airbnbs.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  airbnb!: Airbnb[];

  constructor(private _service: AirbnbDataService) { }
  ngOnInit(): void {
    this.searchForm = new FormGroup({
      longitude: new FormControl,
      latitude: new FormControl,
      minDistance: new FormControl,
      maxDistance: new FormControl
    })
  }

  public search(form: FormGroup) {
    console.log(form.value.longitude)
    const longitude = form.value.longitude;
    const latitude = form.value.latitude;
    const minDistance = form.value.minDistance;
    const maxDistance = form.value.maxDistance;
    this._service.geoSearch(longitude, latitude, minDistance, maxDistance).subscribe(airbnb => {
      console.log(airbnb)
      this.airbnb = airbnb
    })
  }
}
