import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {apiURL} from "../constants";
import {AuthService} from "./auth.service";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private authService : AuthService, private http : HttpClient) {
  }
  addProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.post<Product>(apiURL + "products", product, {headers});
  }

  deleteProduct(product: Product): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    const deleteUrl = apiURL + "delete/" + product.product_id;
    return this.http.delete<void>(deleteUrl, {headers});
  }
}
