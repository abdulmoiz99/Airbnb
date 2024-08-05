import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airbnb, AirbnbResponse } from './airbnbs/airbnbs.component';

@Injectable({
  providedIn: 'root'
})
export class AirbnbDataService {

  constructor(private _httpClient: HttpClient) { }

  baseUrl: String = "http://localhost:3000/api/airbnb"
  public getAll(limit: number, offset: number): Observable<AirbnbResponse> {
    return this._httpClient.get<AirbnbResponse>(`${this.baseUrl}?limit=${limit}&offset=${offset}`)
  }


  public getOne(id: String): Observable<Airbnb> {
    return this._httpClient.get<Airbnb>("http://localhost:3000/api/airbnb/" + id)
  }

  public deleteOne(id: String): Observable<Airbnb> {
    return this._httpClient.delete<Airbnb>("http://localhost:3000/api/airbnb/" + id)
  }
  public geoSearch(longitude: string, latitude: string, minDistance: string, maxDistance: string): Observable<Airbnb[]> {
    return this._httpClient.get<Airbnb[]>(
      `${this.baseUrl}/geoSearch?longitude=${longitude}&latitude=${latitude}&minDistance=${minDistance}&maxDistance=${maxDistance}`)
  }
}
