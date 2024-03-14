import {Component, OnInit} from '@angular/core';
import {WinkelmandjeService} from "../../services/winkelmandje.service";
import {GetAllProductsService} from "../../services/get-all-products.service";
import {Product} from "../../models/product.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {JWTService} from "../../services/JWT-service";

@Component({
  selector: 'app-dart-pijlen',
  templateUrl: './dart-pijlen.component.html',
  styleUrl: './dart-pijlen.component.scss',
  providers: [GetAllProductsService, HttpClient, AuthService, JWTService]
})
export class DartPijlenComponent implements OnInit{
  dartpijlen: Product[] = [];

  constructor(private winkelmandjeService: WinkelmandjeService, private getProductsService : GetAllProductsService, private authService : AuthService) {}
  ngOnInit() {
    this.getDarts();
  }
  getDarts(){
    this.getProductsService.getAllDarts().subscribe((dartpijlen) => {
      this.dartpijlen = dartpijlen;
    });
  }

  addToCart(dart: Product): void {
    if (dart && dart.naam) {
      this.winkelmandjeService.voegToeAanWinkelmandje(dart);
    } else {
    }
  }
}
