import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Apartment} from "../apartment";

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getApartmentsById(apartmentId: number): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.apiServerUrl}/apartments/room/${apartmentId}`);
  }

  public getAllApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.apiServerUrl}/apartments/all`);
  }

  public addApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(`${this.apiServerUrl}/apartments/add`, apartment);
  }

  public updateApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.put<Apartment>(`${this.apiServerUrl}/apartments/update`, apartment);
  }

  public deleteApartment(apartmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/apartments/delete/${apartmentId}`);
  }

  public getApartmentsByCriteria(rooms: string | null, price: string | null, quarter: string | null): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.apiServerUrl}/apartments/search/${rooms}/${price}/${quarter}`);
  }

}
