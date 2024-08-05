import { Component, OnInit } from '@angular/core';
import { AirbnbDataService } from '../airbnb-data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export class AirbnbResponse {
  #totalCount!: number;
  #airbnb!: Airbnb[];

  get totalCount() { return this.#totalCount };
  get airbnb() { return this.#airbnb };
}
export class Airbnb {
  #_id!: String;
  #name!: String;
  #price!: number;
  #house_rules!: String;
  #property_type!: String;
  #cleaning_fee!: number;
  #address!: Address;

  get _id() { return this.#_id; }
  get name() { return this.#name; }
  get price() { return this.#price; }
  get house_rules() { return this.#house_rules; }
  get property_type() { return this.#property_type; }
  get cleaning_fee() { return this.#cleaning_fee; }
  get address() { return this.#address; }
}
class Address {
  #country!: String;
  #street!: String;
  get country() { return this.#country }
  get street() { return this.#street }
}
@Component({
  selector: 'app-airbnbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './airbnbs.component.html',
  styleUrl: './airbnbs.component.css'
})
export class AirbnbsComponent implements OnInit {

  airbnbResponse!: AirbnbResponse;
  limit: number = 5;
  offset: number = 0;
  isPreviousDisable: boolean = false;
  isNextDisable: boolean = false;
  recordStartsWith!: String;

  constructor(private _service: AirbnbDataService) { }

  ngOnInit(): void {
    this.updatePage();
  }

  private getData() {
    this._service.getAll(this.limit, this.offset, this.recordStartsWith).subscribe(airbnb => {
      this.airbnbResponse = airbnb;
    })
  }
  private updatePage() {
    this.getData();
    this.updateButton();
  }
  public updateRecordLimit(event: any) {
    this.limit = event.target.value;
    this.getData();
  }
  private updateButton() {
    this.isPreviousDisable = this.offset == 0
    this.isNextDisable = this.airbnbResponse.totalCount < this.offset + this.limit
  }
  public onPreviousClick() {
    if (!this.isPreviousDisable) {
      this.offset -= this.limit;
      this.updatePage();
    }
  }
  public onNextClick() {
    if (!this.isNextDisable) {
      this.offset += this.limit;
      this.updatePage();
    }
  }
  public updateRecordStartWith(event: any) {
    this.recordStartsWith = event.target.value;
    this.updatePage()
  }

}
