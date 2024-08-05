import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airbnb, AirbnbResponse } from './airbnbs/airbnbs.component';

@Injectable({
  providedIn: 'root'
})
export class AirbnbDataService {

  constructor(private _httpClient: HttpClient) { }


  public getAll(): Observable<AirbnbResponse> {
    return this._httpClient.get<AirbnbResponse>("http://localhost:3000/api/airbnb")
  }


  public getOne(id: String): Observable<Airbnb> {
    return this._httpClient.get<Airbnb>("http://localhost:3000/api/airbnb/" + id)
  }

  public deleteOne(id: String): Observable<Airbnb> {
    return this._httpClient.delete<Airbnb>("http://localhost:3000/api/airbnb/" + id)
  }
}
