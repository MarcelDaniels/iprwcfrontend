import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {WinkelmandjeService} from "../../services/winkelmandje.service";
import {GetAllProductsService} from "../../services/get-all-products.service";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-surrounds',
  templateUrl: './surrounds.component.html',
  styleUrl: './surrounds.component.scss',
  providers: [GetAllProductsService, AuthService, HttpClient]
})
export class SurroundsComponent implements OnInit{
  surrounds : Product[] = [];
  constructor(private winkelmandjeService: WinkelmandjeService, private getProductsService : GetAllProductsService, private authService : AuthService) {}

  ngOnInit() {
    this.getSurrounds();
  }
  getSurrounds(){
    this.getProductsService.getAllSurrounds().subscribe((surrounds) => {
      this.surrounds = surrounds;
    });
  }

  addToCart(surround: Product): void {
    if (surround && surround.naam) {
      this.winkelmandjeService.voegToeAanWinkelmandje(surround);
    } else {
      console.error('Ongeldig dartobject. Kan niet aan winkelmandje toevoegen.');
    }
  }
}
