import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from "../models/product.model";
import {apiURL} from "../constants";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class GetAllProductsService {
  private apiUrl = apiURL;

  constructor(private http: HttpClient, private authService : AuthService) {}

  getAllDarts(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}darts`, {headers});
  }

    getAllBoards(): Observable<Product[]> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.token}`
        });
        return this.http.get<any[]>(`${this.apiUrl}boards`, {headers});
    }

  getAllSurrounds(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}surrounds`, {headers});
  }
}
