import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from "../models/order.model";
import {apiURL} from "../constants";
import {AuthService} from "./auth.service";



@Injectable({
  providedIn: 'root'

})
export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  placeOrder(order: Order[]): Observable<Order> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.post<Order>(apiURL + `orders/place`, order, {headers});
  }
}
