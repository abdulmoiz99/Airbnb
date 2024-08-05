import { Component, OnInit } from '@angular/core';
import { AirbnbDataService } from '../airbnb-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Airbnb } from '../airbnbs/airbnbs.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-airbnb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './airbnb.component.html',
  styleUrl: './airbnb.component.css'
})
export class AirbnbComponent implements OnInit {
  airbnb!: Airbnb;
  constructor(private _service: AirbnbDataService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.params["id"];
    this._service.getOne(id).subscribe(airbnb => {
      this.airbnb = airbnb
    })
  }
  public deleteRecord(): void {
    const id = this._activatedRoute.snapshot.params["id"];
    this._service.deleteOne(id).subscribe(_ => {
      this._router.navigate(["airbnbs"])
    })
  }
}
