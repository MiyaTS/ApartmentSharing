import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {UserDTO} from "../userDTO";

const API_URL = 'http://localhost:8080/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUserEntityById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiServerUrl}/users/findUser/${id}`);

  }
}
